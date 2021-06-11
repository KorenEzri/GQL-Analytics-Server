import nodemailer, { SendMailOptions } from 'nodemailer';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (options: SendMailOptions) => {
  try {
    await transporter.sendMail(options);
    return true;
  } catch ({ message }) {
    return false;
  }
};

export default transporter;
