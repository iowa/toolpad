import { DatabaseEnvConfigZod } from "@/swiss/db/DatabaseEnvSchema";
import { DrizzleClient, DrizzleClientManager } from "@/swiss";

export const drizzleClientKeys = ['toolpad'] as const;
export type DrizzleClientKey = (typeof drizzleClientKeys)[number];

const dm = new DrizzleClientManager();

export function getDc(key: DrizzleClientKey): DrizzleClient {
  switch (key) {
    case 'toolpad': {
      const databaseEnv = DatabaseEnvConfigZod.parse();
      return dm.get(key, {
        connectionString: DrizzleClient.buildConnectionString(databaseEnv),
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

