import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})
transporter.verify((error) => {
  if (error) {
    console.log("MAIL ERROR:", error);
  } else {
    console.log("MAIL READY");
  }
});
export default transporter
