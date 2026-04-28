import { type NextRequest, NextResponse } from "next/server";
import type { Session } from "next-auth";
import { AUTH_API, SIGNIN_PATH } from "@/slices/auth/types";

export class ProxyGuard {
  private readonly session: Session | null;
  private readonly request: NextRequest;

  constructor(session: Session | null, request: NextRequest) {
    this.session = session;
    this.request = request;
  }

  redirectToSignIn(): NextResponse | null {
    const { pathname } = this.request.nextUrl;
    if (pathname.startsWith(AUTH_API)) {
      return NextResponse.next();
    }
    if (!this.session && pathname !== SIGNIN_PATH) {
      return NextResponse.redirect(new URL(SIGNIN_PATH, this.request.url));
    }
    return null;
  }
}
