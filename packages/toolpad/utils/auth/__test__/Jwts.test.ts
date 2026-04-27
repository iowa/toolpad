import { describe, expect, it } from "vitest";
import { TestFiles } from "../../test";
import { Jwts } from "../Jwts";

describe("Jwts", () => {
  it("decode", () => {
    const accessToken = TestFiles.load(__dirname, '/jwtToken.txt').trim();

    const jwtPayload = new Jwts(accessToken).decode();

    expect(jwtPayload).toMatchObject({
      family_name: "Doe",
      given_name: "John",
      iat: 1516239022,
      name: "John Doe",
      preferred_username: "jdoe",
      realm_access: {
        roles: ["admin", "user"],
      },
      resource_access: {
        "test-client": {
          roles: ["client-admin"],
        },
      },
      sub: "1234567890",
    });
  });

  it("getRealmRoles", () => {
    const accessToken = TestFiles.load(__dirname, '/jwtToken.txt').trim();
    const roles = new Jwts(accessToken).getRealmRoles();
    expect(roles).toEqual(["admin", "user"]);
  });

  it("getClientRoles", () => {
    const accessToken = TestFiles.load(__dirname, '/jwtToken.txt').trim();
    const roles = new Jwts(accessToken).getClientRoles("test-client");
    expect(roles).toEqual(["client-admin"]);
  });

  it("getClientRoles with non-existent client", () => {
    const accessToken = TestFiles.load(__dirname, '/jwtToken.txt').trim();
    const roles = new Jwts(accessToken).getClientRoles("unknown-client");
    expect(roles).toEqual([]);
  });
});
