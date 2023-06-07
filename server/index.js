import express from 'express';
import mongoose from 'mongoose';
import resolvers from './resolvers';
import schema from './schema';
import cors from 'cors';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import { ensureToken } from './Utilities/jwtUtils';
import ImageRoute from './ImageRoute.js';
import User from './models/User';
import findOrCreate from 'mongoose-findorcreate';

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ulhsd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.get('/', (req, res) => {
  res.send('Up and running with graphql crash course');
});

const root = resolvers;
app.use('/image', ImageRoute);
app.use(
  '/graphql',
  graphqlHTTP(async (request) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: async () => {
      const { authorization: token } = request.headers;
      const userId = await ensureToken(token);
      return userId;
    },
  }))
);

app.listen(process.env.PORT, () =>
  console.log(`Running at ${process.env.PORT}`)
);
