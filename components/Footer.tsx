"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
    return (<div className="border-t-black flex flex-col gap-4 justify-between lg:w-[1024px] px-4 py-8 w-full md:border-t-2 sm:flex-row sm:items-center shadow-md md:shadow-none">
        <div className="flex gap-2 items-center">
            <a href={process.env.NEXT_PUBLIC_FACEBOOK} target="_blank" className="cursor-pointer">
                <FaFacebook className="duration-300 h-8 rounded-full shadow-md text-[#4267B2] w-8 hover:opacity-80 hover:scale-105" />
            </a>
            <a className="cursor-pointer duration-300 bg-gradient-to-b flex from-[#833ab4] h-8 items-center justify-center rounded-full shadow-md to-[#fcb045] via-[#fd1d1d] w-8 hover:opacity-80 hover:scale-105"
                href={process.env.NEXT_PUBLIC_INSTAGRAM} target="_blank"
            >
                <FaInstagram className="text-white text-2xl" />
            </a>
            <span className="font-bold">IMCreator</span>
        </div>
        <div className="flex flex-col gap-2 text-xs">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2">
                    <a href={`https://maps.app.goo.gl/XKQseSmYEtmju3zBA`} target="_blank" className=" duration-300 hover:opacity-80 hover:scale-105">
                        <Image alt="" className="rounded-md shadow-md" height={32} width={32} src={`/assets/icons/googlemap.png`} />
                    </a>
                    <a href={`https://waze.com/ul?ll=1.33294,103.7008&navigate=yes`} className="bg-[#05c8f7] duration-300 flex rounded-md h-8 items-center justify-center shadow-md w-8 hover:opacity-80 hover:scale-105">
                        <Image alt="" height={24} width={24} src={`/assets/icons/waze.png`} />
                    </a>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Headquarter:</span>
                    <span>IMCREATOR TRADING &#40;UEN: 53470698C&#41;</span>
                    <span className="text-gray-600">7 Soon Lee Street &#35;04-47 Ispace. Singapore 627608</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2">
                    <a href={`https://maps.app.goo.gl/yULaZ6bcaEXnU7uy9`} target="_blank" className="duration-300 hover:opacity-80 hover:scale-105">
                        <Image alt="" className="rounded-md shadow-md" height={32} width={32} src={`/assets/icons/googlemap.png`} />
                    </a>
                    <a href={`https://waze.com/ul?ll=1.532515,103.794987&navigate=yes`} className="bg-[#05c8f7] duration-300 flex rounded-md h-8 items-center justify-center shadow-md w-8 hover:opacity-80 hover:scale-105">
                        <Image alt="" height={24} width={24} src={`/assets/icons/waze.png`} />
                    </a>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Production:</span>
                    <span>IMCREATOR APPAREL SDN. BHD. &#40;SSM: 202401016159&#41;</span>
                    <span className="text-gray-600">5 Jalan Rosmerah 2/5, Taman Johor Jaya, Johor Bahru, Malaysia</span>
                </div>
            </div>
        </div>
    </div>)
}

export default Footer;