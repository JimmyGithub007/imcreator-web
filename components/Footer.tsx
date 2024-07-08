"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaWaze } from "react-icons/fa";

const Footer = () => {
    return (<div className="border-t-black flex flex-col gap-4 justify-between lg:w-[1024px] px-4 py-8 w-full sm:border-t-2 sm:flex-row sm:h-24 sm:items-center">
        <div className="flex gap-2 items-center">
            <FaFacebook className="h-8 rounded-full shadow-md text-[#4267B2] w-8" />
            <div className="bg-gradient-to-b flex from-[#833ab4] h-8 items-center justify-center rounded-full shadow-md to-[#fcb045] via-[#fd1d1d] w-8">
                <FaInstagram className="text-white text-2xl" />
            </div>
            <span>IMCreator</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row text-xs sm:items-center">
            <div className="flex gap-2">
                <Image alt="" className="rounded-md shadow-md" height={32} width={32} src={`/assets/icons/googlemap.png`} />
                <div className="bg-[#05c8f7] flex rounded-md h-8 items-center justify-center shadow-md w-8">
                    <Image alt="" height={24} width={24} src={`/assets/icons/waze.png`} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <span>Headquarter:</span>
                    <span>5, Jalan Rosmerah 2.5, Johor Bahru, Malaysia</span>
                </div>
                <div className="flex flex-col">
                    <span>SG Office:</span>
                    <span>need update</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col text-xs sm:text-center">
            <span>IMCREATOR APPAREL SDN. BHD.</span>
            <span>202401016159 (1562009-X)</span>
        </div>
    </div>)
}

export default Footer;