import type { PrevState } from "@/config/types";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { differenceInMinutes } from "date-fns";
import { headers } from "next/headers";

let ratelimitLogin: Ratelimit | null = null;
let ratelimitOtp: Ratelimit | null = null;

// Initialize rate limiters lazily and with error handling
function getRateLimiter(type: "otp" | "login"): Ratelimit | null {
  try {
    if (type === "login") {
      if (!ratelimitLogin) {
        ratelimitLogin = new Ratelimit({
          redis: Redis.fromEnv(),
          limiter: Ratelimit.slidingWindow(5, "10 m"),
        });
      }
      return ratelimitLogin;
    } else {
      if (!ratelimitOtp) {
        ratelimitOtp = new Ratelimit({
          redis: Redis.fromEnv(),
          limiter: Ratelimit.slidingWindow(3, "10 m"),
        });
      }
      return ratelimitOtp;
    }
  } catch (error) {
    console.warn("Failed to initialize rate limiter:", error);
    return null;
  }
}

async function genericRateLimiter(type: "otp" | "login") {
  const limiter = getRateLimiter(type);
  if (!limiter) {
    // Graceful degradation - allow request if Redis unavailable
    return { success: true, reset: Date.now() };
  }
  
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "";
  return limiter.limit(ip);
}

export async function genericRateLimit(
  type: "otp" | "login"
): Promise<PrevState | undefined> {
  try {
    const { success, reset } = await genericRateLimiter(type);
    const resetTime = new Date(reset);
    const now = new Date();
    const diffInSeconds = Math.round(
      (resetTime.getTime() - now.getTime()) / 1000
    );

    if (!success) {
      if (diffInSeconds > 60) {
        const resetTimeInMinutes = differenceInMinutes(resetTime, now);
        return {
          success: false,
          message: `Too many attempts. Please try again in ${resetTimeInMinutes} minute${resetTimeInMinutes > 1 ? "s" : ""}`,
        };
      }

      return {
        success: false,
        message: `Too many attempts. Please try again in ${diffInSeconds} minute${diffInSeconds > 1 ? "s" : ""}`,
      };
    }
  } catch (error) {
    // Graceful degradation - allow request if rate limiting fails
    console.warn("Rate limiting failed, allowing request:", error);
  }
}

