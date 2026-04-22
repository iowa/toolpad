import jwt, { JwtPayload } from 'jsonwebtoken';

export class Jwts {

  static decode(accessToken?: string) {
    return accessToken ? (jwt.decode(accessToken) as JwtPayload) : null;
  }

}