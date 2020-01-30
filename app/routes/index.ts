import * as express from 'express';
import { HealthRoute } from './Health.routes';

interface IRoute {
    path: string;
    handler: express.Router;
}

export const Routes: IRoute[] = [
    {
        path: '/',
        handler: HealthRoute
    }
];