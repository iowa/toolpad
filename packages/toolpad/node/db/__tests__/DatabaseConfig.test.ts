import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseConfig } from "../DatabaseConfig";

const restoreEnv = (orig: NodeJS.ProcessEnv) => {
  // Clear current keys
  for (const k of Object.keys(process.env)) {
    delete process.env[k];
  }
  // Restore originals
  Object.assign(process.env, orig);
};

describe('DatabaseConfig', () => {
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

    const cut = new DatabaseConfig();

    expect(cut.config).toEqual({
      user: 'testuser',
      password: 'testpass',
      host: 'localhost',
      port: 5432
    });

    expect(cut.buildConnectionString('database')).toMatchInlineSnapshot(`"postgresql://testuser:testpass@localhost:5432/database"`)
    expect(cut.buildConnectionString('database', 120000, 'toolpad')).toMatchInlineSnapshot(`"postgresql://testuser:testpass@localhost:5432/database?options=-c%20statement_timeout%3D120000%20-c%20search_path%3Dtoolpad"`)
  });

  it('throws when required env variables are missing', () => {
    delete process.env.DB_USER;
    delete process.env.DB_PASSWORD;
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_NAME;

    expect(() => new DatabaseConfig()).toThrow(/Invalid database env config/);
  });

  it('accepts custom environment variable names', () => {
    process.env.MY_DB_USER = 'customUser';
    process.env.MY_DB_PASS = 'customPass';
    process.env.MY_DB_HOST = 'customHost';
    process.env.MY_DB_PORT = '6543';

    const cut = new DatabaseConfig({
      user: 'MY_DB_USER',
      password: 'MY_DB_PASS',
      host: 'MY_DB_HOST',
      port: 'MY_DB_PORT',
    });

    expect(cut.config).toEqual({
      user: 'customUser',
      password: 'customPass',
      host: 'customHost',
      port: 6543,
    });

    expect(cut.buildConnectionString('customDB', 120000)).toMatchInlineSnapshot(`"postgresql://customUser:customPass@customHost:6543/customDB?options=-c%20statement_timeout%3D120000"`)
  });

  it('encodes special characters in user and password', () => {
    process.env.DB_USER = 'user@domain';
    process.env.DB_PASSWORD = 'p@ss/word!';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';

    const cut = new DatabaseConfig();
    const conn = cut.buildConnectionString('mydb');

    expect(conn).toContain('user%40domain');
    expect(conn).toContain('p%40ss%2Fword!');
    expect(conn).toBe('postgresql://user%40domain:p%40ss%2Fword!@localhost:5432/mydb');
  });

  it('handles empty password', () => {
    process.env.DB_USER = 'admin';
    process.env.DB_PASSWORD = '';
    process.env.DB_HOST = 'db.example.com';
    process.env.DB_PORT = '5433';

    const cut = new DatabaseConfig();

    expect(cut.config.password).toBe('');
    expect(cut.buildConnectionString('testdb')).toBe('postgresql://admin:@db.example.com:5433/testdb');
  });

  it('throws descriptive error for invalid port', () => {
    process.env.DB_USER = 'user';
    process.env.DB_PASSWORD = 'pass';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = 'not-a-number';

    expect(() => new DatabaseConfig()).toThrow(/Invalid database env config/);
  });
});
