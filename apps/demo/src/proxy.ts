import { type NextRequest, NextResponse } from 'next/server';
import { ProxyGuard } from "@/slices/auth/services/proxy-guard";
// biome-ignore lint/style/noExportedImports: <explanation>
import { auth } from "@/slices/auth/auth";

export default auth;

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png|.*\\.svg$).*)'],
};

export async function proxy(request: NextRequest) {
  const session = await auth();
  const shouldRedirect = new ProxyGuard(session, request).redirectToSignIn();
  if (shouldRedirect) {
    return shouldRedirect
  }
  return NextResponse.next();
}

