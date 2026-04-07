import { DatabaseEnvConfigZod } from "@/swiss/db";
import { defineConfig } from 'drizzle-kit';

const databaseEnv = DatabaseEnvConfigZod.parse();

export default defineConfig({
  out: './drizzle',
  schema: './src/app/lib/db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: new DatabaseEnvConfigZod(databaseEnv).buildConnectionString(),
  },
});
