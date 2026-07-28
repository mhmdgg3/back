import transporter from "../config/mail.js";

export async function sendVerificationEmail(email, code) {
  await transporter.sendMail({
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
}

export async function sendVerificationPassword(email, code) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Code",
    html: `
  <h2>Reset Your Password</h2>

  <p>Use the verification code below to reset your password:</p>

  <div style="
    font-size:32px;
    font-weight:bold;
    text-align:center;
    background:#f4f4f4;
    padding:20px;
    border-radius:8px;
    letter-spacing:6px;
  ">
    ${code}
  </div>

  <p>This verification code is valid for <strong>10 minutes</strong>.</p>

  <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
`,
  });
}
