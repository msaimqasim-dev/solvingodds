# Contact form delivery

The contact form submits to Web3Forms from the browser. Web3Forms routes each inquiry to the destination configured for its access key. Replying to an inquiry uses the visitor’s email address.

## Local setup

1. Find the access key for the existing SolvingOdds form in Web3Forms and confirm its destination inbox.
2. Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=YOUR_EXISTING_WEB3FORMS_KEY` to `.env.local` in the project root. Replace the placeholder with the actual access key. This public browser key is intended for use in the form.
3. Stop the old development or preview server. Run `npm.cmd run dev -- --port 3010` and open `http://localhost:3010/contact`.
4. Submit a clearly labeled test inquiry when ready. The success message confirms Web3Forms accepted the submission. Check the configured inbox and Junk folder to confirm delivery.

For Vercel, add the same variable in **Project Settings → Environment Variables**, then rebuild the intended deployment. Next.js embeds public environment variables in the browser bundle at build time.

If you previously configured direct mail, open `.env.local` yourself and delete the lines whose names start with `SMTP_`. You can also remove the old `CONTACT_EMAIL_TO` line. Keep the file and its `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` entry.

The form validates the fields, blocks submissions that fill its honeypot, and retains input after delivery errors. The browser QA suite intercepts Web3Forms requests to exercise responses without sending real messages.
