import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const nodemailerConfig = {
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};

// export const sendEmail = (data) => {
//   const email = { ...data, from: UKR_NET_FROM };
//   return transport.sendMail(email);
// };