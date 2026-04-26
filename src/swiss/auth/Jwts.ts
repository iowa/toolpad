import jwt, { JwtPayload } from 'jsonwebtoken';

export class Jwts {
  private readonly decoded: JwtPayload | null;

  constructor(accessToken?: string) {
    this.decoded = accessToken ? (jwt.decode(accessToken) as JwtPayload) : null;
  }

  decode() {
    return this.decoded;
  }

  getRealmRoles(): string[] {
    return (this.decoded?.realm_access as any)?.roles || [];
  }

  getClientRoles(clientId?: string): string[] {
    if (!clientId) {
      return [];
    }
    return (this.decoded?.resource_access as any)?.[clientId]?.roles || [];
  }

}