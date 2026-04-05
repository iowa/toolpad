import { Drizzles } from "@/swiss/db/Drizzles";
import { DatabaseEnvConfigZod } from "@/swiss/db/DatabaseEnvSchema";

const databaseEnv = DatabaseEnvConfigZod.parse();

export const dz = new Drizzles({
  connectionString: Drizzles.buildConnectionString(
    databaseEnv
  ),
  max: 4,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  query_timeout: 10000,
  application_name: 'toolpad'
});
