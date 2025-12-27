import { tranEmailApi } from "./email.config.js";

export const sendEmail = async ({ to, subject, html }) => {
   tranEmailApi.sendTransacEmail({
    sender: {
      name: "Tonar Support",
      email: "itsashu268@gmail.com" // verified sender
    },
    to: [{ email: to }],
    subject,
    htmlContent: html
  });
};

