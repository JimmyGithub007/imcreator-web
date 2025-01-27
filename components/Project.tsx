"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

type projectPros = {
    url: string,
}

const Project = () => {
    const swiperRef = useRef<any>();
    const [slideId, setSlideId] = useState(0);
    const [projects, setProjects] = useState<projectPros[]>();
    const [width, setWidth] = useState<number>(0);

    const updateDimensions = () => {
        if (typeof window !== "undefined") setWidth(window.innerWidth - (((window.innerWidth - 1024) / 2) + 1024 + 35));
    }

    const getProjects = async () => {
        setProjects([
            { url: "/assets/projects/IMG_0094.jpg" },
            { url: "/assets/projects/IMG_0095.jpg" },
            { url: "/assets/projects/IMG_0123.jpg" },
            { url: "/assets/projects/IMG_0124.jpg" },
            { url: "/assets/projects/IMG_0125.jpg" },
            { url: "/assets/projects/IMG_0139.jpg" },
            { url: "/assets/projects/IMG_0141.jpg" },
            { url: "/assets/projects/IMG_0142.jpg" },
            { url: "/assets/projects/IMG_0144.jpg" },
            { url: "/assets/projects/IMG_0148.jpg" },
            { url: "/assets/projects/IMG_0149.jpg" },
            { url: "/assets/projects/IMG_0204.jpg" },
            { url: "/assets/projects/IMG_0213.jpg" },
            { url: "/assets/projects/IMG_0214.jpg" },
            { url: "/assets/projects/IMG_0216.jpg" },
            { url: "/assets/projects/IMG_0257.jpg" },
            { url: "/assets/projects/IMG_0258.jpg" },
            { url: "/assets/projects/IMG_0261.jpg" },
            { url: "/assets/projects/IMG_0263.jpg" },
            { url: "/assets/projects/IMG_0277.jpg" },
            { url: "/assets/projects/IMG_0278.jpg" },
            { url: "/assets/projects/IMG_0279.jpg" },
            { url: "/assets/projects/IMG_0281.jpg" },
            { url: "/assets/projects/IMG_0358.jpg" },
            { url: "/assets/projects/IMG_0368.jpg" },
            { url: "/assets/projects/IMG_0372.jpg" },
            { url: "/assets/projects/IMG_0373.jpg" },
            { url: "/assets/projects/IMG_0374.jpg" },
            { url: "/assets/projects/IMG_0375.jpg" },
            { url: "/assets/projects/IMG_0670.jpg" },
            { url: "/assets/projects/IMG_0671.jpg" },
            { url: "/assets/projects/IMG_0672.jpg" },
            { url: "/assets/projects/IMG_0676.jpg" },
            { url: "/assets/projects/IMG_0677.jpg" },
            { url: "/assets/projects/IMG_0678.jpg" },
        ])
    };

    useEffect(() => {
        getProjects();
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
                    <div className="font-bold text-2xl lg:text-4xl">Recent Project</div>
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
                            projects?.map((value, key) => (
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
                <div className="flex flex-wrap justify-center gap-2 p-4">
                    {
                        projects?.map((_, key) => (
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

export default Project;