export async function sendVerificationEmail(email, code) {

  try {
    await transporter.verify();
    console.log("MAIL CONNECTION OK");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <h1>${code}</h1>
      `,
    });

    console.log("EMAIL SENT");

  } catch (error) {
    console.log("EMAIL SEND ERROR:", error);
    throw error;
  }
}
