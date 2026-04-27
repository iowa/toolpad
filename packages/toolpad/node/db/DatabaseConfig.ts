import { z } from "zod";

export const DatabaseConfigSchema = z.object({
  user: z.string().nonempty(),
  password: z.string(),
  host: z.string().nonempty(),
  port: z.coerce.number().int().positive(),
});

export type DatabaseConfigType = z.infer<typeof DatabaseConfigSchema>;

export const DEFAULT_ENV_NAMES: Record<keyof DatabaseConfigType, string> = {
  user: 'DB_USER',
  password: 'DB_PASSWORD',
  host: 'DB_HOST',
  port: 'DB_PORT',
};

export class DatabaseConfig {
  private readonly _config: DatabaseConfigType

  constructor(envNames?: Partial<Record<keyof DatabaseConfigType, string>>) {
    this._config = this.parse(envNames)
  }

  get config(): DatabaseConfigType {
    return this._config;
  }

  private parse(
    envNames?: Partial<Record<keyof DatabaseConfigType, string>>
  ): DatabaseConfigType {
    const names = { ...DEFAULT_ENV_NAMES, ...(envNames ?? {}) } as Record<string, string>;

    const raw = {
      user: process.env[names.user],
      password: process.env[names.password],
      host: process.env[names.host],
      port: process.env[names.port],
    } as Record<string, unknown>;

    const result = DatabaseConfigSchema.safeParse(raw);
    if (!result.success) {
      const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      throw new Error(`Invalid database env config:\n${messages.join('\n')}`);
    }
    return result.data;
  };

  buildConnectionString(
    database: string,
    statementTimeoutMs?: number,
    searchPath?: string
  ): string {
    const { user, password, host, port } = this._config;
    const u = encodeURIComponent(user);
    const p = encodeURIComponent(password ?? '');
    let conn = `postgresql://${u}:${p}@${host}:${port}/${database}`;

    const optionsParts: string[] = [];
    if (statementTimeoutMs) optionsParts.push(`-c statement_timeout=${statementTimeoutMs}`);
    if (searchPath) optionsParts.push(`-c search_path=${searchPath}`);
    if (optionsParts.length > 0) {
      const encoded = encodeURIComponent(optionsParts.join(' '));
      conn += `?options=${encoded}`;
    }
    return conn;
  }
}


