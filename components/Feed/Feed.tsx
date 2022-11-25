import { SparklesIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTweetUpdateState } from "../../atoms/modalAtom";
import { UserSession } from "../../pages/api/auth/[...nextauth]";
import Input from "../Input/Input";
import { MyTweetsContainer } from "./TweetsContainer";

type TweetsProps = {
    session: UserSession
}

const Feed: React.FC<TweetsProps> = ({session}) => {
    const [refreshData, setRefreshData] = useState<string>("");
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [isOpenTweetUpdate, setIsOpenTweetUpdate] = useRecoilState(modalTweetUpdateState);
    
    return (
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold">Home</h2>
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
                    <SparklesIcon className="h-5 text-white" />
                </div>
            </div>
            <Input session={session} onTweetCreated={() => setRefreshData(Math.random().toString())} />
            <div className="pb-72">
                <MyTweetsContainer session={session} refreshData={refreshData} tweetPage={false} />
            </div>
        </div>
    );
}

export default Feed
