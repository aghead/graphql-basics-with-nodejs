import {GraphQLServer} from 'graphql-yoga'

// scalar types - String , Boolean , Int , Float , ID

// demo data
const users = [
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

const posts = [
    {
        id: '10',
        title: 'GraphQL 101',
        body: 'this is how to use graphQl ...',
        published: true
    },
    {
        id: '20',
        title: 'GraphQL 201',
        body: 'advanced graphQl ...',
        published: false
    }
]
// Type definitions (schema)
const typeDefs = `
 type Query {
 users(query: String): [User!]! 
 posts(query: String): [Post!]!
 me: User!
 post: Post!
}

type User {
   id: ID!
   name: String!
   email: String
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
        users(parents, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        post(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch =  post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch =  post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: '123',
                name: 'AGHEAD',
                email: 'aghead14j@gmail.com',
                age: 30
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