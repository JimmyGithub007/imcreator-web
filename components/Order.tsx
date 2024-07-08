"use client";

import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { db } from '@/firebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type orderStepPros = {
    sortingId: number,
    name: string,
    imageUrl: string,
}

const Order = () => {
    const swiperRef = useRef<any>();
    const [ orderSteps, setOrderSteps] = useState<orderStepPros[]>();

    const getOrderSteps = async () => {
        const orderStepsQuery = await getDocs(query(collection(db, "orderSteps"), orderBy("sortingId"))); // updated
        const resp = orderStepsQuery.docs.map(async (doc) => {
            const b = doc.data();
            return {
                sortingId: b.sortingId,
                name: b.name,
                imageUrl: b.imageUrl,
            };
        });

        const resolvedOrderSteps = await Promise.all(resp);
        setOrderSteps(resolvedOrderSteps);
    };

    useEffect(() => {
        getOrderSteps();
    }, [])


    return (<div id="floor3" className="flex h-screen items-center justify-center pt-24 sm:pt-0">
        <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center lg:w-[800px] px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            bounce: 0.4,
                            duration: 1,
                            type: "spring",
                        }
                    }}
                    className="font-bold text-2xl sm:text-3xl lg:text-4xl">HOW TO ORDER
                </motion.h1>
                <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            bounce: 0.4,
                            delay: 0.2,
                            duration: 1,
                            type: "spring",
                        }
                    }} className="text-sm md:text-md">
                    We’re passionate about bringing your creative ideas to life with our extensive range of high quality printing services. Whether you’re looking for something personal or professional, we’ve got you covered with a variety of products tailored to meet your needs
                </motion.span>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        bounce: 0.4,
                        delay: 0.4,
                        duration: 1,
                        type: "spring",
                    }
                }} className="flex w-screen lg:w-[1024px] px-8">
                <button onClick={() => swiperRef.current?.slidePrev()} className="text-[#86654a] text-6xl"><RiArrowLeftWideLine /></button>
                <Swiper
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                        },
                        768: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                        },
                        1024: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                    }}
                    centeredSlides={false}
                    className="mySwiper"
                    grabCursor={true}
                    loop={false}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1}
                    slidesPerGroupSkip={1}
                    spaceBetween={30}
                >
                    {
                        orderSteps?.map((value, key) => (
                            <SwiperSlide key={key}>
                                <div className="border-2 border-[#86654a] flex flex-col p-2">
                                    <div className="">
                                        <img alt="" src={value.imageUrl} />
                                    </div>
                                    <div className="flex h-12 items-center justify-center">
                                        <span className="font-bold text-lg">{value.name}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <button onClick={() => swiperRef.current?.slideNext()} className="text-[#86654a] text-6xl"><RiArrowRightWideLine /></button>
            </motion.div>
        </div>
    </div>)
}

export default Order;