import { mailTransporter } from "./email.config.js";

export const sendEmail = async ({ to, subject, html }) => {
  await mailTransporter.sendMail({
    from: `"Tonar Support" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
};
