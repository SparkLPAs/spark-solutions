import { Resend } from "resend";

import type { DemoRequestInput } from "@/lib/validations";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

const fromAddress = () =>
  process.env.RESEND_FROM_EMAIL || "Spark Solutions <hello@spark-solutions.co.uk>";

export async function sendDemoRequestEmails(data: DemoRequestInput) {
  const resend = getResend();
  const notifyTo = process.env.DEMO_NOTIFICATION_EMAIL || "hello@spark-solutions.co.uk";

  await Promise.all([
    resend.emails.send({
      from: fromAddress(),
      to: notifyTo,
      replyTo: data.email,
      subject: `New demo request — ${data.businessName}`,
      html: `
        <h2>New demo request</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Business:</strong> ${data.businessName} (${data.businessType})</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Heard about us via:</strong> ${data.referralSource}</p>
        ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}
      `,
    }),
    resend.emails.send({
      from: fromAddress(),
      to: data.email,
      subject: "Thanks for your interest in Spark Solutions",
      html: `
        <p>Hi ${data.fullName.split(" ")[0]},</p>
        <p>Thanks for requesting a demo of Spark Solutions. The team will be in touch within
        1 business day to arrange a time that suits you.</p>
        <p>In the meantime, feel free to explore
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://spark-solutions.co.uk"}/pricing">our pricing</a>
        or <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://spark-solutions.co.uk"}/features">everything included</a>.</p>
        <p>Speak soon,<br />The Spark Solutions team</p>
      `,
    }),
  ]);
}
