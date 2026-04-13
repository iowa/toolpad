import { DatabaseConfigUtils } from "@/swiss/db";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/demo/lib/db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: new DatabaseConfigUtils().buildConnectionString('toolpad'),
  },
});
