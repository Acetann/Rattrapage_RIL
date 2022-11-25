import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import DBClient from "../../globalPrisma";

const prisma = DBClient.getInstance().prisma

export default async (req: NextApiRequest, res: NextApiResponse) => {
   
    const session: Session | null = await getSession({ req })

    if(!session){
        res.status(401).send('Unauthorized')
        return
    }

    if (req.method === 'GET') {
            try{
                const tweets = await prisma.tweet.findMany({
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
                            }
                        }
                    },
                    orderBy: [
                        {
                            createdAt: "desc"
                        },
                    ],
                })
                return res.status(200).json(tweets)
            }catch(error){
                return res.status(422).json(error);
            }
        }
    }


