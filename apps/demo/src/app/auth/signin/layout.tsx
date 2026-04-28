import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/slices/auth/auth";

export default async function LoginLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }
  return <>{children}</>;
}
