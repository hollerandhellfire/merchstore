H&H DIGITAL STORE — VISUAL UPGRADE v3
===================================
TARGET REPOSITORY: hollerandhellfire/merchstore
TARGET DOMAIN: merchstore.hollerandhellfire.net

UPLOAD THE CONTENTS of this ZIP into the ROOT of the existing merchstore repository.
Keep the folder structure. Replace matching files when GitHub asks.
Do not upload the ZIP itself, and do not create an extra HH-Store-Upgrade-v3 folder in the repository.

FILES:
index.html
CNAME
assets/css/style.css
assets/js/app.js
assets/js/family-nav.js
data/products.json

WHAT CHANGES:
- Rich dark atmospheric landing page, responsive catalog, decorative placeholder release artwork.
- 5 real release titles, no invented prices.
- Family navigation with 12 destinations and Lamplight.
- Root-relative asset and catalog URLs for custom domain; cache version v3.
- No demo cart or fake checkout. Purchasing remains disabled until Stripe and secure delivery exist.

IMPORTANT:
- This package intentionally preserves your current merchstore.hollerandhellfire.net domain.
- If you decide to return to store.hollerandhellfire.net later, update the CNAME, DNS and the Digital Store link in family-nav.js together.
- No changes to Lamplight or other repositories.
- The same family nav is designed to be reused in those sites later, but this ZIP only updates the store.
