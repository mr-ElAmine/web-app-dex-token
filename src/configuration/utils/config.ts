import { z } from 'zod';

export const EnvEnum = z.enum(['development', 'production']);
export type EnvName = z.infer<typeof EnvEnum>;

const baseSchema = {
  VITE_REACT_APP_API_URL: z.string().url(),
};

export const schemas: Record<EnvName, z.ZodObject<typeof baseSchema>> = {
  development: z.object(baseSchema),
  production: z.object(baseSchema),
};

export type EnvConfig = z.infer<(typeof schemas)[EnvName]>;
