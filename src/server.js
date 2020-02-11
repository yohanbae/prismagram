
import './env';

import {GraphQLServer} from 'graphql-yoga';
import {prisma} from '../generated/prisma-client';

import logger from 'morgan';
// import passport from 'passport';
import schema from './schema';

import "./passport";
import { authenticateJwt } from './passport';
import {isAuthenticated} from "./middlewares";

const PORT = process.env.PORT || 4000 ; // 이렇게 가져오는거네..dotenv를 가져온거다. 포트4000를
// "|| 4000"은, 만약 process.env.PORT가 없다면 4000을 쓰라는 의미다.

const server= new GraphQLServer({ 
    schema,
    context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({port: PORT}, () => console.log(`Server Running on port ${PORT}`));