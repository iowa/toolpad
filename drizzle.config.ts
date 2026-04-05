import { defineConfig } from 'drizzle-kit';
import { DatabaseEnvConfigZod } from "@/swiss/db/DatabaseEnvSchema";
import { Drizzles } from "@/swiss/db/Drizzles";

const databaseEnv = DatabaseEnvConfigZod.parse();

export default defineConfig({
  out: './drizzle',
  schema: './src/app/lib/db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: Drizzles.buildConnectionString(
      databaseEnv
    ),
  },
});
