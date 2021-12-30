import nodemailer from "nodemailer";

export const sendEmail = async (text: string, to: string) => {
  let account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.enthereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOptions = {
    form: '"Irere123" <irere@irere.com>',
    to: to,
    subject: "Confirm your email",
    text,
    html: "<h1>Hello world</h1>",
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message send: %as", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
