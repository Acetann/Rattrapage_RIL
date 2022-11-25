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

    if (req.method === 'PUT') {
        try {
            //PUT /api/comment/:id -> put
            const { content } = req.body
            const { id } = req.body
            console.log(id)

            if (!id) {
                res.status(400).send("Bad request")
                return
            } else {
                const comment = await prisma.comment.update({
                    data: {
                        content: content,
                    },
                    where: {
                        id: id
                    }
                })
                return res.status(200).json(comment);
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }

    if (req.method === 'DELETE') {
        try {
            //DELETE /api/comment/delete -> delete
            const { id } = req.body
            console.log(id)


            if (!id) {
                res.status(400).send("Bad request")
                return
            } else {
                const comment = await prisma.comment.delete({
                    where: {
                        id: id,
                    },
                })
                return res.status(200).json(comment);
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json(error);
        }
    }
}      
