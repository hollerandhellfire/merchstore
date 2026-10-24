# Holler & Hellfire — Digital Store (development starter)

This is a **standalone static storefront** for `hollerandhellfire/merchstore`, adapted from the supplied Claude preview. It is not a payment-enabled store. The existing H&H Universe, H&H Records, and other repositories are unaffected.

## Run locally

From this directory: `python -m http.server 8000`, then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Copy the contents of this folder to the root of `hollerandhellfire/merchstore`.
2. Commit and push to the repository's default branch.
3. In repository Settings → Pages, choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. Verify the Pages URL GitHub provides. Do not change any existing custom domain or DNS settings.

## Catalog

Edit `data/products.json`. All three initial listings were explicitly marked as **placeholders** in the supplied preview; their titles and prices are preserved for layout testing, **not approved sales data**. Replace them with approved records before launch. Prices use integer cents. Valid categories: `music`, `books`, `art`, `bundles`. `status` is `draft` until product is verified. Add public artwork under `assets/images/` and set its relative path. Do not put purchased audio, ebooks, or other paid files in this repository.

## Checkout and digital delivery (not implemented)

See `docs/architecture.md`. A real checkout requires a server-side Stripe Checkout session creator, Stripe-signed webhook verification, an orders/entitlements database, and protected downloads. The static JavaScript cart is only a **demo**; it is not trusted for product pricing or purchase authorization. Never commit Stripe secrets or Supabase service-role keys.

## Design provenance

Preserves the dark walnut/black, antique gold, and Georgia serif visual direction of the supplied `merch_store_preview.html`. The exported Claude interface styles have not been copied.
