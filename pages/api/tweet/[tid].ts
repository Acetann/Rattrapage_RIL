import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react';
import DBClient from "../../../globalPrisma";

const prisma = DBClient.getInstance().prisma

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session: Session | null = await getSession({ req })

    if (!session) {
        res.status(401).send('Unauthorized')
        return
    }

    if (req.method === 'GET') {
        try {
            //GET /api/tweet/:id -> get
            const { tid } = req.query 
            console.log(tid)
            const id: string = tid!.toString()
            
            if (!tid) {
                res.status(400).send("Bad request")
                return
            } else {
                const tweet = await prisma.tweet.findUnique({
                    where: { id },
                    include: {
                        author: true,
                        comments: {
                            select: {
                                id: true,
                                content: true,
                                image: true,
                                tweetId: true,
                                userId: true,
                                createdAt: true,
                                updatedAt: true,
                                Author: true,
                            },
                             orderBy: [
                                {
                                    createdAt: "desc"
                                },
                            ],
                        }
                    },
                   
                })
            return res.status(200).json(tweet);
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }

    if (req.method === 'POST') {
        try {
            //POST /api/createComment -> create
            const { content } = req.body
            const { tid } = req.query
            const id: string = tid!.toString()
            if (!content) {
                res.status(400).send("Bad request")
                return
            }
            const comment = await prisma.comment.create({
                data: {
                    content: content,
                    userId: session?.userId as string,
                    tweetId: id
                },
            });
            return res.status(200).json(comment);
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }


    if (req.method === 'PUT') {
        try {
            //PUT /api/tweet/:id -> put
            const { content } = req.body
            const { tid } = req.query
            console.log(tid)
            const id: string = tid!.toString()

            if (!tid) {
                res.status(400).send("Bad request")
                return
            } else {
                const tweet = await prisma.tweet.update({
                    data: {
                        content: content,
                    },
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(tweet);
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }

   
}      
