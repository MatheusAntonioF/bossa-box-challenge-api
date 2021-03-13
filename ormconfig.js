require('dotenv').config();

const fileExtension = process.env.NODE_ENV === 'development' ? '.ts' : '.js';
const mainFolder = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

const ormConfig = {
  type: 'postgres',

  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'bossabox_db',

  entities: [
    `./${mainFolder}/modules/**/infra/typeorm/entities/*${fileExtension}`,
  ],
  migrations: [
    `./${mainFolder}/shared/infra/typeorm/migrations/*${fileExtension}`,
  ],

  logging: true,

  cli: {
    migrationsDir: `./${mainFolder}/shared/infra/typeorm/migrations`,
    entitiesDir: `./${mainFolder}/modules/**/infra/typeorm/entities`,
  },
};

module.exports = ormConfig;
