import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { SIGNIN_PATH } from "@/swiss/auth";

export const useAuth = () => {
  const { data, status } = useSession();
  const to = usePathname();

  const login = () => {
    signIn('keycloak', {
      callbackUrl: to ? to.toString() : '/',
      redirect: true,
    })
  }

  const logout = () => {
    signOut({
      callbackUrl: SIGNIN_PATH,
      redirect: true,
    });
  }

  return { login, logout };
}