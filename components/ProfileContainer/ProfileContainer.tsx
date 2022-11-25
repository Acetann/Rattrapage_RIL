import { ArrowLeftIcon, LinkIcon } from "@heroicons/react/outline";
import moment from "moment";
import Head from "next/head";
import router from "next/router";
import { useRecoilState } from "recoil";
import { modalProfileState, profileIdState } from "../../atoms/modalAtom";

type ProfileProps = {
    profile: {
        name: string
        image: string
        tag: string
        tweets: [
            {
                id: string
                createdAt: Date
                content: string
            }
        ]
        Profile: {
            id: string
            tag: string
            bio: string
            website: string
            cover: string
            avatar: string

        }
    }

}

const ProfileContainer: React.FC<ProfileProps> = ({ profile }) => {
    const [isOpenProfileModal, setIsOpenProfileModal] = useRecoilState(modalProfileState);
    const [profileId, setprofileId] = useRecoilState(profileIdState);



    return (
        <div className="bg-black min-h-screen flex min-w-[1500px] mx-auto" >
            <Head>
                <title>
                    {profile?.name}
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px] ">
                <div className="flex items-center px-1.5 pt-2 border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                    <div
                        className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                        onClick={() => router.push("/")}
                    >
                        <ArrowLeftIcon className="h-5 text-white" />
                    </div>
                    {profile?.name}
                </div>
                <div className=" px-14 border-gray-700 text-[#a09f9f] text-sm">
                {profile?.tweets?.length > 1 ? (
                    <span>{profile?.tweets?.length} tweets</span> 
                ) : (
                    <span>{profile?.tweets?.length} tweet</span> 
                )}
                </div>
                <div>
                    <div className="w-full bg-cover bg-no-repeat bg-center h-52 bg-slate-600">
                        <img className="w-full h-full" src={profile?.Profile?.cover} alt="" />
                    </div>
                    <div className="p-4 border-b border-gray-700">
                        <div className="relative flex w-full">
                            <div className="flex flex-1">
                                <div className= "-mt-28">
                                    <div className="h-36 w-36 md rounded-full relative avatar">
                                        <img className="h-36 w-36 md rounded-full relative border-4 border-gray-900" src={profile?.Profile?.avatar} alt="" />
                                        <div className="absolute"></div>
                                    </div>
                                </div>
                            </div>
                            <div 
                            className="flex flex-col text-right"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    {profile == null ? (
                                        setIsOpenProfileModal(true)
                                    ): (
                                        setprofileId(profile?.Profile?.id),
                                        setIsOpenProfileModal(true)
                                    )}
                                    
                                }}>
                                {profile?.Profile != null ? (
                                    <button className="flex justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring rounded max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 mr-0 ml-auto">
                                        Edit Profile
                                    </button>
                                    ) : (
                                    <button className="flex justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring rounded max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 mr-0 ml-auto">
                                        Create Profile
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1 justify-center w-full mt-3 ml-3 ">
                            <div>
                                <h2 className="text-xl leading-6 font-bold text-white">{profile?.name}</h2>
                                <p className="text-sm leading-5 font-medium text-gray-600">@{profile?.Profile?.tag}</p>
                            </div>
                            <div className="mt-3">
                                <p className="text-white leading-tight mb-2"> { profile?.Profile?.bio}</p>
                                <div className="text-gray-600 flex">
                                    <span className="flex mr-2"> <LinkIcon className="h-5 text-grey" /> <a href={profile?.Profile?.website} target="#" className="leading-5 ml-1 text-blue-400">{profile?.Profile?.website}</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {profile?.tweets?.map(tweet => (
                        <div key={tweet?.id} className="p-3 flex cursor-pointer border-b border-gray-700">
                            <img
                                src={profile?.image}
                                alt=""
                                className="h-11 w-11 rounded-full mr-4"
                            />
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="flex justify-between">
                                    <div className="text-[#6e767d]">
                                        <div className="inline-block group">
                                            <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                                                {profile?.name}
                                            </h4>
                                              <span className="ml-1.5 text-sm sm:text-[15px]">
                                                @{profile?.Profile?.tag}{" "}
                                            </span>
                                        </div>{" "}
                                        ·{" "}
                                        <span className="hover:underline text-sm sm:text-[15px]">
                                            {moment(tweet?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        </span>
                                        <p className="text-[#d9d9d9] mt-0.5 max-w-lg  text-[15px] sm:text-base">
                                            {tweet?.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
        
    );
}

export default ProfileContainer;