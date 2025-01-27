"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

type reviewPros = {
    url: string,
}

const Review = () => {
    const swiperRef = useRef<any>();
    const [slideId, setSlideId] = useState(0);
    const [reviews, setReviews] = useState<reviewPros[]>();
    const [width, setWidth] = useState<number>(0);

    const updateDimensions = () => {
        if (typeof window !== "undefined") setWidth(window.innerWidth - (((window.innerWidth - 1024) / 2) + 1024 + 35));
    }

    const getReviews = async () => {
        setReviews([
            { url: "/assets/reviews/449846559_496056632951734_1716377600028724096_n.jpg" },
            { url: "/assets/reviews/450269293_496056949618369_8512369138045272543_n.jpg" },
            { url: "/assets/reviews/450310434_332459629917841_5051355811507091893_n.jpg" },
            { url: "/assets/reviews/450955519_336030322894105_8877679739252736258_n.jpg" },
            { url: "/assets/reviews/451333014_337265656103905_4050652488316340801_n.jpg" },
            { url: "/assets/reviews/452717146_343373718826432_1077031822101682247_n.jpg" },
            { url: "/assets/reviews/456620755_363511696812634_1094427558199764194_n.jpg" },
            { url: "/assets/reviews/460142574_540422751848455_1008849414284920553_n.jpg" },
            { url: "/assets/reviews/468757346_432366396593830_9019640009488091036_n.jpg" },
            { url: "/assets/reviews/450269293_496056949618369_8512369138045272543_n.jpg" },
            { url: "/assets/reviews/468805847_432372659926537_2172138082592833616_n.jpg" },
            { url: "/assets/reviews/468811495_594006866490043_7895802951741509519_n.jpg" },
        ])
    };

    useEffect(() => {
        getReviews();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        updateDimensions();
    }, [])

    return (<div className="flex flex-col items-center justify-center">
        <div className="flex flex-col text-center w-screen lg:w-[1024px] px-8 lg:px-0">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1 } }}
                className={`absolute left-0 hidden xl:block`}>
                <button onClick={() => swiperRef.current.slidePrev()} className="border-r-2 border-y-2 border-black duration-300 rounded-r-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                    <div className="absolute bg-black h-[1.5px] left-[35px]" style={{ width: width + "px" }}></div>
                    <div className="border-black border-t-2 border-l-2 h-8 -rotate-45 w-8"></div>
                </button>
            </motion.div>
            <div className="flex flex-col gap-4 z-50">
                <div className="flex flex-col lg:gap-2 items-center">
                    <div className="font-bold text-2xl lg:text-4xl">Customer Review</div>
                    <div className="text-md md:text-lg">
                        We are proud to have worked with a diverse range of clients, from small businesses to large organizations.
                    </div>
                </div>
                <div
                    className="flex">
                    <button onClick={() => swiperRef.current?.slidePrev()} className="block xl:hidden text-[#86654a] text-6xl"><RiArrowLeftWideLine /></button>
                    <Swiper
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                slidesPerGroup: 1,
                            },
                            768: {
                                slidesPerView: 3,
                                slidesPerGroup: 1,
                            },
                        }}
                        className="cursor-pointer"
                        loop={true}
                        freeMode={true}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onSlideChange={(swiperCore) => {
                            setSlideId(swiperCore.realIndex)
                        }}
                        slidesPerView={1}
                        slidesPerGroupSkip={1}
                        spaceBetween={30}
                        modules={[Autoplay, FreeMode]}
                    >
                        {
                            reviews?.map((value, key) => (
                                <SwiperSlide key={key}>
                                    <motion.img
                                        initial={{ opacity: 0 }}
                                        whileInView={{
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                            }
                                        }}
                                        className="object-contain" alt={`review`} src={value.url}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button onClick={() => swiperRef.current?.slideNext()} className="block xl:hidden text-[#86654a] text-6xl"><RiArrowRightWideLine /></button>
                </div>
                <div className="flex justify-center gap-2 p-4">
                    {
                        reviews?.map((_, key) => (
                            <button key={key} className={`${slideId === key ? "bg-[#86654a] scale-[1.7]" : "bg-[#86654a]/40"} duration-300 h-2 rounded-full shadow-sm shadow-blue-950/40 w-2`}></button>
                        ))
                    }
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1 } }}
                className={`absolute right-0 hidden xl:block`}>
                <button onClick={() => swiperRef.current.slideNext()} className="border-l-2 border-y-2 border-black duration-300 rounded-l-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                    <div className="absolute bg-black h-[1.5px] right-[35px]" style={{ width: width + "px" }}></div>
                    <div className="border-black border-b-2 border-r-2 h-8 -rotate-45 w-8"></div>
                </button>
            </motion.div>
        </div>
    </div>)
}

export default Review;