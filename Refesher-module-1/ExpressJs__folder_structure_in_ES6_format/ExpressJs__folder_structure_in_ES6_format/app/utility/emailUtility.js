var nodemailer = require("nodemailer");
const EmailSend = async (emailTo, emailText, emailSubject) => {
  const transporter = nodemailer.createTransport({
    host: "mail.themesoft69.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mern_ostad@themesoft69.com",
      pass: "h4e24DFTj6v)",
    },
  });

  const info = {
    from: '"Ostad MERN 6 👻" <mern_ostad@themesoft69.com>', // sender address
    to: emailTo, // list of receivers
    subject: emailSubject, // Subject line
  };

  return await transporter.sendMail(info);
};

export default EmailSend;
