// packeges
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
// middlewares
import { serverError, notFound } from './middlewares';
// modules
import UserRouter from './modules/user';
import ProjectRouter from './modules/project';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use('/upload', express.static(__dirname + '/uploads'));

app.use('/v1/api/user', UserRouter);
app.use('/v1/api/project', ProjectRouter);

app.use(notFound);
app.use(serverError);


export default app;