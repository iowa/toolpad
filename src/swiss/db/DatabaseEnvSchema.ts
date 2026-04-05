import { z } from "zod";

export class DatabaseEnvConfigZod {
  public static Schema = z.object({
    user: z.string(),
    password: z.string(),
    host: z.string(),
    port: z.coerce.number().int().positive(),
    database: z.string()
  })

  public static parse(): DatabaseEnvConfig {
    const raw = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    } as Record<string, unknown>;

    const result = DatabaseEnvConfigZod.Schema.safeParse(raw);
    if (!result.success) {
      const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      throw new Error(`Invalid environment variables:\n${messages.join('\n')}`);
    }
    return result.data;
  }

}

export type DatabaseEnvConfig = z.infer<typeof DatabaseEnvConfigZod.Schema>;


