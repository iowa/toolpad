import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";
import { DatabaseEnvConfig } from "@/swiss/db/DatabaseEnvSchema";


export class Drizzles {
  public pool: Pool;
  public db: ReturnType<typeof drizzle>;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);

    this.db = drizzle(this.pool);
  }

  static buildConnectionString(config: DatabaseEnvConfig): string {
    return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }
}