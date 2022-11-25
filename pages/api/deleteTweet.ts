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

    if (req.method === 'DELETE') {
        try {
            //DELETE /api/deleteTweet -> delete
            const { id } = JSON.parse(req.body)

            if (!id) {
                res.status(400).send("Bad request")
                return
            }else{
            const tweet = await prisma.tweet.delete({
               where: {
                id: id
               },
            })
            return res.status(200).json(tweet);
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }
}      
