import { EnvEnum, type EnvName, type EnvConfig, schemas } from '@/configuration/utils/config';

const mode: EnvName = EnvEnum.parse(import.meta.env.MODE);

const result = schemas[mode].safeParse(import.meta.env);
if (!result.success) {
  console.error(`❌ Validation d'env pour le mode "${mode}" a échoué :`, result.error.format());
  throw new Error(`Invalid environment for mode ${mode}`);
}

export const config: EnvConfig & { mode: EnvName } = {
  mode,
  ...result.data,
};
