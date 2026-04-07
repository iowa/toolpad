import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseEnvConfigZod } from '@/swiss';

const restoreEnv = (orig: NodeJS.ProcessEnv) => {
  // Clear current keys
  for (const k of Object.keys(process.env)) {
    delete process.env[k];
  }
  // Restore originals
  Object.assign(process.env, orig);
};

describe('DatabaseEnvConfigZod.parse', () => {
  const OLD_ENV = { ...process.env };

  beforeEach(() => {
    restoreEnv(OLD_ENV);
  });

  afterEach(() => {
    restoreEnv(OLD_ENV);
  });

  it('parses environment variables using defaults', () => {
    process.env.DB_USER = 'testuser';
    process.env.DB_PASSWORD = 'testpass';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_NAME = 'mydb';

    const cfg = DatabaseEnvConfigZod.parse();

    expect(cfg).toEqual({
      user: 'testuser',
      password: 'testpass',
      host: 'localhost',
      port: 5432,
      database: 'mydb',
    });
  });

  it('throws when required env variables are missing', () => {
    // Ensure none of the default env vars are set
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_NAME;

    expect(() => DatabaseEnvConfigZod.parse()).toThrow(/Invalid environment variables/);
  });

  it('accepts custom environment variable names', () => {
    process.env.MY_DB_USER = 'customUser';
    process.env.MY_DB_PASS = 'customPass';
    process.env.MY_DB_HOST = 'customHost';
    process.env.MY_DB_PORT = '6543';
    process.env.MY_DB_NAME = 'customDb';

    const cfg = DatabaseEnvConfigZod.parse({
      user: 'MY_DB_USER',
      password: 'MY_DB_PASS',
      host: 'MY_DB_HOST',
      port: 'MY_DB_PORT',
      database: 'MY_DB_NAME',
    });

    expect(cfg).toEqual({
      user: 'customUser',
      password: 'customPass',
      host: 'customHost',
      port: 6543,
      database: 'customDb',
    });
  });
});

