import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "pizza",
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity.js'],
    subscribers: [],
    migrations: [],
}

export default config;