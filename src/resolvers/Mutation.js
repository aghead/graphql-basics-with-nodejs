import {v4 as uuidv4} from "uuid";
import users from "../db";
import comments from "../db";

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
    updateUser(parent, args, {db}, indo) {
        const {id, data} = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('user not found')
        }

        // update email
        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email = data.email)

            if (emailTaken) {
                throw new Error('email taken')
            }

            user.email = data.email
        }

        // update name
        if (typeof data.name === 'string') {
            user.name = data.name
        }

        // update age
        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
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
    updatePost(parent, args, {db}, info) {
        const {id, data} = args
        const post = db.posts.find((post) => post.id === id)

        if (!post) {
            throw new Error('post not found')
        }

        if (typeof data.title == 'string') {
            post.title = data.title
        }

        if (typeof data.body == 'string') {
            post.body = data.body
        }

        if (typeof data.published == 'boolean') {
            post.published = data.published
        }

        return post

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
    },
    updateComment(parent, args, {db}, info) {
        const {id, data} = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            return new Error('comment not found')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    }

}

export {Mutation as default}