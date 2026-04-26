import { describe, expect, it } from "vitest";
import { TestFiles } from "@/swiss/test/TestFiles";
import { Jwts } from "@/swiss/auth/Jwts";

describe("Jwts", () => {
  it("decode", () => {
    const accessToken = TestFiles.load(__dirname, '/jwtToken.txt').trim();

    const jwtPayload = Jwts.decode(accessToken);

    expect(jwtPayload).toMatchInlineSnapshot(`
      {
        "family_name": "Doe",
        "given_name": "John",
        "iat": 1516239022,
        "name": "John Doe",
        "preferred_username": "jdoe",
        "realm_access": {
          "roles": [
            "admin",
            "user",
          ],
        },
        "sub": "1234567890",
      }
    `);
  });
});
