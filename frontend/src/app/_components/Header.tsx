'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { PATH } from "../_constants";
import Link from "next/link";

const Header = () => {

    const pathName = usePathname();
    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
        if (pathName === PATH.HOME) {
            setIsHome(true)
        } else if (pathName === PATH.POSTS) {
            setIsHome(false)
        }
    }, [pathName])

  return (
    <div className=" w-full h-16 flex justify-between p-4 items-center px-10 bg-white border-b-2">
    <div className="size-10 bg-black"></div>
    <div className="flex ">
        <Link href={'/home'} className={`text-md font-semibold ml-5 ${isHome ? 'active-tab' : 'inactive-tab'}`}>Home</Link>
        <Link href={'/posts'} className={`text-md font-semibold ml-5 ${!isHome ? 'active-tab' : 'inactive-tab'}`}>Posts</Link>
    </div>
    </div>
  )
}

export default Header
