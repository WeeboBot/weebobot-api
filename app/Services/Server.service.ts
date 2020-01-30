import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';

import * as Database from './Database.service';
import logger from '../utils/logger'
import { Routes } from '../routes';

export default class ServerService {

    public static async ConnectToDatabase() {
        try {
            const connection = await Database.Connection;
            await connection.query('select 1+1 as answer');
            await connection.synchronize();
        } catch (e) {
            logger.error(`Could not synchronize database, error=${e}`);
        }
    }

    private readonly app: express.Application;
    public server: http.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public App = (): express.Application => this.app;

    public async Start(): Promise<http.Server> {
        await ServerService.ConnectToDatabase();
        this.ExpressConfiguration();
        this.RouterConfiguration();
        return this.server;
    }

    private ExpressConfiguration(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));
        // this.app.use(cookieParser);

        this.app.use((req, res, next): void => {
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
            next();
        });

        const routeLogging = morgan('combined', {
            stream: {
                write: (text: string) => {
                    logger.verbose(text.replace(/\n$/, ''));
                },
            },
        });

        this.app.use(routeLogging);
    }

    // Configure API endpoints
    private RouterConfiguration(): void {
        for(const route of Routes) {
            this.app.use(route.path, route.handler);
        }
    }
}