export const AUTH_API= '/api/auth'
export const SIGNIN_PATH= '/auth/signin'

export type UserIdentity = {
  name: string;
  email: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
};