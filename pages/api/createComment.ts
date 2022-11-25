
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react';
import DBClient from "../../globalPrisma";

const prisma = DBClient.getInstance().prisma

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session: Session | null = await getSession({ req })
    

    if (!session) {
        res.status(401).send('Unauthorized')
        return
    }

    if (req.method === 'POST') {
        try {
            //POST /api/createTweet -> create
            const { content } = req.body
            const { tweetId } = req.body
            if (!content) {
                res.status(400).send("Bad request")
                return
            }
            const comment = await prisma.comment.create({

                data: {
                    content: content,
                    userId: session?.userId as string,
                    tweetId: tweetId
                }
                

            });
            return res.status(200).json(comment);
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }
    else if (req.method !== 'POST') {
        res.status(405).send("Method not allowed")
    }
}
