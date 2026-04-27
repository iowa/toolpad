import { NextRequest, NextResponse } from 'next/server';
import { AUTH_API, SIGNIN_PATH } from "./types";
import { Session } from "next-auth";

export class ProxyGuard {
  private readonly session: Session | null
  private readonly request: NextRequest

  constructor(session: Session | null, request: NextRequest) {
    this.session = session
    this.request = request
  }

  async redirectToSignIn(): Promise<NextResponse | null> {
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