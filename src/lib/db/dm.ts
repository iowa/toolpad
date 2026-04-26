import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgLiteDrizzle } from 'drizzle-orm/pglite';
import { relations } from "@/lib/db/schema/relations";
import { PGlite } from "@electric-sql/pglite";
import { DatabaseConfigUtils, DrizzlePoolManager } from "@/toolpad/node/db";

export const drizzleDatabaseKeys = ['toolpad'] as const;
export type DrizzleDatabaseKey = (typeof drizzleDatabaseKeys)[number];

const dm = new DrizzlePoolManager();

export type ProdDrizzleClient = ReturnType<typeof getDC>
export type MockDrizzleClient = ReturnType<typeof getMockDC>
export type DrizzleClient = ProdDrizzleClient | MockDrizzleClient

export function getDC(key: DrizzleDatabaseKey) {
  const statementTimeoutMs = 120000;
  switch (key) {
    case 'toolpad': {
      const client = dm.get(key, {
        connectionString: new DatabaseConfigUtils().buildConnectionString('toolpad', statementTimeoutMs),
        max: 4,
        query_timeout: statementTimeoutMs,
        application_name: 'toolpad',
      });
      const db = pgDrizzle({ client: client, relations: relations });
      return { client, db };
    }
    default:
      throw new Error(`Unknown instance for ${key}`);
  }
}

export function getMockDC(key: DrizzleDatabaseKey) {
  switch (key) {
    case 'toolpad': {
      const client = new PGlite();
      const db = pgLiteDrizzle({ client: client, relations });
      return { client, db }
    }
    default:
      throw new Error(`Unknown instance for ${key}`);
  }
}
