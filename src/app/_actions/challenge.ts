"use server";

import { auth } from "../../../auth";
import { completeChallenge, issueChallenge } from "@/lib/otp";
import { genericRateLimit } from "@/lib/rate-limiter";
import { userHasTotpEnabled, verifyTotpForUser } from "@/lib/totp";
import { prisma } from "@/lib/prisma";

export const resendChallengeAction = async () => {
  const limiterError = await genericRateLimit("otp");
  if (limiterError) return limiterError;

  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  // Check if user has TOTP enabled - if so, they don't need email codes
  const hasTotpEnabled = await userHasTotpEnabled(session.user.id as string);
  if (hasTotpEnabled) {
    return {
      success: true,
      message: "Use your Google Authenticator app",
      usesTotp: true,
    };
  }

  await issueChallenge(session.user.id as string, session.user.email as string);

  return {
    success: true,
    message: "Code sent!",
    usesTotp: false,
  };
};

export const completeChallengeAction = async (code: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const { id } = session.user;

  // Check if user has TOTP enabled
  const hasTotpEnabled = await userHasTotpEnabled(id as string);

  if (hasTotpEnabled) {
    // Verify using TOTP
    const totpResult = await verifyTotpForUser(id as string, code);
    if (totpResult.success) {
      // Update session to mark 2FA as complete
      const sessionRecord = await prisma.session.findFirst({
        where: { userId: id as string, requires2FA: true },
      });

      if (sessionRecord) {
        await prisma.session.updateMany({
          where: {
            sessionToken: sessionRecord.sessionToken,
            userId: id as string,
          },
          data: {
            requires2FA: false,
          },
        });
        return { success: true, message: "2FA verified successfully" };
      }
      return { success: false, message: "Could not find the session" };
    }
    return totpResult;
  }

  // Verify using email OTP
  const result = await completeChallenge(id as string, code);
  return result;
};

/**
 * Checks if the current user has TOTP enabled (for the OTP form to show appropriate UI)
 */
export const checkUserTotpStatusAction = async () => {
  const session = await auth();

  if (!session?.user) {
    return { usesTotp: false };
  }

  const hasTotpEnabled = await userHasTotpEnabled(session.user.id as string);
  return { usesTotp: hasTotpEnabled };
};

