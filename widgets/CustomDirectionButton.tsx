"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomDirectionButton = ({ swiperFuc, direction, className }: { swiperFuc: () => void, direction: string, className?: string }) => {
    const [width, setWidth] = useState<number>(0);
    const updateDimensions = () => {
        if (typeof window !== "undefined") setWidth(window.innerWidth - (((window.innerWidth - 1024) / 2) + 1024 + 35));
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        updateDimensions();
    }, [])

    if (direction === "left") {
        return (<motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute left-0 hidden xl:block ${className}`}>
            <button onClick={swiperFuc} className="border-r-2 border-y-2 border-black duration-300 rounded-r-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                <div className="absolute bg-black h-[1.5px] left-[35px]" style={{ width: width + "px" }}></div>
                <div className="border-black border-t-2 border-l-2 h-8 -rotate-45 w-8"></div>
            </button>
        </motion.div>)
    } else {
        return <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute right-0 hidden xl:block ${className}`}>
            <button onClick={swiperFuc} className="border-l-2 border-y-2 border-black duration-300 rounded-l-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                <div className="absolute bg-black h-[1.5px] right-[35px]" style={{ width: width + "px" }}></div>
                <div className="border-black border-b-2 border-r-2 h-8 -rotate-45 w-8"></div>
            </button>
        </motion.div>
    }
}

export default CustomDirectionButton;