import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgLiteDrizzle } from 'drizzle-orm/pglite';
import { Pool, PoolConfig } from "pg";
import { DatabaseEnvConfig } from "@/swiss/db/DatabaseEnvSchema";
import { PGlite } from "@electric-sql/pglite";


export class DrizzleClient {
  public pgLiteClient?: PGlite;
  public db: ReturnType<typeof pgDrizzle> | ReturnType<typeof pgLiteDrizzle>;

  constructor(config?: PoolConfig) {
    if (config) {
      const pool = new Pool(config);
      this.db = pgDrizzle(pool);
    } else {
      this.pgLiteClient = new PGlite();
      this.db = pgLiteDrizzle(this.pgLiteClient)
    }
  }

  static buildConnectionString(config: DatabaseEnvConfig): string {
    return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }

  


}
