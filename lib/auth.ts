import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["localhost:3000", "*.vercel.app"],
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  database: prismaAdapter(db, {
    provider: "postgresql", // or "sqlite" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
