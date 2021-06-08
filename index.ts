require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './src/TypesAndResolvers';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import { connectToDb } from './src/connections';
const PORT = process.env.PORT || 8081;
connectToDb();

const startServer = async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      allowedHeaders: ['Content-Type'],
      origin: '*',
      preflightContinue: true,
    }),
  );
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use(express.static('client/build'));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  app.use(morgan('tiny'));
  const server = new ApolloServer({
    context: ({ req, res }) => ({ req, res }),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    resolvers: mergeResolvers(resolvers),
    typeDefs: mergeTypeDefs(typeDefs),
  });
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    console.log(
      `Server is now running at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
};
startServer();
