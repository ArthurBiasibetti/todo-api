import dotenv from 'dotenv';
import yup from 'yup';
import path from 'path';
import AppError from '@utils/AppError.utils';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const enviroments = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
  STAGING: 'staging',
};

const enviromentsString = Object.values(enviroments);

const envVarsSchema = yup
  .object()
  .shape({
    NODE_ENV: yup
      .string()
      .oneOf(enviromentsString)
      .default(enviroments.DEVELOPMENT),
    API_PORT: yup.number().default(3333),
    PUBLIC_URL: yup.string().default('localhost'),
    POSTGRES_HOST: yup.string().required(),
    POSTGRES_PORT: yup.number().default(5432),
    POSTGRES_USER: yup.string().required(),
    POSTGRES_PASSWORD: yup.string().required(),
    POSTGRES_DB: yup.string().required(),
    JWT_SECRET: yup.string().required(),
    SALT_WORK_FACTOR: yup.number().default(10),
  })
  .noUnknown();

let envVars;

try {
  envVarsSchema.validateSync(process.env, { abortEarly: false });
  envVars = envVarsSchema.cast(process.env);
} catch ({ errors }) {
  throw new AppError(`Config validation error: ${errors}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.API_PORT,
  publicUrl: envVars.PUBLIC_URL,
  postgresDb: {
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USER,
    passworld: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DB,
  },
  jwtSecret: envVars.JWT_SECRET,
  saltWorkFactor: envVars.SALT_WORK_FACTOR,
};

export default config;
