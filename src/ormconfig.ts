import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, '**/*.entity{.ts,.js}')], // Adjust paths as needed
    migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    extra: process.env.DB_SSL === 'true'
        ? {
            connectTimeout: 30000,
            ssl: {
                ca: fs.readFileSync(path.resolve('./DigiCertGlobalRootCA.crt.pem')),
                rejectUnauthorized: true,
            },
        }
        : {},
});

// Ensure only the DataSource instance is exported as default
export default AppDataSource;
