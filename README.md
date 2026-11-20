# Brajin S J — The Engineer's Letter

A vintage correspondence-themed developer portfolio built with Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion and Lenis.

## Routes
- `/` — Home / interactive envelope
- `/about` — About and education
- `/skills` — Technical notebook
- `/experience` — Experience timeline
- `/projects` — Project archive
- `/contact` — Contact letter

## Setup
```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Phase 1 — Home
- Added a generated vintage writing-desk background at `public/images/backgrounds/vintage-writing-desk.png`.
- Refined the homepage envelope with parchment gradients, postal stamp, twine, and wax-seal styling.
- Added a GSAP opening sequence: wax seal release, 3D envelope flap rotation, letter slide-out and letter-content reveal.
- Added subtle floating dust and staged hero entrance animation.
- Kept resume and contact actions connected to the existing routes.

## Design references
The six approved page references and combined asset atlas are stored in `public/design-references/`.

## Notes
- Contact details are maintained in `src/data/contact.ts` using the bundled resume.
- Run `npm install`, `npm run lint`, and `npm run build` locally before deployment.

## Phase 2 — About
- Rebuilt `/about` as a two-page vintage parchment journal based on `public/design-references/02-about.webp`.
- Added a profile page with portrait artwork, name, role, location, GitHub and LinkedIn links.
- Added the handwritten journey, education timeline, interest icons, signature and wax-seal detail.
- Added staggered page/content entrance motion with reduced-motion support, while retaining the shared navigation and route transition.
- Reused the Phase 1 vintage writing-desk background; added `public/images/about-journey-portrait.webp` as the framed portrait artwork cropped from the supplied About design reference.

## Contact letter delivery

The form works without environment variables. It validates the letter and offers a populated email draft. The visitor sends that draft from their own email app.

To enable direct delivery, configure `CONTACT_DELIVERY_URL` on the Next.js server with the HTTPS URL of your mail adapter. Optionally set `CONTACT_DELIVERY_TOKEN` for bearer authentication. The server action in `src/app/contact/actions.ts` posts JSON containing `to`, `name`, `email`, `subject`, and `message`. Use a verified sender at the provider, the visitor's email as Reply-To, and the supplied portfolio recipient. Apply provider-side spam and rate controls before enabling public direct delivery.

The adapter must return HTTP 2xx with `{"accepted":true}` only after the provider accepts the letter. Timeouts, provider failures, and other responses keep the form contents and offer the email-app fallback.
