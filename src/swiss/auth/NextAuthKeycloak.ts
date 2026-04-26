import { NextAuthConfig } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { SIGNIN_PATH } from "@/swiss/auth/types";

export type NextAuthKeycloakConfig = {
  clientId: string
  clientSecret: string
  issuer: string
  authSecret: string
}


export class NextAuthKeycloak {

  readonly config: NextAuthConfig

  constructor(config: NextAuthKeycloakConfig) {
    this.config = {
      providers: [
        KeycloakProvider({
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          issuer: config.issuer,
        }),
      ],
      secret: config.authSecret,
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
    }
  }
}