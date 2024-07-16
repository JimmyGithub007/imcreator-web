"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "@/store";
import { setFloor } from "@/store/slice/floorSlice";
import { IoIosClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { Footer } from ".";
import Image from "next/image";

const menus = [
    { floor: 0, title: "HOME" },
    { floor: 1, title: "ABOUT" },
    { floor: 2, title: "OUR SERVICES" },
    { floor: 3, title: "HOW TO ORDER" },
    { floor: 4, title: "CONTACT" }
];

const Navbar = () => {
    const { floor } = useSelector((state: RootState) => state.floor);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const dispatch = useDispatch();

    return (<motion.div 
            initial={{
                opacity: 0,
                y: -50,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5
                }
            }}
            className="bg-[#f5f4f2] flex justify-center px-8 sticky top-0 z-50">
        <div className="border-b-2 border-b-black flex h-24 items-center justify-between lg:w-[1024px] px-4 w-full">
            <Image alt="logo" height={150} width={150} src={`/assets/logo/logo.png`} />
            <div className="gap-4 hidden items-center md:flex">
                {
                    menus.map((value, key) => (
                        <a className={`${floor === value.floor ? "cursor-normal font-bold text-[#8a6b51] scale-[1.2]" : "cursor-pointer"} duration-300 text-center w-24`} key={key} onClick={() => { dispatch(setFloor(value.floor)) }}>{value.title}</a>
                    ))
                }
            </div>
            <motion.button
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{
                    scale: 0.8,
                    rotate: -90,
                    borderRadius: "100%"
                }}
                onClick={() => setIsOpen(true)}
                className="text-2xl md:hidden">
                <HiMenuAlt3 />
            </motion.button>
        </div>
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    initial={{
                        y: "-100%"
                    }}
                    animate={{
                        y: 0
                    }}
                    exit={{
                        y: "-100%"
                    }}
                    transition={{
                        bounce: 0,
                        duration: 0.3
                    }}
                    className="bg-[#f5f4f2] fixed h-screen left-0 top-0 w-screen z-20">
                    <div className="flex flex-col items-center gap-4 font-bold text-2xl pt-[64px]">
                        {
                            menus.map((value, key) => (
                                <a className={`${floor === value.floor ? "cursor-normal font-bold text-[#8a6b51] scale-[1.2]" : "cursor-pointer"} duration-300 text-center`} key={key} onClick={() => { dispatch(setFloor(value.floor)); setIsOpen(false); }}>{value.title}</a>
                            ))
                        }
                        <motion.button
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            whileTap={{
                                scale: 0.8,
                                rotate: -90,
                                borderRadius: "100%",
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className="duration-300 hover:text-slate-300 text-6xl"
                            onClick={() => setIsOpen(false)}>
                            <IoIosClose />
                        </motion.button>
                    </div>
                    <div className="bg-white m-4 rounded-lg shadow-sm">
                        {/*<Footer />*/}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    </motion.div>)
}

export default Navbar;