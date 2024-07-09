
"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from "framer-motion";

import Image from "next/image";

type banners = {
    sortingId: number,
    imageUrl: string,
}

const Panel = () => {
    const [banners, setBanners] = useState<banners[]>();

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
        console.log(resolvedBanners)
        setBanners(resolvedBanners);
    };

    useEffect(() => {
        getBanners();
    }, [])

    return (<div id="floor0" className="flex gap-4 h-screen items-center justify-center pt-24 sm:pt-0">
        <div className="flex flex-col gap-4 lg:w-[1024px] lg:px-0 px-8 w-screen">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                    opacity: 1,
                    transition: {
                        duration: 1,
                    }
                }}
                className="bg-[#f5f4f2]">
                <Swiper
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper h-96 rounded-md"
                >
                    {
                        banners?.map((value, key) => (
                            <SwiperSlide key={key}><img className="object-cover rounded-md" alt="" src={value.imageUrl} /></SwiperSlide>
                        ))
                    }
                </Swiper>
            </motion.div>
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
                            <motion.img
                                key={key}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        bounce: 0.4,
                                        delay: 0.2 * value,
                                        duration: 1,
                                        type: "spring",
                                    }
                                }} alt=""
                                className="object-cover rounded-md shadow-md h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40" src={`/assets/panel/panel${value}.jpg`}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </div>)
}

export default Panel;