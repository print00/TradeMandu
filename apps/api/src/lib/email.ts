import { Resend } from "resend";
import { env, isProduction } from "../config/env.js";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!env.RESEND_API_KEY) {
    if (isProduction) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }

  return resendClient;
}

function buildOtpHtml(otp: string, expiryMinutes: number) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      <p>Your TradeMandu one-time password is:</p>
      <p style="font-size: 28px; font-weight: 700; letter-spacing: 6px; margin: 16px 0;">
        ${otp}
      </p>
      <p>It expires in ${expiryMinutes} minutes.</p>
      <p>If you did not request this code, you can ignore this email.</p>
    </div>
  `;
}

export async function sendOtpEmail(email: string, otp: string, expiryMinutes: number) {
  if (env.OTP_DEV_MODE) {
    return;
  }

  const client = getResendClient();

  if (!client) {
    return;
  }

  if (!env.OTP_EMAIL_FROM) {
    throw new Error("OTP_EMAIL_FROM is not configured");
  }

  const { error } = await client.emails.send({
    from: env.OTP_EMAIL_FROM,
    to: [email],
    subject: env.OTP_EMAIL_SUBJECT,
    html: buildOtpHtml(otp, expiryMinutes),
    text: `Your TradeMandu OTP is ${otp}. It expires in ${expiryMinutes} minutes.`,
    ...(env.OTP_EMAIL_REPLY_TO ? { replyTo: env.OTP_EMAIL_REPLY_TO } : {})
  });

  if (error) {
    throw new Error(error.message);
  }
}
