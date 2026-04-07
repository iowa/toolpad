import { DatabaseEnvConfigZod, DrizzlePoolManager } from "@/swiss";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgLiteDrizzle } from 'drizzle-orm/pglite';
import { relations } from "@/app/lib/db/schema/relations";
import { PGlite } from "@electric-sql/pglite";

export const drizzleDatabaseKeys = ['toolpad'] as const;
export type DrizzleDatabaseKey = (typeof drizzleDatabaseKeys)[number];

const dm = new DrizzlePoolManager();

export type ProdDrizzleClient = ReturnType<typeof getDC>
export type MockDrizzleClient = ReturnType<typeof getMockDC>
export type DrizzleClient = ProdDrizzleClient | MockDrizzleClient


export function getDC(key: DrizzleDatabaseKey) {
  switch (key) {
    case 'toolpad': {
      const databaseEnv = DatabaseEnvConfigZod.parse();
      const client = dm.get(key, {
        connectionString: new DatabaseEnvConfigZod(databaseEnv).buildConnectionString(),
        max: 4,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        query_timeout: 10000,
        application_name: key,
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
