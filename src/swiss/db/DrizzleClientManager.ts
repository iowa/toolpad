import { PoolConfig } from "pg";
import { DrizzleClient } from "@/swiss";

export class DrizzleClientManager {
  private clients: Record<string, DrizzleClient> = {};

  get(key: string, config: PoolConfig): DrizzleClient {
    const existing = this.clients[key];
    if (existing) return existing;
    const instance = new DrizzleClient(config);
    this.clients[key] = instance;
    return instance;
  }
}