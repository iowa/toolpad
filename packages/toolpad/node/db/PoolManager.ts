import { Pool, PoolConfig } from 'pg';

export class PoolManager {
  private pools: Record<string, Pool> = {};

  get(key: string, config: PoolConfig): Pool {
    const existing = this.pools[key];
    if (existing) return existing;
    const instance = new Pool(config)
    this.pools[key] = instance;
    return instance;
  }
}