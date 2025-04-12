import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  ...(!process.env.DATABASE_URL
    ? {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
          ? parseInt(process.env.DB_PORT, 10)
          : undefined,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
      }
    : { url: process.env.DATABASE_URL }),
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/src/**/subscribers/*.subscriber{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
  ssl: process.env.APP_ENV !== 'development',
  extra: process.env.APP_ENV !== 'development' && {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const dataSource = new DataSource(typeOrmConfig);
export default dataSource;
