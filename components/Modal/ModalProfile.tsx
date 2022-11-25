import { useRecoilState } from "recoil";
import { modalProfileState, profileIdState, tweetState } from "../../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { SaveAsIcon, SaveIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";


type ModalTweetUpdateProps = {
    profile: {
        id: string
        Profile: {
            tag: string
            bio: string
            location: string
            website: string
            cover: string
            avatar: string
        }
    }
    onProfileChanged : ()  => void

}


export const ModalProfile: React.FC<ModalTweetUpdateProps> = ({ profile, onProfileChanged }) => {
    const [isOpenProfileModal, setIsOpenProfileModal] = useRecoilState(modalProfileState);
    const [profileId, setprofileId] = useRecoilState(profileIdState);
    const [tag, setTag] = useState<string>();
    const [bio, setBio] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [website, setWebsite] = useState<string>();

    const createProfile = () => {
        axios
            .post(`/api/profile/${profile?.id}`, {
                tag,
                bio,
                location,
                website
            })
            .then((res) => {
                onProfileChanged()
                setIsOpenProfileModal(false)
            })
    }

    const updateProfile = () => {
        axios
            .put(`/api/profile/${profile?.id}`, {
                tag: tag,
                bio: bio,
                location: location,
                website: website,
                id: profileId
            })
            .then((res) => {
                onProfileChanged()
                setIsOpenProfileModal(false)
            })
    }

    return (
        <Transition.Root show={isOpenProfileModal} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpenProfileModal}>
                <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                            <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                                <div
                                    className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                                    onClick={() => setIsOpenProfileModal(false)}
                                >
                                    <XIcon className="h-[22px] text-white flex-none" />
                                    
                                </div>
                                {profile != null ? (
                                    <span className="ml-2 text-l text-white font-bold flex-auto w-72"> Update profile</span>
                                    ): (
                                    <span className="ml-2 text-l text-white font-bold flex-auto w-72"> Create profile</span>  
                                    )}
                                {profile?.Profile != null ? (
                                    <button
                                        className="hidden xl:inline ml-auto bg-[#ffffff] rounded-full w-16 h-[26px] text-m shadow-md hover:bg-[#84b7da]"
                                        onClick={updateProfile}>
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="hidden xl:inline ml-auto bg-[#ffffff] rounded-full w-16 h-[26px] text-m shadow-md hover:bg-[#84b7da]"
                                        onClick={createProfile}>
                                        Save
                                    </button>
                                )}
                               
                            </div>
                            <div>
                                <div className="w-full bg-cover bg-no-repeat bg-center h-52 bg-slate-600">
                                    <img className="w-full h-full" src={profile?.Profile?.cover} alt="" />
                                </div>
                                <div className="p-4 border-b border-gray-700">
                                    <div className="relative flex w-full">
                                        <div className="flex flex-1">
                                            <div className="-mt-28">
                                                <div className="h-36 w-36 md rounded-full relative avatar">
                                                    <img className="h-36 w-36 md rounded-full relative border-4 border-gray-900" src={profile?.Profile?.avatar} alt="" />
                                                    <div className="absolute"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                               {/*  border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ... */}
                                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tag</label>
                                        <input
                                            type="name"
                                            id="name"
                                            className="bg-gray-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            required
                                            defaultValue={profile?.Profile?.tag} 
                                            onChange={(e) => setTag(e.target.value)}
                                            />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bio</label>
                                        <textarea
                                            id="name"
                                            className="bg-gray-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            defaultValue={profile?.Profile?.bio} 
                                            onChange={(e) => setBio(e.target.value)}
                                            />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location</label>
                                        <input
                                            type="name"
                                            id="name"
                                            className="bg-gray-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            defaultValue={profile?.Profile?.location} 
                                            onChange={(e) => setLocation(e.target.value)}
                                            />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Website</label>
                                        <input
                                            type="name"
                                            id="name"
                                            className="bg-gray-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                            defaultValue={profile?.Profile?.website} 
                                            onChange={(e) => setWebsite(e.target.value)}
                                            />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default ModalProfile;