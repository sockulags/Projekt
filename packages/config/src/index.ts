import { z } from 'zod';

const schema = z.object({
  APP_ENV: z.string().default('local'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

export type AppConfig = z.infer<typeof schema>;

let _config: AppConfig | null = null;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  if (_config) return _config;
  const parsed = schema.safeParse(env);
  if (!parsed.success) {
    console.error('Invalid environment variables', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment');
  }
  _config = parsed.data;
  return _config;
}

export const config = loadConfig();
