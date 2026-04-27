import { describe, expect, it } from "vitest";
import { JwtDecoder } from "../JwtDecoder";
import { FileLoader } from "../../../node";

describe("JwtDecoder", () => {
  it("decode", () => {
    const accessToken = FileLoader.load(__dirname, '/jwtToken.txt').trim();

    const jwtPayload = new JwtDecoder(accessToken).decode();

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
    const accessToken = FileLoader.load(__dirname, '/jwtToken.txt').trim();
    const roles = new JwtDecoder(accessToken).getRealmRoles();
    expect(roles).toEqual(["admin", "user"]);
  });

  it("getClientRoles", () => {
    const accessToken = FileLoader.load(__dirname, '/jwtToken.txt').trim();
    const roles = new JwtDecoder(accessToken).getClientRoles("test-client");
    expect(roles).toEqual(["client-admin"]);
  });

  it("getClientRoles with non-existent client", () => {
    const accessToken = FileLoader.load(__dirname, '/jwtToken.txt').trim();
    const roles = new JwtDecoder(accessToken).getClientRoles("unknown-client");
    expect(roles).toEqual([]);
  });

  it("returns null when no token provided", () => {
    const decoder = new JwtDecoder();
    expect(decoder.decode()).toBeNull();
    expect(decoder.getRealmRoles()).toEqual([]);
    expect(decoder.getClientRoles("any")).toEqual([]);
  });

  it("getClientRoles returns empty array when no clientId", () => {
    const accessToken = FileLoader.load(__dirname, '/jwtToken.txt').trim();
    const roles = new JwtDecoder(accessToken).getClientRoles(undefined);
    expect(roles).toEqual([]);
  });
});
