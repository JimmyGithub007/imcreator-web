"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";

type contactProps = {
    email: string,
    addressLine1: string,
    addressLine2: string,
    facebook: string,
    instagram: string,
  }

const Footer = ({ contact }: { contact: contactProps }) => {
    return (<div className="border-t-black flex flex-col gap-4 justify-between lg:w-[1024px] px-4 py-8 w-full sm:border-t-2 sm:flex-row sm:h-24 sm:items-center">
        <div className="flex gap-2 items-center">
            <a href={contact.facebook} target="_blank"><FaFacebook className="h-8 rounded-full shadow-md text-[#4267B2] w-8" /></a>
            <a className="bg-gradient-to-b flex from-[#833ab4] h-8 items-center justify-center rounded-full shadow-md to-[#fcb045] via-[#fd1d1d] w-8"
                href={contact.instagram} target="_blank"
            >
                <FaInstagram className="text-white text-2xl" />
            </a>
            <span>IMCreator</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row text-xs sm:items-center">
            <div className="flex gap-2">
                <a href={`https://www.google.com/maps/place/5,+Jalan+Ros+Merah+2%2F5,+Taman+Johor+Jaya,+81100+Johor+Bahru,+Johor/@1.5346262,103.7898599,17z/data=!3m1!4b1!4m6!3m5!1s0x31da6c38b59bb047:0xf81e8a13337ac060!8m2!3d1.5346208!4d103.7924348!16s%2Fg%2F11n0mphtfz?entry=ttu`}><Image alt="" className="rounded-md shadow-md" height={32} width={32} src={`/assets/icons/googlemap.png`} /></a>
                <a href={`https://waze.com/ul?q=5%2C%20Jalan%20Rosmerah%202%2F5%2C%20Johor%20Bahru%2C%20Malaysia`} className="bg-[#05c8f7] flex rounded-md h-8 items-center justify-center shadow-md w-8">
                    <Image alt="" height={24} width={24} src={`/assets/icons/waze.png`} />
                </a>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <span>Headquarter:</span>
                    <span>{contact.addressLine1}<br/>{contact.addressLine2}</span>
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