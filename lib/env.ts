import { z } from "zod";

const envSchema = z.object({
  APP_URL: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url().optional()
  ),
  GITHUB_TOKEN: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(1).optional()
  ),
});

export type AppEnv = z.infer<typeof envSchema>;

export function getEnv(): AppEnv {
  return envSchema.parse(process.env);
}
