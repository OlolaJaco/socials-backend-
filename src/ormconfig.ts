import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
    username: 'postgres',
    password: 'Akinola@2000',
    database: 'socials',
    entities: [],
    synchronize: true,
}

export default config;