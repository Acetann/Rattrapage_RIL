import Image from 'next/image'
import router from 'next/router'

interface SidebarLinksProps {
    Icon: any
    text: string
    active?: boolean
    page: string
}

export const SidebarLink: React.FC<SidebarLinksProps> = ({ Icon , text, active, page }) => {

    return (
        <div
            className="text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation"
            onClick={() => router.push(`/${page}`)}
        >
            <Icon className="h-7" />
            <span className="hidden xl:inline">{text}</span>
        </div> 
    )
}



