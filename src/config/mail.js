import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "EXISTS" : "MISSING");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error) => {
  if (error) {
    console.log("MAIL ERROR:", error);
  } else {
    console.log("MAIL READY");
  }
});

export default transporter;
