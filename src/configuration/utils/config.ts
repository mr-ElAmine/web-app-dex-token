import { z } from 'zod';

const EnvSchema = z.object({
  VITE_REACT_APP_API_URL: z.string().url(),
});

const parsedEnv = EnvSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const config = {
  REACT_APP_API_URL: parsedEnv.data.VITE_REACT_APP_API_URL,
};
