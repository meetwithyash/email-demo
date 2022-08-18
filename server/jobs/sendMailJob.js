const nodemailer = require("nodemailer");

const messages = require("../constants");
const { getPendingUsers } = require("../models/User");

const sendMailJob = async () => {
  console.log(`Running job`);

  const users = getPendingUsers();

  if(users.length === 0) return;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    pool: true,
    maxMessages: Infinity,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  let userIndex = 0;
  transport.on("idle", function () {
    while (transport.isIdle() && userIndex < users.length) {
      const messageIndex = users[userIndex].messages.shift();
      
      const userEmail = users[userIndex].email;
      const userEmailMessage = messages[messageIndex].message;

      console.log(`Sending mail to ${userEmail}, ${userIndex}`);
      
      transport.sendMail({ 
        from: process.env.MAIL_USER,
        to: userEmail,
        subject: `Hello ${userEmail}`,
        html: `Hi, ${userEmail}<br/><br/>${userEmailMessage}`
      }).catch((error) => console.log(`Error in sending mail `, error));

      userIndex++;
    }
  });
}

module.exports = {
  sendMailJob
}