import { DataSource } from "typeorm";

const DataSouce = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "postgres",
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
});
  
export default DataSouce;