import { z } from "zod";

export const EnvSchema = z.object({
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  // coerce string->number for process.env values
  DB_PORT: z.coerce.number().int().positive(),
  DB_NAME: z.string().default("toolpad"),

  // optional pool tuning (strings will be coerced to numbers)
  PG_POOL_MAX: z.coerce.number().int().positive().optional(),
  PG_POOL_IDLE_TIMEOUT_MS: z.coerce.number().int().nonnegative().optional(),
  PG_POOL_CONNECTION_TIMEOUT_MS: z.coerce.number().int().nonnegative().optional(),
  PG_QUERY_TIMEOUT_MS: z.coerce.number().int().nonnegative().optional(),

  // allowExitOnIdle: accept 'true'/'false' strings or boolean values
  PG_ALLOW_EXIT_ON_IDLE: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .optional(),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

export function parseEnv(): EnvConfig {
  const result = EnvSchema.safeParse(process.env as Record<string, unknown>);
  if (!result.success) {
    // build an error message with each issue
    const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
    throw new Error(`Invalid environment variables:\n${messages.join('\n')}`);
  }
  // normalize allowExitOnIdle to boolean when present
  const parsed = { ...result.data } as EnvConfig;
  if (parsed.PG_ALLOW_EXIT_ON_IDLE !== undefined) {
    parsed.PG_ALLOW_EXIT_ON_IDLE = parsed.PG_ALLOW_EXIT_ON_IDLE === true || parsed.PG_ALLOW_EXIT_ON_IDLE === 'true';
  }

  return parsed;
}

