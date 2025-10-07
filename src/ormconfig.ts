import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
    username: 'postgres',
    password: 'Akinola@2000',
    database: 'socials',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, //** Don't use this in production! */
}

export default config;