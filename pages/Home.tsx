import { getSession } from "next-auth/react"
import { UserSession } from "./api/auth/[...nextauth]"
import { GetServerSideProps } from "next";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../components/Feed/Feed";


function Home({ session }: { session: UserSession}) {

    return (
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
            <Sidebar session={session} />
            <Feed session={session}/>
            { }
        </main>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
        }
    }
    return {
        props: {
            session,
        },
    }
}