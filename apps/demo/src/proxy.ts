import { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from 'next/server';
import { ProxyGuard } from "@/lib/auth/ProxyGuard";

export default auth;

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png|.*\\.svg$).*)'],
};

export async function proxy(request: NextRequest) {
  const session = await auth();
  const shouldRedirect = await new ProxyGuard(session, request).redirectToSignIn();
  if (shouldRedirect) {
    return shouldRedirect
  }
  return NextResponse.next();
}

