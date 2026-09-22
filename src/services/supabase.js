import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bfqrmgmnzmgdzboamjhd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZjsLbHGpflVX-GCXrgwm0g_LAS-RIT9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Trigger Real Google OAuth Authentication
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Google OAuth error:', err);
    return { data: null, error: err };
  }
}

/**
 * Send Phone Verification OTP
 */
export async function sendPhoneOtp(fullPhoneNumber) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: fullPhoneNumber,
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase Phone OTP warning/fallback:', err);
    return { data: null, error: err };
  }
}

/**
 * Verify 6-digit or 4-digit Phone OTP
 */
export async function verifyPhoneOtp(fullPhoneNumber, token) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: fullPhoneNumber,
      token,
      type: 'sms',
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase Verify OTP warning/fallback:', err);
    return { data: null, error: err };
  }
}

/**
 * Record verified user to database (profiles / users table)
 * Also saves locally to localStorage as instant client persistence fallback.
 */
export async function saveVerifiedUser({ phone, email, name, authProvider, avatarUrl }) {
  const record = {
    id: 'user_' + Date.now(),
    phone: phone || null,
    email: email || null,
    name: name || (phone ? `User ${phone.slice(-4)}` : 'Planitory Explorer'),
    auth_provider: authProvider || 'phone',
    avatar_url: avatarUrl || null,
    verified_at: new Date().toISOString(),
  };

  // 1. Try persisting to Supabase Database (profiles table)
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert([record], { onConflict: 'phone' });

    if (error) {
      console.warn('Supabase DB table save notice (profiles):', error.message);
    }
  } catch (e) {
    console.warn('Supabase DB offline/unreachable, saving to persistent local storage:', e);
  }

  // 2. Always persist to localStorage for instant app state retrieval
  const existingUsers = JSON.parse(localStorage.getItem('planitory_verified_users') || '[]');
  const updatedUsers = [record, ...existingUsers.filter(u => (phone && u.phone !== phone) || (email && u.email !== email))];
  localStorage.setItem('planitory_verified_users', JSON.stringify(updatedUsers));
  localStorage.setItem('planitory_current_user', JSON.stringify(record));

  return record;
}

/**
 * Get currently authenticated or locally verified user
 */
export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email,
        phone: session.user.phone,
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
        avatar_url: session.user.user_metadata?.avatar_url,
        auth_provider: session.user.app_metadata?.provider || 'google',
      };
    }
  } catch (err) {
    // Supabase session lookup catch
  }

  // Fallback to local persistence
  const local = localStorage.getItem('planitory_current_user');
  return local ? JSON.parse(local) : null;
}
