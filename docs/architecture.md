# Proposed production architecture — NOT YET IMPLEMENTED

- **Public website:** GitHub Pages, with static product metadata and public preview images.
- **Backend:** Supabase Edge Functions for session creation, verified Stripe webhook processing, and authorized download URL issuance.
- **Payments:** Stripe Checkout; create sessions server-side using canonical product IDs and server-verified prices. Never trust cart prices from browser requests.
- **Database:** products, orders, order_items, entitlements, customers, download_events. Store Stripe IDs and fulfillment state; enforce idempotency on webhook event processing.
- **Storage:** private Supabase Storage bucket for purchased files. Short-lived signed URLs generated only after entitlement verification. Never store paid masters in public GitHub or a public storage bucket.
- **Guest checkout:** supported without requiring signup. Use verified email-based purchase recovery or optional customer accounts; do not expose downloads based solely on a guessed email or checkout success URL.
- **Authentication:** Supabase Auth for optional purchase library. Apply row-level security to customer data; service-role credentials only on backend.
- **Webhook:** verify Stripe signature using raw request body; handle asynchronous and repeated events; fulfill only confirmed paid transactions, including asynchronous payment outcomes where supported.
- **Before launch:** confirm seller business/payment eligibility, tax handling, refund policy, digital goods terms, privacy policy, accessibility, security headers, production email, fraud controls, and test all failure/retry flows.

## Release gate

Current code is intentionally demo-only. No checkout button will accept money. No private media are included.
