import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";
import { DatabaseEnvConfig } from "@/swiss/db/DatabaseEnvSchema";
import { count, SQL } from "drizzle-orm";
import * as p from 'drizzle-orm/pg-core';


export class DrizzleClient {
  public pool: Pool;
  public db: ReturnType<typeof drizzle>;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
    this.db = drizzle(this.pool);
  }

  static buildConnectionString(config: DatabaseEnvConfig): string {
    return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }

  async getCount(table: p.PgTableWithColumns<any>, whereBase?: SQL<unknown>): Promise<number | undefined> {
    const result = await this.db.select({ count: count() }).from(table).where(whereBase);
    return result[0]?.count ?? undefined;
  }

}
