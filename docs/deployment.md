# Run and stage SolvingOdds

Use Node.js 22 or 24 LTS and install the committed dependency lockfile.

```sh
npm ci
npm run build
npm run start -- --port 3000
```

Run the production HTML checks against that server in a separate terminal.

```sh
node tests/production-html.mjs
```

The build prerenders the homepage, About, the services overview, and all three service details. Contact renders on demand so a `?service=` link can preselect the inquiry type in the initial HTML. Deploy with the Next.js runtime.

## Vercel preview deployment

1. Import the repository into a Vercel project with the **Next.js** framework preset and the repository root as the project directory. If importing into a project with an existing static setup, clear the Vite build and `dist` output overrides.
2. Create a **Preview** deployment from the migration branch and use the preview URL for acceptance checks.
3. Configure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` for Preview before building. Use a Web3Forms key linked to your test inbox for a preview delivery check. See [contact.md](contact.md).
4. Run the raw checks with `QA_BASE_URL` set to the preview URL, then verify navigation, motion, responsive layouts, and the form. Send a clearly labeled test inquiry to the configured test inbox and confirm receipt before a production cutover.

Public pages advertise `https://solvingodds.com` as their canonical origin, including on previews. Keep the preview URL separate from the production domain during acceptance testing.
