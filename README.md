# sharmony-landing
for local run:
- docker compose -f docker-compose.yml up -d

open in browser:
- http://localhost:1313/sharmony-landing/  - to see page
- http://localhost:1313/sharmony-landing/admin - to see admin panel

new UI routes:
- /login/
- /account/
- /marketplace/
- /marketplace/submit/

placeholder API routes (static mock JSON):
- /api/v1/auth/login.json
- /api/v1/account/profile.json
- /api/v1/marketplace/filters.json
- /api/v1/marketplace/listings.json
- /api/v1/marketplace/create-listing.json
