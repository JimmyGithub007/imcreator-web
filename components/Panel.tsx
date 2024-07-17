
"use client";

import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from "framer-motion"; import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { GoArrowRight } from "react-icons/go";
import CustomDirectionButton from "@/widgets/CustomDirectionButton";
;

type banners = {
    sortingId: number,
    imageUrl: string,
}

const Panel = () => {
    const [swiper, setSwiper] = useState<any>(null);
    const [slideId, setSlideId] = useState(0);
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
        setBanners(resolvedBanners);
    };

    useEffect(() => {
        getBanners();
    }, [])

    return (<div className="flex flex-col gap-4 lg:w-[1024px] lg:px-0 px-8 w-screen">
        <div className="">
            <CustomDirectionButton className="top-[calc(50%-80px)]" direction="left" swiperFuc={() => swiper.slidePrev() } />
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
                onSwiper={setSwiper}
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
            <CustomDirectionButton className="top-[calc(50%-80px)]" direction="right" swiperFuc={() => swiper.slideNext() } />
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