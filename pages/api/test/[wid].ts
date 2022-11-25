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
            const mid = JSON.stringify(req.query)
            const cUser = await prisma.profile.findUnique({
               where: {
                    userId: mid
               }
             
            })
            return res.status(200).json(cUser)
        } catch (error) {
            return res.status(422).json(error);
        }
    }
}


