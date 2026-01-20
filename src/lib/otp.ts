import ChallengeEmail from "../../emails/challenge";
import { env } from "@/env";
import { bcryptPasswordCompare, bcryptPasswordHash } from "./bcrypt";
import { prisma } from "./prisma";
import { resend } from "./resend";

// helper which issues a new 2fa challenge for user and sends them the code
// if there is already an outstanding challenge, it just resends same code

export async function issueChallenge(userId: string, email: string) {
  const array = new Uint32Array(1);
  const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
  const hash = await bcryptPasswordHash(code.toString());
  
  // Calculate expiry (10 minutes from now)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Upsert the challenge (create or update if exists)
  await prisma.otpChallenge.upsert({
    where: { userId },
    update: { codeHash: hash, email, expiresAt },
    create: { userId, codeHash: hash, email, expiresAt },
  });

  const { error } = await resend.emails.send({
    from: env.FROM_EMAIL_ADDRESS,
    to: email,
    subject: `Sign in to ${env.NEXT_PUBLIC_APP_URL}`,
    react: ChallengeEmail({ data: { code } }),
  });

  if (error) {
    console.log({ error });
    throw new Error(`Error sending email: ${error.name} - ${error.message}`);
  }
}

// check whether a user supplied challenge code is correct, and if so, update the session

export async function completeChallenge(userId: string, code: string) {
  const challenge = await prisma.otpChallenge.findUnique({
    where: { userId },
  });

  if (challenge && challenge.expiresAt > new Date()) {
    const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
    if (isCorrect) {
      const session = await prisma.session.findFirst({
        where: { userId, requires2FA: true },
      });

      if (session) {
        await prisma.session.updateMany({
          where: {
            sessionToken: session.sessionToken,
            userId,
          },
          data: {
            requires2FA: false,
          },
        });
        // Delete the used challenge
        await prisma.otpChallenge.delete({ where: { userId } });

        return { success: true, message: "2FA enabled successfully" };
      }
      return {
        succcess: false,
        message: "Could not find the session for the user",
      };
    }
    return {
      succcess: false,
      message: "Incorrect verification code - please try again",
    };
  }
  return {
    succcess: false,
    
    message: "Challenge does not exist or has expired - please try again",
  };
}

