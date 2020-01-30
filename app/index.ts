import * as dotenv from 'dotenv';
dotenv.config();

import logger from './utils/logger';

import API from './Services/Server.service';
import { config } from './config';
import { Server } from 'http';

const project = require('../package');

const onError = (error: any) => {
    if (error.syscall !== 'listen') throw error;
    
    switch(error.code) {
        case 'EACCESS':
            console.error('Port requires elevated privleges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = (name: string, version: string, port: number) => () => {
    logger.info(`${name} | version: ${version} | process: ${process.pid} | port: ${port} | ${process.env.NODE_ENV}`);
}

if (process.env.NODE_ENV === 'production') {
    logger.info('##############################');
    logger.info('# RUN PRODUCTION ENVIRONMENT #');
    logger.info('##############################');
} else {
    logger.info('###############################');
    logger.info('# RUN DEVELOPMENT ENVIRONMENT #');
    logger.info('###############################');
}
const port: number = Number(process.env.PORT) || config.PORT_APP || 3000;
const applicationServer = new API();

applicationServer.Start().then((server) => {
   server.listen(port);
   
   server.on('error', onError);
   server.on('listening', onListening(project.name, project.version, port));
});