"use server";

import { auth } from "@/auth";
import { setupTotpForUser, enableTotpForUser, disableTotpForUser, userHasTotpEnabled } from "@/lib/totp";

/**
 * Gets the TOTP setup data (secret and QR code) for the current user
 */
export async function getTotpSetupAction() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const { secret, qrCodeUrl } = await setupTotpForUser(
      session.user.id,
      session.user.email!
    );
    
    return { 
      success: true, 
      data: { secret, qrCodeUrl }
    };
  } catch (error) {
    console.error("Error setting up TOTP:", error);
    return { success: false, message: "Failed to set up TOTP" };
  }
}

/**
 * Enables TOTP for the current user after verifying their code
 */
export async function enableTotpAction(code: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const result = await enableTotpForUser(session.user.id, code);
    return result;
  } catch (error) {
    console.error("Error enabling TOTP:", error);
    return { success: false, message: "Failed to enable TOTP" };
  }
}

/**
 * Disables TOTP for the current user
 */
export async function disableTotpAction() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    await disableTotpForUser(session.user.id);
    return { success: true, message: "TOTP disabled successfully" };
  } catch (error) {
    console.error("Error disabling TOTP:", error);
    return { success: false, message: "Failed to disable TOTP" };
  }
}

/**
 * Checks if the current user has TOTP enabled
 */
export async function checkTotpStatusAction() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { success: false, enabled: false };
  }

  try {
    const enabled = await userHasTotpEnabled(session.user.id);
    return { success: true, enabled };
  } catch (error) {
    console.error("Error checking TOTP status:", error);
    return { success: false, enabled: false };
  }
}
