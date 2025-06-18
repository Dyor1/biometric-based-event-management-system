// utils/sendMail.js
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (to, subject, text) => {
  try {
    const sendSmtpEmail = {
      sender: { name: 'EventBot', email: 'noreplyevnm@gmail.com' },
      to: [{ email: to }],
      subject,
      textContent: text,
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Mail error:`, err);
  }
};

module.exports = sendMail;
