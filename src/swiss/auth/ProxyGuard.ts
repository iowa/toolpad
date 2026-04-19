import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/demo/lib/auth/auth";
import { AUTH_API, SIGNIN_PATH } from "@/swiss/auth/types";

export class ProxyGuard {
  private readonly request: NextRequest

  constructor(request: NextRequest) {
    this.request = request
  }

  async redirectToSignIn(): Promise<NextResponse | null> {
    const { pathname } = this.request.nextUrl;
    if (pathname.startsWith(AUTH_API)) {
      return NextResponse.next();
    }
    const session = await auth();
    if (!session && pathname !== SIGNIN_PATH) {
      return NextResponse.redirect(new URL(SIGNIN_PATH, this.request.url));
    }
    return null;
  }


}