"use client";

//import { db } from '@/firebase/config';
import { motion } from 'framer-motion';
//import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MaskText } from '.';

type customerPros = {
    name: string,
    logoUrl: string,
}

const About = () => {
    const swiperRef = useRef<any>();
    const [customers, setCustomers] = useState<customerPros[]>();
    const [width, setWidth] = useState<number>(0);

    const updateDimensions = () => {
        if (typeof window !== "undefined") setWidth(window.innerWidth - (((window.innerWidth - 1024) / 2) + 1024 + 35));
    }

    const getCustomers = async () => {
        /*const customersQuery = await getDocs(query(collection(db, "customers"))); // updated
        const customers = customersQuery.docs.map(async (doc) => {
            const b = doc.data();
            return {
                name: b.name,
                logoUrl: b.logoUrl,
            };
        });

        const resolvedCustomers = await Promise.all(customers);
        setCustomers(resolvedCustomers);*/
        setCustomers([
            { name: "Daikin", logoUrl: "/assets/about/Daikin_logo_PNG_(4).png" },
            { name: "德教会", logoUrl: "/assets/about/de.png" },
            { name: "DHL", logoUrl: "/assets/about/DHL-Logo-PNG2.png" },
            { name: "Doterra Wellness Advocate", logoUrl: "/assets/about/doterra-wellness-advocate-colors.png" },
            { name: "Elf", logoUrl: "/assets/about/elf.png" },
            { name: "Stellar International School", logoUrl: "/assets/about/IMG_3042.png" },
            { name: "LIZA", logoUrl: "/assets/about/np_24552_1691372405.png" },
            { name: "新加坡惠安公会", logoUrl: "/assets/about/Screenshot 2024-10-09 at 2.48.14 PM.png" },
            { name: "Shiseido", logoUrl: "/assets/about/Shiseido_(4).png" },
            { name: "MAD COFFEE", logoUrl: "/assets/about/Untitled-1.png" }
        ])
    };

    useEffect(() => {
        getCustomers();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        updateDimensions();
    }, [])

    return (<div id="floor1" className="flex flex-col gap-2 sm:gap-4 md:gap-4 lg:gap-8 items-center justify-center">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
                transition: {
                    duration: 1,
                }
            }}
            className="flex flex-col gap-8 grid-cols-1 lg:grid grid-cols-2 lg:w-[1024px] px-8 lg:px-0">
            <div className="w-full sm:w-[500px] lg:w-full">
                <Image alt="" className="cursor-pointer duration-300 object-cover opacity-90 hover:scale-105 rounded-md shadow-sm" height={540} width={1080} src={`/assets/about/DSC00594-Enhanced-NR-3.jpg`} />
            </div>
            <div className="flex flex-col gap-2 lg:gap-4">
                <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl">Welcome to IMCreator</div>
                <div className="font-bold text-xs sm:text-sm md:text-md lg:text-lg">WHO WE ARE</div>
                <div className="text-sm sm:text-md md:text-lg">
                    We are a team of dedicated professionals with years of experience in the printing industry. As a leading personalized printing service provider, we specialize in high-quality custom apparel and accessories. Our mission is to offer you a seamless and enjoyable experience as you design unique t-shirts, hoodies, caps, office uniforms, and more.
                </div>
            </div>
        </motion.div>
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
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-8 z-50">
                <div className="flex flex-col lg:gap-2 items-center">
                    <div className="font-bold text-md sm:text-xl md:text-2xl lg:text-4xl">Our Clients</div>
                    <div className="text-sm sm:text-md md:text-lg">
                        We are proud to have worked with a diverse range of clients, from small businesses to large organizations.
                    </div>
                </div>
                <div
                    className="flex">
                    <button onClick={() => swiperRef.current?.slidePrev()} className="block xl:hidden text-[#86654a] text-6xl"><RiArrowLeftWideLine /></button>
                    <Swiper
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
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
                        slidesPerView={2}
                        spaceBetween={10}
                        modules={[Autoplay]}
                    >
                        {
                            customers?.map((value, key) => (
                                <SwiperSlide key={key}>
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                duration: 0.3,
                                            }
                                        }}
                                        className="h-16 md:h-24 object-contain sm:h-32" alt={value.name} src={value.logoUrl}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button onClick={() => swiperRef.current?.slideNext()} className="block xl:hidden text-[#86654a] text-6xl"><RiArrowRightWideLine /></button>
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

export default About;