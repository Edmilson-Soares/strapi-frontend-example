
const { json } = require("body-parser");
const nodemailer = require("nodemailer");
const cripton = require('./crypton')
module.exports=async function main(user) {
// async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    auth: {
      user: "edmilsonsoares120@gmail.com", // generated ethereal user
      pass: "felicidade123456", // generated ethereal password
    },
  });
  const now = new Date();
  now.setHours(now.getHours()+1)
  let link;
  
  link=`https://4d1ab72ccab9.ngrok.io/auth/recuperar${await cripton.crypt(user)}+${await cripton.crypt(now.toString())}`

  let info = await transporter.sendMail({
    from: '"Edmilson Soares" <edmilsonsoares120@gmail.com>', // sender address
    to: user, // list of receivers
    subject: "Recuperação de senha", // Subject line
    text: "", // plain text body
    html: `<b>Entre em Recuperar Senha  para recuperar a sua senha: </b>  <a href="${await link}" >Recuperar Senha</a>`, // html body
  });  

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return nodemailer.getTestMessageUrl(info);
}

//main().catch(console.error);


