module.exports = {
  'type': 'postgres',
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'username': process.env.DB_USERNAME,
  'password': process.env.DB_PASSWORD,
  'database': process.env.DB_NAME,
  'synchronize': true,
  'logging': false,
  'entities': [
    'entities/*.entity.ts'
  ],
  'migrations': [
    'migration/**/*.ts'
  ],
  'subscribers': [
    'subscriber/**/*.ts'
  ],
  'cli': {
    'entitiesDir': 'entities',
    'migrationsDir': 'migration',
    'subscribersDir': 'subscriber'
  },
  'seeds': ['seeding/seeders/seeder.ts'],
  'factories': ['seeding/factories/*.ts']
}
