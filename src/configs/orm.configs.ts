import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

export const configPG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ed',
  password: '20012002',
  database: 'auth_up',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
