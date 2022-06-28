// This is an example ORM CONFIG

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
    'src/entities/*.entity.ts'
  ],
  'migrations': [
    'src/migration/**/*.ts',
    'dist/entities/**/*.js'
  ],
  'subscribers': [
    'src/subscriber/**/*.ts'
  ],
  'cli': {
    'entitiesDir': 'src/entities',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber'
  },
  'seeds': ['src/seeding/seeders/seeder.ts'],
  'factories': ['src/seeding/factories/*.ts']
}
