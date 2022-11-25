import { atom } from 'recoil';


export interface Tweet {
    id: string
    image: string
    createdAt: Date
    content: string
    author: {
        id: string
        image: string
        name: string
    }
    comments: [
        {
           id: string
           content: string
           createdAt: Date
           Author: {
            id: string
            image: string
            name: string
           }
        }
    ]
}

export interface Comment {
    id: string
    createdAt: Date
    content: string
   Author: {
    image: string
    name: string
   }
}

export const modalState = atom ({
    key: "modalState",
    default: false,
});

export const modalTweetUpdateState = atom({
    key: "modalTweetUpdateState",
    default: false,
});

export const modalCommentUpdateState = atom({
    key: "modalCommentUpdateState",
    default: false,
});

export const tweetIdState = atom ({
    key: "tweetIdState",
    default: ""
});

export const tweetState = atom({
    key: "tweetState",
    default: {} as Tweet
});

export const commentIdState = atom({
    key: "commentIdState",
    default: ""
});

export const commentState = atom({
    key: "commentState",
    default: {} as Comment
});

export const modalProfileState = atom({
    key: "modalProfileState",
    default: false,
});

export const profileIdState = atom({
    key: "profileIdState",
    default: ""
});
