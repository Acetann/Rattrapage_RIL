import { getSession } from "next-auth/react"
import { UserSession } from "../api/auth/[...nextauth]"
import { GetServerSideProps } from "next";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalProfileState, profileIdState } from "../../atoms/modalAtom";
import ModalProfile from "../../components/Modal/ModalProfile";


type ProfileProps = {
    session: UserSession
    onProfileChanged: () => void

}

export const Profile: React.FC<ProfileProps> = ({ session, onProfileChanged }) => {
    const [profile, setProfile] = useState(Object)
    const [refreshDataOnAction, setRefreshDataOnAction] = useState<string>("");
    const [isOpenProfileModal, setIsOpenProfileModal] = useRecoilState(modalProfileState);
    const [profileId, setprofileId] = useRecoilState(profileIdState);


    const getProfile = async () => {
        const query = router.query;
        const uid = query.uid
        const userId = uid
        const response = await fetch(`/api/profile/${userId}`)
        const data = await response.json()
        return data
    }

    useEffect(() => {
        getProfile().then((profile) => setProfile(profile))
    }, [refreshDataOnAction])

    return (
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
            <Sidebar session={session} />
            <ProfileContainer profile={profile} />
            {isOpenProfileModal && <ModalProfile profile={profile} onProfileChanged={() => setRefreshDataOnAction(Math.random().toString())} />}
        </main>
    )
}
export default Profile

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