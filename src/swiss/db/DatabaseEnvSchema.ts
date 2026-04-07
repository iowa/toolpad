import { z } from "zod";

export class DatabaseEnvConfigZod {
  private config: DatabaseEnvConfig;

  public static Schema = z.object({
    user: z.string(),
    password: z.string(),
    host: z.string(),
    port: z.coerce.number().int().positive(),
    database: z.string()
  })

  /**
   * Parse database environment config.
   * @param envNames Optional mapping of config keys to environment variable names.
   *                 Defaults to { user: 'DB_USER', password: 'DB_PASSWORD', host: 'DB_HOST', port: 'DB_PORT', database: 'DB_NAME' }
   */
  public static parse(envNames?: Partial<Record<keyof DatabaseEnvConfig, string>>): DatabaseEnvConfig {
    const defaults: Record<keyof DatabaseEnvConfig, string> = {
      user: 'DB_USER',
      password: 'DB_PASSWORD',
      host: 'DB_HOST',
      port: 'DB_PORT',
      database: 'DB_NAME',
    };

    const names = { ...defaults, ...(envNames ?? {}) } as Record<string, string>;

    const raw = {
      user: process.env[names.user],
      password: process.env[names.password],
      host: process.env[names.host],
      port: process.env[names.port],
      database: process.env[names.database],
    } as Record<string, unknown>;

    const result = DatabaseEnvConfigZod.Schema.safeParse(raw);
    if (!result.success) {
      const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      throw new Error(`Invalid environment variables:\n${messages.join('\n')}`);
    }
    return result.data;
  }


  constructor(config: DatabaseEnvConfig) {
    this.config = config;
  }

  buildConnectionString(): string {
    return `postgresql://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.database}`;
  }

}

export type DatabaseEnvConfig = z.infer<typeof DatabaseEnvConfigZod.Schema>;


