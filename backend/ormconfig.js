module.exports = {
    'type': 'postgres',
    'host': 'localhost',
    'port': 5432,
    'username': 'postgres',
    'password': 'root',
    'database': 'seaqull',
    'synchronize': true,
    'logging': false,
    'entities': [
        'app/entity/*.ts'
    ],
    'migrations': [
        'app/migration/**/*.ts'
    ],
    'subscribers': [
        'app/subscriber/**/*.ts'
    ],
    'cli': {
        'entitiesDir': 'app/entity',
        'migrationsDir': 'app/migration',
        'subscribersDir': 'app/subscriber'
    },
    'seeds': ['app/seeds/*.ts'],
    'factories': ['app/factories/*.ts'],
};