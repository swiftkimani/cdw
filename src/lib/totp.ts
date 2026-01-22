import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import { env } from "@/env";
import { prisma } from "./prisma";

// App name shown in Google Authenticator
const APP_NAME = "CarDealershipCMS";

/**
 * Generates a new TOTP secret for a user
 */
export function generateTotpSecret(email: string): OTPAuth.TOTP {
  const secret = new OTPAuth.Secret({ size: 20 });

  const totp = new OTPAuth.TOTP({
    issuer: APP_NAME,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret,
  });

  return totp;
}

/**
 * Creates a TOTP from an existing base32 secret
 */
export function getTotpFromSecret(email: string, base32Secret: string): OTPAuth.TOTP {
  return new OTPAuth.TOTP({
    issuer: APP_NAME,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(base32Secret),
  });
}

/**
 * Generates a QR code data URL for scanning with Google Authenticator
 */
export async function generateTotpQrCode(totp: OTPAuth.TOTP): Promise<string> {
  const otpauthUrl = totp.toString();
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl, {
    width: 256,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });
  return qrCodeDataUrl;
}

/**
 * Verifies a TOTP code against a secret
 * Returns true if the code is valid within the time window
 */
export function verifyTotpCode(totp: OTPAuth.TOTP, code: string): boolean {
  // Delta of 1 allows for clock drift (previous, current, or next period)
  const delta = totp.validate({ token: code, window: 1 });
  return delta !== null;
}

/**
 * Sets up TOTP for a user - stores the secret and generates QR code
 */
export async function setupTotpForUser(
  userId: string,
  email: string
): Promise<{ secret: string; qrCodeUrl: string }> {
  const totp = generateTotpSecret(email);
  const secret = totp.secret.base32;
  const qrCodeUrl = await generateTotpQrCode(totp);

  // Store the secret (but don't enable TOTP yet)
  await prisma.user.update({
    where: { id: userId },
    data: { totpSecret: secret },
  });

  return { secret, qrCodeUrl };
}

/**
 * Enables TOTP for a user after they've verified their first code
 */
export async function enableTotpForUser(
  userId: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, totpSecret: true },
  });

  if (!user || !user.totpSecret) {
    return { success: false, message: "TOTP not set up for this user" };
  }

  const totp = getTotpFromSecret(user.email, user.totpSecret);
  const isValid = verifyTotpCode(totp, code);

  if (!isValid) {
    return { success: false, message: "Invalid verification code" };
  }

  // Enable TOTP for the user
  await prisma.user.update({
    where: { id: userId },
    data: { totpEnabled: true },
  });

  return { success: true, message: "TOTP enabled successfully" };
}

/**
 * Disables TOTP for a user
 */
export async function disableTotpForUser(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { totpEnabled: false, totpSecret: null },
  });
}

/**
 * Verifies a TOTP code during login
 */
export async function verifyTotpForUser(
  userId: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, totpSecret: true, totpEnabled: true },
  });

  if (!user || !user.totpEnabled || !user.totpSecret) {
    return { success: false, message: "TOTP not enabled for this user" };
  }

  const totp = getTotpFromSecret(user.email, user.totpSecret);
  const isValid = verifyTotpCode(totp, code);

  if (!isValid) {
    return { success: false, message: "Invalid verification code" };
  }

  return { success: true, message: "Code verified successfully" };
}

/**
 * Checks if a user has TOTP enabled
 */
export async function userHasTotpEnabled(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { totpEnabled: true },
  });
  return user?.totpEnabled ?? false;
}
