import {GraphQLServer} from 'graphql-yoga'

// scalar types - String , Boolean , Int , Float , ID

// Type definitions (schema)
const typeDefs = `
 type Query {
 greeting(name: String, position: String): String!
 add(a: Float!, b: Float!): Float!
 title: String!
 price: Float!
 releaseYear: Int
 rating: Float
 inStock: Boolean!
 me: User!
 post: Post!
 users: [User!]
}

type User {
   id: ID!
   name: String!
   email: String!
   age: Int
   grades: [Int!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
}
`
// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello , ${args.name}! you are my favorite ${args.position}`
            } else {
                return 'Hello !'
            }
        },
        add(parent, args, ctx, info) {
            return args.a + args.b;
        },
        title() {
            return 'The War of Art'
        },
        price() {
            return 12.99
        },
        releaseYear() {
            return null
        },
        rating() {
            return 5
        },
        inStock() {
            return true
        },
        me() {
            return {
                id: '123',
                name: 'AGHEAD',
                email: 'aghead14j@gmail.com',
                age: 30,
                grades() {
                    return [
                        99,
                        74,
                        100,
                        3
                    ]
                }
            }
        },
        post() {
            return {
                id: 902,
                title: 'GraphQl 101',
                body: '',
                published: false
            }
        }

    }
}
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
    // open http://localhost:4000/
})