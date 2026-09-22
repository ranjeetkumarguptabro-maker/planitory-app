/**
 * Stripe Payment Service
 * Planitory Travel Platform
 */

export const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51UIPqERoiG2jFI06DAmhBGscvV63Xg5iBu7Td4sLUXDqqbrPCOEZ2ovkmJ20J5HPzpUE3ScxJvNvK6wrXQvNqXAA00La8phauQ';

let stripePromise = null;

/**
 * Dynamically load Stripe.js
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(null);
        return;
      }

      if (window.Stripe) {
        resolve(window.Stripe(STRIPE_PUBLISHABLE_KEY));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        if (window.Stripe) {
          resolve(window.Stripe(STRIPE_PUBLISHABLE_KEY));
        } else {
          resolve(null);
        }
      };
      script.onerror = () => {
        console.warn('Failed to load Stripe.js from CDN. Using test checkout fallback.');
        resolve(null);
      };
      document.body.appendChild(script);
    });
  }
  return stripePromise;
};

/**
 * Process a checkout payment
 * @param {Object} paymentDetails
 * @returns {Promise<{success: boolean, transactionId?: string, error?: string}>}
 */
export const processPayment = async ({
  amount = 12,
  currency = 'usd',
  itemTitle = 'Paris in 3 Days Map',
  paymentMethod = 'card',
} = {}) => {
  try {
    const stripe = await getStripe();
    // Simulate payment transaction with Stripe integration
    await new Promise((resolve) => setTimeout(resolve, 850));

    const transactionId = `txn_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;

    return {
      success: true,
      transactionId,
      amount,
      currency,
      itemTitle,
      paymentMethod,
      timestamp: new Date().toISOString(),
      stripeConfigured: Boolean(STRIPE_PUBLISHABLE_KEY),
    };
  } catch (err) {
    console.error('Payment processing failed:', err);
    return {
      success: false,
      error: err.message || 'Payment processing encountered an error',
    };
  }
};
