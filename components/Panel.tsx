
"use client";

import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";

type banners = {
    sortingId: number,
    imageUrl: string,
}

const Panel = () => {
    const swiperRef = useRef<any>();
    const [slideId, setSlideId] = useState(0);
    const [banners, setBanners] = useState<banners[]>();
    const [width, setWidth] = useState<number>(0);

    const updateDimensions = () => {
        if (typeof window !== "undefined") setWidth(window.innerWidth - (((window.innerWidth - 1024) / 2) + 1024 + 35));
    }

    const getBanners = async () => {
        const bannerQuery = await getDocs(query(collection(db, "banners"), orderBy("sortingId"))); // updated
        const banners = bannerQuery.docs.map(async (doc) => {
            const b = doc.data();
            return {
                sortingId: b.sortingId,
                imageUrl: b.imageUrl,
            };
        });

        const resolvedBanners = await Promise.all(banners);
        setBanners(resolvedBanners);
    };

    useEffect(() => {
        getBanners();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        updateDimensions();
    }, [])

    return (<div className="flex flex-col gap-4 lg:w-[1024px] lg:px-0 px-8 w-screen">
        <div className="">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1 } }}
                className={`absolute left-0 hidden xl:block top-[calc(50%-80px)]`}>
                <button onClick={() => swiperRef.current.slidePrev()} className="border-r-2 border-y-2 border-black duration-300 rounded-r-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                    <div className="absolute bg-black h-[1.5px] left-[35px]" style={{ width: width + "px" }}></div>
                    <div className="border-black border-t-2 border-l-2 h-8 -rotate-45 w-8"></div>
                </button>
            </motion.div>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                className="h-64 sm:h-80 md:h-96 rounded-2xl lg:w-[1024px]"
                loop={true}
                modules={[Autoplay]}
                onSlideChange={(swiperCore) => {
                    setSlideId(swiperCore.realIndex)
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                pagination={{
                    dynamicBullets: true,
                }}
            >
                {
                    banners?.map((value, key) => (
                        <SwiperSlide key={key}><motion.img
                            initial={{ opacity: 0 }}
                            whileInView={{
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                }
                            }}
                            className="border-2 border-black cursor-pointer h-64 sm:h-80 md:h-96 object-cover rounded-2xl lg:w-[1024px]" alt="" src={value.imageUrl} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1 } }}
                className={`absolute right-0 hidden xl:block top-[calc(50%-80px)]`}>
                <button onClick={() => swiperRef.current.slideNext()} className="border-l-2 border-y-2 border-black duration-300 rounded-l-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                    <div className="absolute bg-black h-[1.5px] right-[35px]" style={{ width: width + "px" }}></div>
                    <div className="border-black border-b-2 border-r-2 h-8 -rotate-45 w-8"></div>
                </button>
            </motion.div>
            <div className="flex justify-end gap-2 p-4">
                {
                    banners?.map((_, key) => (
                        <button key={key} className={`${slideId === key ? "bg-[#86654a] scale-[1.7]" : "bg-[#86654a]/40"} duration-300 h-2 rounded-full shadow-sm shadow-blue-950/40 w-2`}></button>
                    ))
                }
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="flex flex-col gap-4 justify-center">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            bounce: 0.4,
                            delay: 0.2,
                            duration: 1,
                            type: "spring",
                        }
                    }}
                    className="font-bold text-3xl sm:text-4xl md:text-5xl">WELCOME TO IMCREATOR
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            bounce: 0.4,
                            delay: 0.4,
                            duration: 1,
                            type: "spring",
                        }
                    }}
                    className="text-md sm:text-lg md:text-xl">YOUR ONE-STOP PRINTING SOLUTION
                </motion.h1>
            </div>
            <div className="flex gap-2 lg:justify-end">
                {
                    [1, 2, 3].map((value, key) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    bounce: 0.4,
                                    delay: 0.2 * value,
                                    duration: 1,
                                    type: "spring",
                                }
                            }}
                            className="h-24 md:h-40 md:w-40 overflow-hidden rounded-md sm:h-32 sm:w-32 w-24"
                        >
                            <img
                                alt={value.toString()}
                                className="cursor-pointer duration-300 h-24 hover:hue-rotate-180 hover:rotate-2 hover:scale-[1.2] md:h-40 md:w-40 object-cover sm:h-32 sm:w-32 w-24" src={`/assets/panel/panel${value}.jpg`}
                            />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    </div>)
}

export default Panel;