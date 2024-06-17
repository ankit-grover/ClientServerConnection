import { ApolloServer } from "@apollo/server";
import express from 'express';
import cors from 'cors';
import {expressMiddleware as apolloMiddleWare} from '@apollo/server/express4';

const PORT = 9001;
const typeDefs = `#graphql
    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello World!',
    },
};

const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use(cors(),express.json(), apolloMiddleWare(apolloServer));
app.use('/graphql', apolloMiddleWare(apolloServer));

app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
