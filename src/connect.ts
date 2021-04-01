import 'reflect-metadata';
import { Connection, createConnection } from "typeorm";

class Connect {
    public connections: Connection;
    run = async () => {
        this.connections = await createConnection({
            type: "mysql",
            host: process.env.DB_HOST,
            port: 3306,
            username: "admin",
            password: "admin",
            database: "movies",
            entities: [
                `${__dirname}/**/*.entity.{ts,js}`,
            ],
            synchronize: true,
            logging: false,
        });
    }
}

export default new Connect();
