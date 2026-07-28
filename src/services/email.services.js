import transporter from "../config/mail.js";

export async function sendVerificationEmail(email, code) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${code}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
}

export async function sendVerificationPassword(email, code) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      html: `...`,
    });

    console.log("EMAIL SENT:", info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
}
