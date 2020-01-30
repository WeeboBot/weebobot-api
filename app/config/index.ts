import * as dotenv from 'dotenv';
import { isNil } from 'lodash';

dotenv.config();

const DIALECT: any = process.env.DIALECT || 'postgres';
const environment = process.env.NODE_ENV;

const DATABASE_CONFIGURATION = {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS
};

const config = {
    DATABASE: !isNil(environment) && environment === 'test' ? DATABASE_CONFIGURATION : DATABASE_CONFIGURATION,
    PORT_APP: Number(process.env.APP_PORT)
};

export { DIALECT, config };
