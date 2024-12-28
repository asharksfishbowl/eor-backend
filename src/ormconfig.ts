import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    throw new Error('Missing required environment variables for database connection');
}

const sslConfig = process.env.DB_SSL === 'true'
    ? {
        connectTimeout: 30000,
        ssl: fs.existsSync(path.resolve('./DigiCertGlobalRootCA.crt.pem'))
            ? {
                ca: fs.readFileSync(path.resolve('./DigiCertGlobalRootCA.crt.pem')),
                rejectUnauthorized: true,
            }
            : undefined,
    }
    : {};

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    extra: sslConfig,
});

AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established successfully');
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });

export default AppDataSource;
