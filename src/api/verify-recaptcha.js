// api/verify-recaptcha.js
// Vercel Serverless Function — reCAPTCHA token eka Google server eketa yawala
// verify karanawa. Secret Key eka methanin witharai use wenne (client ekata yanne na).

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { token } = req.body || {};

  if (!token) {
    return res.status(400).json({ success: false, message: "Missing reCAPTCHA token" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({ success: false, message: "Server misconfigured: secret key missing" });
  }

  try {
    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await verifyResponse.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({
      success: false,
      message: "reCAPTCHA verification failed",
      errors: data["error-codes"] || [],
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Verification request failed" });
  }
}
