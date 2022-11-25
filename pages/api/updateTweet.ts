
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

    if (req.method === 'PUT') {
        try {
            //PUT /api/updateTweet -> update
            const { content } = req.body
            const { id } = req.body
            if (!content) {
                res.status(400).send("Bad request")
                return
            }
            const tweet = await prisma.tweet.update({
                data: {
                    content: content,
                },
                where: {
                    id: id
                }
            });
            return res.status(200).json(tweet);
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }
    else if (req.method !== 'PUT') {
        res.status(405).send("Method not allowed")
    }
}
