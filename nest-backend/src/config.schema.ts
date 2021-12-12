import * as Joi from '@hapi/joi'

export const configValidationSchema = Joi.object({
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('root'),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.number().required(),
  NODE_ENV: Joi.string().default('production'),
  SECURE: Joi.boolean().default(true),
  FRONTEND_URL: Joi.string().default('https://seaqull.com'),
  HCAPTCHA_DEV_SECRET_KEY: Joi.string().required(),
  HCAPTCHA_PROD_SECRET_KEY: Joi.string().required()
})
