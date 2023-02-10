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
            port: process.env.server_port
        }
    })

    console.log(`Listening on ${url} ...`)
})()