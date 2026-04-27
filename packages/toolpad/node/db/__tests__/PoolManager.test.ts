import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PoolManager } from '../PoolManager';

vi.mock('pg', () => {
  class MockPool {
    constructor(public readonly _config: any) {}
    end = vi.fn();
  }
  return { Pool: MockPool };
});

describe('PoolManager', () => {
  let manager: PoolManager;

  beforeEach(() => {
    manager = new PoolManager();
  });

  it('creates a new pool for an unknown key', () => {
    const config = { connectionString: 'postgresql://localhost/test' };
    const pool = manager.get('main', config);

    expect(pool).toBeDefined();
  });

  it('returns the same pool instance for the same key', () => {
    const config = { connectionString: 'postgresql://localhost/test' };
    const pool1 = manager.get('main', config);
    const pool2 = manager.get('main', { connectionString: 'different' });

    expect(pool1).toBe(pool2);
  });

  it('creates separate pools for different keys', () => {
    const config1 = { connectionString: 'postgresql://localhost/db1' };
    const config2 = { connectionString: 'postgresql://localhost/db2' };

    const pool1 = manager.get('db1', config1);
    const pool2 = manager.get('db2', config2);

    expect(pool1).not.toBe(pool2);
  });
});
