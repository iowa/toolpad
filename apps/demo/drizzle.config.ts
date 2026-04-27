import { defineConfig } from 'drizzle-kit';
import { DatabaseConfigUtils } from "../../packages/toolpad/node";

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: new DatabaseConfigUtils().buildConnectionString('toolpad'),
  },
});
