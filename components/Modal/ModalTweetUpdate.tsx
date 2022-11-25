import { useRecoilState } from "recoil";
import { modalState, modalTweetUpdateState, tweetIdState, tweetState } from "../../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";

import moment from "moment";
import axios from "axios";


type ModalTweetUpdateProps = {
    onTweetUpdated: () => void
    onTweetUpdatedOnTweetPage: () => void
    tweetPage: boolean
    tweetPageDetail: boolean
}


export const ModalTweetUpdate: React.FC<ModalTweetUpdateProps> = ({ onTweetUpdated, onTweetUpdatedOnTweetPage, tweetPage, tweetPageDetail}) => {
    const [isOpenTweetUpdate, setIsOpenTweetUpdate] = useRecoilState(modalTweetUpdateState);
    const [tweetId, setTweetId] = useRecoilState(tweetIdState);
    const [tweet, setTweet] = useRecoilState(tweetState);
    const [content, setContent] = useState("");
    
    const updateTweet = () => {
        axios
            .put('/api/updateTweet', {
                id: tweetId,
                content: content

            })
            .then((res) => {
                onTweetUpdated()
                setContent('')
                setIsOpenTweetUpdate(false)
            })
    }

    const updateTweetFromTweetPage = () => {

 
        axios
            .put(`/api/tweet/${tweetId}`, {
                content: content,
            })
            .then((res) => {
                onTweetUpdatedOnTweetPage()
                setContent('')
                setIsOpenTweetUpdate(false)
            })
    }

    return (
        <Transition.Root show={isOpenTweetUpdate} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpenTweetUpdate}>
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
                                    onClick={() => setIsOpenTweetUpdate(false)}
                                >
                                    <XIcon className="h-[22px] text-white" />
                                </div>
                            </div>
                            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                                <div className="w-full">
                                    <div className="text-[#6e767d] flex gap-x-3 relative">
                                        <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                                        <img
                                            src={tweet?.author?.image}
                                            alt=""
                                            className="h-11 w-11 rounded-full"
                                        />
                                        <div>
                                            <div className="inline-block group">
                                                <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                                                    {tweet?.author?.name}
                                                </h4>
                                                {/*  <span className="ml-1.5 text-sm sm:text-[15px]">
                                                    @{tweet?.tag}{" "}
                                                </span> */}
                                            </div>{" "}
                                            ·{" "}
                                            <span className="hover:underline text-sm sm:text-[15px]">
                                                {moment(tweet?.createdAt).fromNow()}
                                            </span>
                                            <textarea
                                            
                                                defaultValue={tweet?.content}
                                                onChange={(e) => setContent(e.target.value)}
                                                rows={3}
                                                className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] overflow-hidden'
                                            />
                                        </div>
                                    </div>
                                   
                                
                                    <div className="mt-7 flex space-x-3 w-full">
                                     
                                        <div className="flex-grow mt-2">
                                            <div className="flex items-center justify-between pt-2.5">
                                                <div className="flex items-center">
                                                    <div className="icon ">
                                                        <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon">
                                                        <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                </div>
                                                {tweetPageDetail && (
                                                    <button
                                                        className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                                        disabled={!content}
                                                        onClick={updateTweetFromTweetPage}
                                                    >
                                                        Modifier

                                                    </button>
                                                )}
                                                {tweetPage && (
                                                    <button
                                                        className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                                        disabled={!content}
                                                        onClick={updateTweet}
                                                    >
                                                        Modifier

                                                    </button>
                                                )}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default ModalTweetUpdate;