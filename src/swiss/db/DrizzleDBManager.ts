import { PoolConfig } from "pg";
import { DrizzleDB, PgDB } from "@/swiss";

export class DrizzleDBManager {
  private databases: Record<string, PgDB> = {};

  get(key: string, config: PoolConfig): PgDB {
    const existing = this.databases[key];
    if (existing) return existing;
    const instance = new DrizzleDB(config).db;
    this.databases[key] = instance;
    return instance;
  }
}