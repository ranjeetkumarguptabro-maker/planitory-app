/**
 * Cloudflare Worker Backend for Planitory
 * Handles API routes (Stripe PaymentIntents, Webhooks) and serves SPA static assets
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight for all /api routes
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // API Route: Health check
    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'planitory-worker',
          hasStripeSecret: Boolean(env.STRIPE_SECRET_KEY),
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // API Route: Create Stripe PaymentIntent
    if (url.pathname === '/api/create-payment-intent' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const amount = body.amount || 1200; // In cents (default $12.00)
        const currency = (body.currency || 'usd').toLowerCase();
        const itemTitle = body.itemTitle || 'Paris in 3 Days Map';

        const stripeSecretKey = env.STRIPE_SECRET_KEY;

        if (stripeSecretKey) {
          // Call Stripe API directly from Cloudflare Worker
          const formData = new URLSearchParams();
          formData.append('amount', amount.toString());
          formData.append('currency', currency);
          formData.append('description', `Planitory: ${itemTitle}`);
          formData.append('automatic_payment_methods[enabled]', 'true');

          const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${stripeSecretKey}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
          });

          const stripeData = await stripeRes.json();

          if (!stripeRes.ok) {
            return new Response(
              JSON.stringify({ error: stripeData.error?.message || 'Stripe error' }),
              {
                status: stripeRes.status,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              }
            );
          }

          return new Response(
            JSON.stringify({
              clientSecret: stripeData.client_secret,
              paymentIntentId: stripeData.id,
              status: stripeData.status,
              amount: stripeData.amount,
              currency: stripeData.currency,
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        } else {
          // Worker running without secret key (test sandbox fallback)
          return new Response(
            JSON.stringify({
              clientSecret: `pi_mock_${Math.random().toString(36).substring(2, 12)}_secret_${Math.random().toString(36).substring(2, 12)}`,
              paymentIntentId: `pi_${Math.random().toString(36).substring(2, 14)}`,
              status: 'requires_payment_method',
              amount,
              currency,
              message: 'Stripe Secret Key not yet added in Cloudflare Dashboard. Using simulation mode.',
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message || 'Internal Server Error' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // Default: Fallback to serving static SPA frontend assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  },
};
