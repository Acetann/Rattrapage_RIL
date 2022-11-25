import Image from 'next/image'
import { HomeIcon } from "@heroicons/react/solid";
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { SidebarLink } from './SidebarLink';
import { signOut } from 'next-auth/react';
import { UserSession } from '../../pages/api/auth/[...nextauth]';

type SidebarProps = {
    session: UserSession

}
export const Sidebar: React.FC<SidebarProps> = ({session}) => {
    return (
        <div className ="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
            </div>
            <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
                <SidebarLink text="Home" Icon={HomeIcon} page={`Home`} />
                <SidebarLink text="Profile" Icon={UserIcon} page={`profile/${session?.userId}`}/>
            </div>
           {/*  <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
                Tweet
            </button> */}
            <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]  sm:motion-safe:hover:animate-spin transform motion-safe:hover:scale-110"
                onClick={() => signOut()}>
                Deconnexion
            </button>
            <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5">
                <img className="h-10 w-10 rounded-full xl:mr-2.5" src={session.user?.image!} alt="profilPicture"/>
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session.user?.name}</h4>
                    <p className="text-[#6e767d]">{session.user?.email}</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
            </div>
        </div>
       
    )
}

export default Sidebar

