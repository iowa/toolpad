import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { SIGNIN_PATH } from "@/slices/auth/types";

export const { handlers, auth } = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: SIGNIN_PATH,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isOnLogin = nextUrl.pathname === SIGNIN_PATH;
      if (!isLoggedIn) {
        if (isOnLogin) {
          return true;
        }
        return Response.redirect(new URL(SIGNIN_PATH, nextUrl));
      }
      return true;
    },
    jwt({ token, account }) {
      if (account?.access_token) {
        return {
          ...token,
          accessToken: account.access_token
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session;
    },
  }
});