import {v4 as uuidv4} from "uuid";

const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email Taken.')
        }

        // legacy way
        // const user = {
        //     id: uuidv4(),
        //     name: args.name,
        //     email: args.email,
        //     age: args.age
        // }

        // using spread operator
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, {db}, info) {

        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('user not found')
        }

        const deletedUser = db.users.splice(userIndex, 1)

        // delete related posts
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }
            return !match
        })

        // delete related comments
        db.comments = db.comments.filter((comment) => comment.author === args.id)

        return deletedUser[0]
    },
    createPost(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        // check author exist
        if (!userExists) {
            throw new Error('user not found')
        }

        // legacy way
        // const post = {
        //     id: uuidv4(),
        //     title: args.title,
        //     body: args.body,
        //     published: args.published,
        //     author: args.author
        // }


        // using spread operator
        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },
    deletePost(parent, args, {db}, info) {
        const postIndex = db.post.findIndex((post) => post.id === args.id)

        if (postIndex === -1) {
            throw new Error('post not found')
        }

        const deletedPost = db.posts.splice(postIndex, 1)

        // delete related comment
        db.comments = db.comments.filter((comment) => comment.post === args.id)

        return deletedPost[0]
    },
    createComment(parent, args, {db}, info) {

        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)

        // check author exist
        if (!userExists) {
            throw new Error('user not found')
        }

        if (!postExists) {
            throw new Error('post not found')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        return comment
    },
    deleteComment(parent, args, {db}, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('comment not found')
        }

        const deletedComment = db.comments.splice(commentIndex, 1)

        return deletedComment[0]
    }

}

export {Mutation as default}