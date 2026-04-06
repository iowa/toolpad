import { DatabaseEnvConfigZod } from "@/swiss/db/DatabaseEnvSchema";
import { DB, DrizzleDB, DrizzleDBManager } from "@/swiss";

export const drizzleDatabaseKeys = ['toolpad'] as const;
export type DrizzleDatabaseKey = (typeof drizzleDatabaseKeys)[number];

const dm = new DrizzleDBManager();

export function getDB(key: DrizzleDatabaseKey): DB {
  switch (key) {
    case 'toolpad': {
      const databaseEnv = DatabaseEnvConfigZod.parse();
      return dm.get(key, {
        connectionString: DrizzleDB.buildConnectionString(databaseEnv),
        max: 4,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        query_timeout: 10000,
        application_name: 'toolpad',
      });
    }
    default:
      throw new Error(`Unknown instance for ${key}`);
  }
}

