import { defineConfig } from "drizzle-kit";
import { DatabaseConfig } from "@/toolpad/node";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/shared/lib/db/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: new DatabaseConfig().buildConnectionString("toolpad"),
  },
});
