import { mailTransporter } from "./email.config.js";

export const sendEmail = async ({ to, subject, html }) => {
  await mailTransporter.sendMail({
    from: "Tonar Support <itsashu268@gmail.com>",
    to,
    subject,
    html
  });
};
