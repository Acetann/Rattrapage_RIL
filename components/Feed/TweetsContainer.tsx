import { useEffect, useState } from 'react'
import { UserSession } from '../../pages/api/auth/[...nextauth]'
import { ChatIcon,DotsVerticalIcon,HeartIcon, ShareIcon, SwitchHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { modalState, modalTweetUpdateState, tweetIdState, tweetState } from '../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import { EditIcon } from '@chakra-ui/icons';
import Modal from '../Modal/Modal';
import ModalTweetUpdate from '../Modal/ModalTweetUpdate';

type TweetsContainerProps = {
    refreshData: string
    session: UserSession
    tweetPage: boolean
}
export const MyTweetsContainer: React.FC<TweetsContainerProps> = ({ session, refreshData, tweetPage}) => {
    const [tweets, setTweets] = useState<any[]>([])
    const [refreshDataOnAction, setRefreshDataOnAction] = useState<string>("");
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isOpenTweetUpdate, setIsOpenTweetUpdate] = useRecoilState(modalTweetUpdateState);
    const [tweetId, setTweetId] = useRecoilState(tweetIdState);
    const [tweet, setTweet] = useRecoilState(tweetState);
    const router = useRouter()
console.log(tweet)
    const getAllTweets = async () => {
        const response = await fetch('/api/getTweets')
        const data = await response.json()
        return data
    }

    const deleteTweet = async (id: string) => {
        const deleteId = JSON.stringify({ id })
        await fetch('/api/deleteTweet', {
            method: "DELETE",
            body: deleteId
        })
        .then((res) => {
            setRefreshDataOnAction(Math.random().toString())
        })
    }

    useEffect(() => {
        getAllTweets().then((tweets) => setTweets(tweets))
    }, [refreshData, refreshDataOnAction])

    return (
        <>
            {tweets?.map(tweet => (
                <div key={tweet?.id} className="p-3 flex border-b border-gray-700">                    
                    {!tweetPage && (
                        <img
                            src={tweet?.author?.image}
                            alt="Author Picture"
                            className="h-11 w-11 rounded-full mr-4 cursor-pointer "
                            onClick={() => router.push(`/profile/${tweet?.author?.id}`)}
                        />
                    )}
                    <div className="flex flex-col space-y-2 w-full">
                        <div className={`flex ${!tweetPage && "justify-between"}`}>
                            {tweetPage && (
                                <img
                                    src={tweet?.image}
                                    alt="Profile Pic"
                                    className="h-11 w-11 rounded-full mr-4 cursor-pointer "
                                    onClick={() => router.push(`/profile/${tweet?.author?.id}`)}
                                />
                            )}
                            <div className="text-[#6e767d]">
                                <div className="inline-block group">
                                    <h4
                                        className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline cursor-pointer 
                                        ${!tweetPage && "inline-block"}`}
                                        onClick={() => router.push(`/profile/${tweet?.author?.id}`)}
                                    >
                                        {tweet?.author?.name}
                                    </h4>
                                    <span className={`text-sm sm:text-[15px] ${!tweetPage && "ml-1.5"}`}>{tweet?.author?.email}</span>
                                </div>{""}
                                {""}
                                <span className="hover:underline text-sm sm:text-[15px]">

                                </span>
                                {!tweetPage && (

                                    <p 
                                        className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5 cursor-pointer "
                                    onClick={() => router.push(`/tweet/${tweet?.id}`)}>
                                        {tweet?.content}
                                    </p>
                                
                                
                                )}
                            </div>
                            {session?.userId == tweet?.author?.id ? (
                            <div className="icon group flex-shrink-0 ml-auto"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTweetId(tweet?.id);
                                    setTweet(tweet)
                                    setIsOpenTweetUpdate(true);
                                }}

                            >
                                <div className="icon group text-[#6e767d]">
                                    <EditIcon className="h-5 group-hover:text-[#1d9bf0]" />
                                </div>
                            </div>
                            ) : (
                                <div className="icon group text-[#6e767d]">
                                    <DotsVerticalIcon className="h-5 group-hover:text-[#1d9bf0]" />
                                </div> 
                            )}
                        </div>
                        {tweetPage && (
                            <p className="text-[#d9d9d9] mt-0.5 text-xl whitespace-pre-wrap">
                                {tweet?.content}
                            </p>
                        )}
                        <img
                            src={tweet?.image}
                            alt=""
                            className="rounded-2xl max-h-[700px] object-cover mr-2"
                        />
                        <span className={`text-sm sm:text-[12px] text-[#929292] ${!tweetPage}`}>{moment(tweet?.createdAt).format('Do MMMM YYYY, H:mm:ss a')}</span>
                        
                        
                        <div
                            className={`text-[#6e767d] flex justify-between w-10/12 
                            ${tweetPage && "mx-auto"}`}
                        >
                            <div
                                className="flex items-center space-x-1 group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTweetId(tweet?.id);
                                    setTweet(tweet)
                                    setIsOpen(true);
                                }}
                                
                            >
                            
                                <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                                    <ChatIcon className="h-5 group-hover:text-[#1d9bf0]"
                                  />
                                </div>
                               
                                {tweet?.comments?.length > 0 && (
                                <span className="group-hover:text-[#1d9bf0] text-sm">
                                    {tweet?.comments?.length}
                                </span>
                                )}
                            </div>
                            <div
                                className="flex items-center space-x-1 group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    /* likePost(); */
                                }}
                            >
                                <div className="icon group-hover:bg-pink-600/10">
                                    {liked ? (
                                        < svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <HeartIcon className="h-5 group-hover:text-pink-600" />
                                    )}
                                </div>
                                {likes.length > 0 && (
                                    <span
                                        className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                                            }`}
                                    >
                                        {tweet?.likes.length}
                                        205
                                    </span>
                                )}
                            </div>
                            {session?.userId == tweet?.author?.id ? (

                                <div
                                    className="flex items-center space-x-1 group"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <div className="icon group-hover:bg-red-600/10">
                                        <TrashIcon className="h-5 group-hover:text-red-600"
                                            onClick={() => { deleteTweet(tweet?.id) }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1 group">
                                    <div className="icon group-hover:bg-green-500/10">
                                        <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                
            ))}
            {isOpen && <Modal session={session} onCommentCreated={() => setRefreshDataOnAction(Math.random().toString())} />}
            {isOpenTweetUpdate && <ModalTweetUpdate onTweetUpdated={() => setRefreshDataOnAction(Math.random().toString())} onTweetUpdatedOnTweetPage={() => { }} tweetPage={true} tweetPageDetail={false}/>}
        </>
    )
}