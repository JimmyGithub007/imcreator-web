"use client";

import { FC } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
//import Link from "next/link";

interface MailboxProps {
    params: {
        id: string;
    };
}

const Mailbox: FC<MailboxProps> = ({ params }) => {
    const { id } = params;

    return (
        <motion.div className="bg-[#f5f4f2] flex h-screen items-center justify-center w-screen">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        bounce: 0.4,
                        duration: 1,
                        type: "spring",
                    }
                }}
                className="bg-white flex flex-col overflow-hidden p-2 rounded-lg shadow-md shadow-white w-[500px]">
                <div className="bg-lime-200 flex h-[200px] items-center justify-center rounded-lg shadow-sm text-white text-7xl">
                    <IoMdCheckmarkCircleOutline />
                </div>
                <div className="flex flex-col gap-4 h-[280px] items-center justify-center p-4 text-center">
                    <div className="flex flex-col">
                        <div className="font-bold text-2xl">Great!</div>
                        <div>Your message was sent successfully,</div>
                        <div>our people will contact you as soon as possible.</div>
                        <div>Your reference id: <b>{id}</b></div>
                    </div>
                    <div>For very urgent assistance, please copy the above reference id and <button className="text-[#25d366]">whatsapp us</button></div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Mailbox;
