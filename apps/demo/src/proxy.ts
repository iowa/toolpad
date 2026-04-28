import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/slices/auth/auth";
import { ProxyGuard } from "@/slices/auth/services/ProxyGuard";

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

