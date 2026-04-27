import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { SIGNIN_PATH, UserIdentity } from "@/lib/auth/types";
import { JwtDecoder } from "@/toolpad/utils";

export const useAuth = () => {
  const { data: session } = useSession();
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

  const getIdentity = (): UserIdentity | null => {
    if (session?.user) {
      const { user } = session;
      const decodedAccessToken = new JwtDecoder(session?.accessToken).decode();
      return {
        name: user.name,
        email: user.email,
        preferred_username: decodedAccessToken?.['preferred_username'],
        given_name: decodedAccessToken?.['given_name'],
        family_name: decodedAccessToken?.['family_name'],
      } as UserIdentity;
    }
    return null;
  }

  const getInitials = (): string => {
    const identity = getIdentity();
    return identity?.given_name && identity?.family_name
      ? `${identity.given_name[0]}${identity.family_name[0]}`
      : identity?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2) || '';
  }

  return { login, logout, getIdentity, getInitials };
}