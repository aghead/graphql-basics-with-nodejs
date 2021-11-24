import {GraphQLServer} from 'graphql-yoga'

// scalar types - String , Boolean , Int , Float , ID

// Type definitions (schema)
const typeDefs = `
 type Query {
 greeting(name: String, position: String): String!
 add(a: Float!, b: Float!): Float!
 addArray(numbers: [Float!]!): Float!
 title: String!
 price: Float!
 releaseYear: Int
 rating: Float
 inStock: Boolean!
 me: User!
 post: Post!
 grades: [Int!]!
 users: [User!]
}

type User {
   id: ID!
   name: String!
   email: String!
   age: Int
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
        addArray(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0
            }

            // [1,5,10,2]
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            })
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
                age: 30
            }
        },
        post() {
            return {
                id: 902,
                title: 'GraphQl 101',
                body: '',
                published: false
            }
        },
        grades() {
            return [
                99,
                74,
                100,
                3
            ]
        },
        users() {
            return [
                {
                    id: '1',
                    name: 'Jamie'
                },
                {
                    id: '2',
                    name: 'Andrew',
                    age: 27
                },
                {
                    id: '3',
                    name: 'Katie'
                }
            ]
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