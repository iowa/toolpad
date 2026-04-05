import { Drizzles } from "@/swiss/db/Drizzles";
import { DatabaseEnvConfigZod } from "./DatabaseEnvSchema";

const databaseEnv = DatabaseEnvConfigZod.parse();

export const dbToolpad = new Drizzles({
  connectionString: Drizzles.buildConnectionString(
    databaseEnv
  ),
  max: 4,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  query_timeout: 10000
});
