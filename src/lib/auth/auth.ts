import NextAuth from "next-auth";
import { NextAuthKeycloak } from "@/swiss/auth/NextAuthKeycloak";

export const { handlers, auth } = NextAuth(new NextAuthKeycloak({
  clientId: process.env.KEYCLOAK_CLIENT_ID as string,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
  issuer: process.env.KEYCLOAK_ISSUER as string,
  authSecret: process.env.AUTH_SECRET as string,
}).config);