import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgLiteDrizzle } from 'drizzle-orm/pglite';
import { Pool, PoolConfig } from "pg";
import { DatabaseEnvConfig } from "@/swiss/db/DatabaseEnvSchema";
import { PGlite } from "@electric-sql/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { relations } from "@/app/lib/db/schema/relations";

export type PgDB = ReturnType<typeof pgDrizzle>
export type DB = ReturnType<typeof pgDrizzle> | ReturnType<typeof pgLiteDrizzle>;

export class DrizzleDB {
  public db: ReturnType<typeof pgDrizzle>;

  constructor(config: PoolConfig) {
    const pool = new Pool(config);
    this.db = pgDrizzle(pool, { relations });
  }

  static buildConnectionString(config: DatabaseEnvConfig): string {
    return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }

}

export class DrizzleTestDB {
  public pgLiteClient: PGlite;
  public db: ReturnType<typeof pgLiteDrizzle>;

  constructor() {
    this.pgLiteClient = new PGlite();
    this.db = pgLiteDrizzle(this.pgLiteClient, { relations });
  }

  async migrate(migrationsFolder: string) {
    await migrate(this.db, { migrationsFolder: migrationsFolder });
  }

}
