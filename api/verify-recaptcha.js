// Vercel Serverless Function entry (Vercel only picks up functions from the
// root /api folder). The implementation lives in src/api/verify-recaptcha.js.
// Needs RECAPTCHA_SECRET_KEY set in Vercel > Project > Settings > Environment Variables.
export { default } from "../src/api/verify-recaptcha.js";
