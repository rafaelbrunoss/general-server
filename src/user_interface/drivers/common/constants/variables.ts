export const NODE_ENV: string | undefined = process.env.NODE_ENV;
export const APP_TOKEN_SECRET: string | undefined = process.env.APP_TOKEN_SECRET;
export const APP_TOKEN_LIFE: string | undefined =
  process.env.APP_TOKEN_LIFE || '24h';
export const HOST: string | undefined = process.env.HOST || '127.0.0.1';
export const PORT: string | undefined = process.env.PORT;
export const DB_DIALECT: string | undefined = process.env.DB_DIALECT;
export const POSTGRES_USER: string | undefined = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD: string | undefined = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB: string | undefined = process.env.POSTGRES_DB;
export const POSTGRES_HOST: string | undefined = process.env.POSTGRES_HOST;
export const POSTGRES_PORT: string | undefined = process.env.POSTGRES_PORT;
export const REDIS_USER: string | undefined = process.env.REDIS_USER;
export const REDIS_PASSWORD: string | undefined = process.env.REDIS_PASSWORD;
export const REDIS_PORT: string | undefined = process.env.REDIS_PORT;
export const REDIS_HOST: string | undefined = process.env.REDIS_HOST;
export const K8S_GRACEFUL_PERIOD_OF_SHUTDOWN: string | undefined =
  process.env.K8S_GRACEFUL_PERIOD_OF_SHUTDOWN;
