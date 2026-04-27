import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from "@/lib/auth/auth";

export default async function LoginLayout({ children }: React.PropsWithChildren) {
  const session = await auth();
  if (session?.user) {
    return redirect('/');
  }
  return <>{children}</>;
}