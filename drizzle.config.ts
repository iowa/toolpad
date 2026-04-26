import { defineConfig } from 'drizzle-kit';
import { DatabaseConfigUtils } from "./npm/node";

export default defineConfig({
  out: './drizzle',
  schema: './src/demo/lib/db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: new DatabaseConfigUtils().buildConnectionString('toolpad'),
  },
});
