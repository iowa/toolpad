import { auth } from "@/demo/lib/auth/auth";
import { NextRequest, NextResponse } from 'next/server';
import { ProxyGuard } from "@/swiss/auth/ProxyGuard";

export default auth;

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png|.*\\.svg$).*)'],
};

export async function proxy(request: NextRequest) {
  const shouldRedirect = await new ProxyGuard(request).redirectToSignIn();
  if (shouldRedirect) {
    return shouldRedirect
  }
  return NextResponse.next();
}

