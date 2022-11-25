import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { UserSession } from "../api/auth/[...nextauth]"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Head from "next/head"
import Sidebar from "../../components/Sidebar/Sidebar"
import { ArrowLeftIcon, ChatIcon, EditIcon } from "@chakra-ui/icons"
import {  DotsVerticalIcon, EmojiHappyIcon, HeartIcon, PhotographIcon, ShareIcon, SwitchHorizontalIcon, TrashIcon, XIcon } from "@heroicons/react/outline"
import moment from "moment"
import { useRecoilState } from "recoil"
import { commentIdState, commentState, modalTweetUpdateState, tweetIdState, tweetState } from "../../atoms/modalAtom"
import ModalTweetUpdate from "../../components/Modal/ModalTweetUpdate"
import axios from "axios"
import ModalCommentUpdate from "../../components/Modal/ModalCommentUpdate"

type TweetsProps = {
    session: UserSession
}

const Tweet: React.FC<TweetsProps> = ({ session }) => {
    const router = useRouter()
    const [tweet, setTweet] = useRecoilState(tweetState)
    const [tweetId, setTweetId] = useRecoilState(tweetIdState)
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false);
    const [isOpenTweetUpdate, setIsOpenTweetUpdate] = useRecoilState(modalTweetUpdateState);
    const [isOpenCommentUpdate, setIsOpenCommentUpdate] = useState(false)
    const [tweetPageDetail, setTweetPageDetail] = useState(true)
    const [content, setContent] = useState("");
    const [refreshDataOnTweetPage, setRefreshDataOnTweetPage] = useState<string>("");
    const [commentId, setCommentId] = useRecoilState(commentIdState)
    const [comment, setComment] = useRecoilState(commentState)

    const query = router.query;
    const tid = query.tid

    const title = `${tweet?.author?.name} on Twitter: ${tweet?.content}`
    
    const getTweet = async () => {
        const tweetId = tid
        const response = await fetch(`/api/tweet/${tweetId}`)
        const data = await response.json()
        return data
    }
    
    const sendCommentFromTweetPage = () => {

        const tweetId = tid
        axios
            .post(`/api/tweet/${tweetId}`, {
                content: content
            })
            .then((res) => {
                setRefreshDataOnTweetPage(Math.random().toString())
                setContent('')
            })
    }


    const deleteTweetFromTweetPage = async (id: string) => {
        const deleteId = JSON.stringify({ id })
        await fetch('/api/deleteTweet', {
            method: "DELETE",
            body: deleteId
        })
        .then((res) => {
            router.push("/")
        })
    }

    const deleteCommentFromTweetPage = async (id: string) => {
        const tweetId = tid
        const commentId = id
        axios
        .delete(`/api/comment/${tweetId}`, {
            data: 
            {
                id: commentId
            }
        })
        .then((res) => {
            setRefreshDataOnTweetPage(Math.random().toString())
        })

    }

    useEffect(() => {
        getTweet().then((tweet) => setTweet(tweet))
    }, [refreshDataOnTweetPage])

    return (
        <div>
            <Head>
                <title>
                    {title}
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
                {/* Sidebar */}
                <Sidebar session={session} />
                {/* Back Main Page */}
                <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                        <div
                            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                            onClick={() => router.push("/")}
                        >
                            <ArrowLeftIcon className="h-5 text-white" />
                        </div>
                        Tweet
                    </div>
                    {/* ResumeTweet */}
                    <div className="p-3 flex cursor-pointer border-b border-gray-700">
                        <div className="flex flex-col space-y-2 w-full">
                            <div className="flex">
                                <img
                                    src={tweet?.author?.image}
                                    alt="Profile Pic"
                                    className="h-11 w-11 rounded-full mr-4"
                                />
                                <div className="text-[#6e767d]">
                                    <div className="inline-block group">
                                        <h4
                                            className="font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline">
                                            {tweet?.author?.name}
                                        </h4>
                                    </div>
                                    <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                                        {tweet?.content}
                                    </p>
                                </div>
                            {session?.userId == tweet?.author?.id ? (
                                <div className="icon group flex-shrink-0 ml-auto"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTweetId(tweet?.id);
                                        setTweet(tweet)
                                        setIsOpenTweetUpdate(true);
                                    }}>
                                    <div className="icon group text-[#6e767d]">
                                        <EditIcon className="h-5 group-hover:text-[#1d9bf0]" />
                                    </div>
                                </div>
                            ) : (
                                <div className="icon group text-[#6e767d]">
                                    <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                                </div>
                            )}
                            </div>
                            <img
                                src={tweet?.image}
                                alt=""
                                className="rounded-2xl max-h-[700px] object-cover mr-2"
                            />
                            <span className="text-gray-500 text-[15px]">{moment(tweet?.createdAt).format('Do MMMM YYYY')}</span>
                            
                            <div className="text-[#6e767d] flex justify-between w-10/12">
                                <div
                                    className="flex items-center space-x-1 group"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                                        <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
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
                                        {likes.length}
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
                                            onClick={() => { deleteTweetFromTweetPage(tweet?.id) }}/>
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
                    <span className="hover:underline text-sm sm:text-[15px]"></span>
                        <div className="border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide text-[#d9d9d9]">
                            <img
                                src={session.user?.image!}
                                alt=""
                                className="h-11 w-11 rounded-full mr-4"
                            />
                            <div className="w-full divide-y divide-gray-700">
                                <div className="pb-7">
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={2}
                                        placeholder="Tweetez votre réponse"
                                        className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] overflow-hidden'
                                    />
                                    <div className='flex items-center justify-between pt-2.5'>
                                        <div className='flex items-center'>
                                            <div className='icon'>
                                                <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                                                <input
                                                type="file"
                                                hidden
                                                />
                                            </div>
                                            <div className="icon">
                                                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                            </div>
                                        </div>
                                        <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                        onClick={sendCommentFromTweetPage}
                                        disabled={!content}
                                        >
                                            Tweet
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {tweet?.comments?.map(comment => (
                            <div key={comment?.id} className="p-3 flex cursor-pointer border-b border-gray-700">
                                <img
                                    src={comment?.Author?.image}
                                    alt=""
                                    className="h-11 w-11 rounded-full mr-4"
                                />
                                <div className="flex flex-col space-y-2 w-full">
                                    <div className="flex justify-between">
                                        <div className="text-[#6e767d]">
                                            <div className="inline-block group">
                                                <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                                                    {comment?.Author?.name}
                                                </h4>
                                                {/*   <span className="ml-1.5 text-sm sm:text-[15px]">
                                                @{comment?.tag}{" "}
                                            </span> */}
                                            </div>{" "}
                                            ·{" "}
                                            <span className="hover:underline text-sm sm:text-[15px]">
                                                {moment(comment?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                            </span>
                                            <p className="text-[#d9d9d9] mt-0.5 max-w-lg  text-[15px] sm:text-base">
                                                {comment?.content}
                                            </p>
                                        </div>
                                        {session?.userId == comment?.Author?.id ? (
                                            <div className="icon group flex-shrink-0 ml-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsOpenTweetUpdate(false)
                                                    setCommentId(comment?.id)
                                                    setComment(comment)
                                                    setIsOpenCommentUpdate(true);
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

                                    <div className="text-[#6e767d] flex justify-between w-10/12">
                                        <div className="icon group">
                                            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                                        </div>

                                        <div className="flex items-center space-x-1 group">
                                            <div className="icon group-hover:bg-pink-600/10">
                                                <HeartIcon className="h-5 group-hover:text-pink-600" />
                                            </div>
                                            <span className="group-hover:text-pink-600 text-sm"></span>
                                        </div>
                                        {session?.userId == comment?.Author?.id ? (
                                            <div className="icon group">
                                                <TrashIcon className="h-5 group-hover:text-[#1d9bf0]"
                                                    onClick={() => { deleteCommentFromTweetPage(comment?.id) }} />
                                            </div>
                                        ) : (
                                            <div className="icon group">
                                                <SwitchHorizontalIcon className="h-5 group-hover:text-[#1d9bf0]" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            {isOpenTweetUpdate && <ModalTweetUpdate onTweetUpdated={() => setRefreshDataOnTweetPage(Math.random().toString())} tweetPage={true} tweetPageDetail={false} onTweetUpdatedOnTweetPage={() => setRefreshDataOnTweetPage(Math.random().toString())} />}
            {isOpenCommentUpdate && <ModalCommentUpdate isOpenCommentUpdate={true} onOpenChange={() => setIsOpenCommentUpdate(false)} onCommentUpdated={() => setRefreshDataOnTweetPage(Math.random().toString())} tid={tid} />}
        </div>
    );
}

export default Tweet

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