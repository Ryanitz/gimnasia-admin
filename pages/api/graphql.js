import Cors from "micro-cors";
import { gql, ApolloServer } from "apollo-server-micro";
import {
  Client,
  Map,
  Paginate,
  Documents,
  Collection,
  Lambda,
  Get,
  Create,
} from "faunadb";

const client = new Client({
  secret: process.env.FAUNA_SECRET,
  domain: "db.fauna.com",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const books = [
  {
    title: "asd",
    author: "ASD",
  },
  {
    title: "asd1",
    author: "ASD1",
  },
];

const typeDefs = gql`
  type Player {
    name: String
    surname: String
  }

  type Query {
    players: [Player]
  }

  type Mutation {
    createPlayer(name: String!, surname: String!): Player
  }
`;

export const resolvers = {
  Query: {
    players: async () => {
      const response = await client.query(
        Map(
          Paginate(Documents(Collection("Jugadores"))),
          Lambda((x) => Get(x))
        )
      );
      const players = response.data.map((player) => player.data);
      return [...players];
    },
  },

  Mutation: {
    createPlayer: async ({ name, surname }) => {
      const response = await client.query(
        Create(Collection("Jugadores"), {
          data: {
            name,
            surname,
          },
        })
      );
      return response.data;
    },
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {},
  instrospection: true,
  playground: true,
});

const serversStart = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method == "OPTIONS") {
    res.end();
    return false;
  }

  await serversStart;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
