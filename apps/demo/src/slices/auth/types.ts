export const AUTH_API = "/api/auth";
export const SIGNIN_PATH = "/auth/signin";

export interface UserIdentity {
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
}
