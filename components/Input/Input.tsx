import {  EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { UserSession } from '../../pages/api/auth/[...nextauth]';

type CreateTweetProps = {
    session: UserSession
    onTweetCreated : () => void

}

export const Input: React.FC<CreateTweetProps> = ({ session, onTweetCreated  }) => {
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const filePickerRef = useRef(null)
  
    const addImageToTweet = () => {}

    const sendTweet = () => {
        axios
            .post('/api/createTweet', {
                content
            })
            .then((res) => {
                onTweetCreated()
                setContent('')
            })
            .finally(() => {

            })
    }

    return (
        <div className="border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide text-[#d9d9d9]">
            <img
                src={session?.user?.image!}
                alt=""
                className="h-11 w-11 rounded-full mr-4"
            />
            <div className="w-full divide-y divide-gray-700">
                <div className={`${selectedFile && "pb-7"} ${content && "space-y-2.5"}`}>
                    <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows= {2}
                    placeholder="Envie de partager ?"
                        className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] overflow-hidden'
                    />

                    {selectedFile && (
                    <div className='relative'>
                        <div 
                        className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justift-center top-1 left-1 cursor-pointer'
                        onClick={() => setSelectedFile(null)}
                        >
                            <XIcon className='text-white h-5' />
                        </div>
                        <img 
                        src={selectedFile}
                        alt=''
                        className="rounded-2xl max-h-80 object-contain"
                        />
                    </div>
                    )}
                </div>

                <div className='flex items-center justify-between pt-2.5'>
                    <div className='flex items-center'>
                        <div className='icon'>
                            <PhotographIcon className='h-[22px] text-[#1d9bf0]'/>
                            <input 
                            type="file" 
                            hidden
                            onChange={addImageToTweet} 
                            ref={filePickerRef} />
                        </div>

                        <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>


                        {/* {showEmojis && (
                            <Picker 
                            onSelect={addEmoji}
                            style={{
                                position: "absolute",
                                marginTop: "465px",
                                marginLeft: -40,
                                maxWidth: "320px",
                                borderRadius: "20px"
                            }}
                            theme="dark"
                            />
                        )} */}
                    </div>
                    <button 
                    className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                        disabled={!content && !selectedFile}
                        onClick={sendTweet}
                    >
                    Tweet
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Input;