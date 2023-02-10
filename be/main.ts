import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { gql } from "graphql-tag"
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

(async () => {
    const server = new ApolloServer({
        typeDefs: gql`${typeDefs}`,
        resolvers
    })

    const { url } = await startStandaloneServer(server, {
        listen: {
            port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 4000
        }
    })

    console.log(`Listening on ${url} ...`)
})()