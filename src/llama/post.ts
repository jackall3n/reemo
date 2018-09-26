import {makePropDecorator, TypeDecorator} from "./decorator";

export interface PostDecorator {
    (p: Post): TypeDecorator

    new (p: Post): Post
}

export interface Post {
    path: string;
    authorise?: boolean;
}

export const Post: PostDecorator = makePropDecorator('Post', (p: Post) => ({method: "POST", ...p}));