import 'dotenv/config';

export const getEnvironmentValue = (env_var: string, def_value: string) => {
  const value = process.env[env_var];
  return value ? value : def_value;
};
