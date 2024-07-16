"use client";

import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { db } from '@/firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type customerPros = {
    name: string,
    logoUrl: string,
}

const About = () => {
    const swiperRef = useRef<any>();
    const [customers, setCustomers] = useState<customerPros[]>();

    const getCustomers = async () => {
        const customersQuery = await getDocs(query(collection(db, "customers"))); // updated
        const customers = customersQuery.docs.map(async (doc) => {
            const b = doc.data();
            return {
                name: b.name,
                logoUrl: b.logoUrl,
            };
        });

        const resolvedCustomers = await Promise.all(customers);
        setCustomers(resolvedCustomers);
    };

    useEffect(() => {
        getCustomers();
    }, [])

    return (<div id="floor1" className="flex flex-col gap-2 sm:gap-4 md:gap-8 items-center justify-center">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
                transition: {
                    duration: 1,
                }
            }}
            className="gap-16 grid-cols-1 lg:grid grid-cols-2 lg:w-[1024px] px-8 lg:px-0">
            <Image alt="" className="cursor-pointer duration-300 object-cover hover:hue-rotate-30 rounded-md shadow-md" height={540} width={1080} src={`/assets/about/about.jpg`} />
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                <motion.h1
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            bounce: 0.4,
                            duration: 1,
                            type: "spring",
                        }
                    }}
                    className="font-bold text-2xl sm:text-3xl md:text-4xl">Welcome to IMCreator</motion.h1>
                <motion.h2
                    initial={{ opacity: 0, x: 50 }}
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
                    className="font-bold text-sm sm:text-md md:text-lg">WHO WE ARE</motion.h2>
                <motion.span
                    initial={{ opacity: 0, x: 50 }}
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
                    className="text-sm sm:text-md md:text-lg">
                    We are a team of dedicated professionals with years of experience in the printing industry. As a leading personalized printing service provider, we specialize in high-quality custom apparel and accessories. Our mission is to offer you a seamless and enjoyable experience as you design unique t-shirts, hoodies, caps, office uniforms, and more.
                </motion.span>
            </div>
        </motion.div>
        <div className="flex flex-col text-center w-screen lg:w-[1024px] px-8 lg:px-0">
            <div className="absolute left-0 hidden xl:block">
                <button onClick={() => swiperRef.current?.slidePrev()} className="border-r-2 border-y-2 border-black duration-300 rounded-r-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                    <div className="absolute bg-black h-[1.5px] left-[35px] w-[calc(100vw-70px)]"></div>
                    <div className="border-black border-t-2 border-l-2 h-8 -rotate-45 w-8"></div>
                </button>
            </div>
            <div className="bg-[#f5f4f2] flex flex-col gap-2 sm:gap-3 md:gap-4 z-50">
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
                    className="font-bold text-2xl sm:text-3xl md:text-4xl">
                    Our Clients
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
                    }}
                    className="text-sm sm:text-md md:text-lg">
                    We are proud to have worked with a diverse range of clients, from small businesses to large organizations.
                </motion.span>
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
                    }}
                    className="flex">
                    <button onClick={() => swiperRef.current?.slidePrev()} className="block xl:hidden text-[#86654a] text-6xl"><RiArrowLeftWideLine /></button>
                    <Swiper
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        className="cursor-pointer"
                        loop={true}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        slidesPerView={1}
                        spaceBetween={10}
                    >
                        {
                            customers?.map((value, key) => (
                                <SwiperSlide key={key}><img className="h-48 md:h-24 object-contain sm:h-32" alt={value.name} src={value.logoUrl} /></SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button onClick={() => swiperRef.current?.slideNext()} className="block xl:hidden text-[#86654a] text-6xl"><RiArrowRightWideLine /></button>
                </motion.div>
            </div>
            <div className="absolute right-0 hidden xl:block">
                <button onClick={() => swiperRef.current?.slideNext()} className="border-l-2 border-y-2 border-black duration-300 rounded-l-full flex h-40 hover:opacity-60 items-center justify-center relative w-28">
                    <div className="absolute bg-black h-[1.5px] right-[35px] w-[calc(100vw-70px)]"></div>
                    <div className="border-black border-b-2 border-r-2 h-8 -rotate-45 w-8"></div>
                </button>
            </div>
        </div>
    </div>)
}

export default About;