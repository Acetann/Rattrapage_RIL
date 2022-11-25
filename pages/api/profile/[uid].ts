import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import DBClient from "../../../globalPrisma";

const prisma = DBClient.getInstance().prisma

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session: Session | null = await getSession({ req })

    if(!session){
         res.status(401).send('Unauthorized')
         return
    }

    if (req.method === 'GET') {
        try {
            //GET /api/profile/:id -> get
            const { uid } = req.query
            console.log(uid)
            const id: string = uid!.toString()

            if (!uid) {
                res.status(400).send("Bad request")
                return
            } else {
                const user = await prisma.user.findUnique({
                    where: { id },
                    include: {
                        Profile: true,
                        tweets: true,
                        comments: {
                            select: {
                                id: true,
                                content: true,
                                image: true,
                                Tweet: true,
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
                return res.status(200).json(user);
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }

    if (req.method === 'POST') {
        try {
            const { tag } = req.body
            const { bio } = req.body
            const { location } = req.body
            const { website } = req.body
            const cUser = await prisma.profile.create({
                data: {
                    tag: tag,
                    bio: bio,
                    location: location,
                    website: website,
                    userId: session?.userId as string
                },
            })
            return res.status(200).json(cUser)
        } catch (error) {
            return res.status(422).json(error);
        }
    }

    if (req.method === 'PUT') {
        try {
            //PUT /api/test/:id -> update

            const { id } = req.body
            const { tag } = req.body
            const { bio } = req.body
            const { location } = req.body
            const { website } = req.body
            const cUser = await prisma.profile.update({
                where: {
                    id: id,
                },
                data: {
                    tag: tag,
                    bio: bio,
                    location: location,
                    website: website
                }
            })
            return res.status(200).json(cUser)
        } catch (error) {
            return res.status(422).json(error);
        }
    }
    else if (req.method !== 'PUT') {
        res.status(405).send("Method not allowed")
    }
}


