"use client";

//import { collection, getDocs, query } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
//import { db } from '@/firebase/config';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MaskText } from '.';

type servicePros = {
    title: string,
    imageUrl: string,
    description: string,
}

const services: servicePros[] = [
    { title: "Sublimation", imageUrl: "/assets/services/sublimation.jpg", description: "Sublimation printing uses heat to transfer dye onto fabric, resulting in vibrant, full-color designs that are durable and long-lasting.  Perfect for custom sports jerseys and apparel." },
    { title: "Embroidery", imageUrl: "/assets/services/embroidery.jpg", description: "Embroidery involves stitching designs onto fabric using thread, giving a classic and high-quality look. Ideal for logos and monograms on uniforms, hats, and bags." },
    { title: "Silkscreen", imageUrl: "/assets/services/silkscreen.jpg", description: "Silkscreen printing applies ink through a mesh screen onto fabric, creating bold and durable prints. Suitable for bulk orders of t-shirts and promotional items." },
    { title: "DTF Printing", imageUrl: "/assets/services/dtf.jpg", description: "Direct-to-Film (DTF) printing uses a special transfer film to apply detailed and vibrant designs to fabric. It is versatile and works well on various materials, providing a soft and durable finish." },
];

const Service = ({ floorSwiper }: { floorSwiper:any }) => {
    const swiperRef = useRef<any>();
    //const [services, setServices] = useState<servicePros[]>();

    /*const getServices = async () => {
        const servicesQuery = await getDocs(query(collection(db, "services"))); // updated
        const resp = servicesQuery.docs.map(async (doc) => {
            const b = doc.data();
            return {
                name: b.name,
                imageUrl: b.imageUrl,
            };
        });

        const resolvedServices = await Promise.all(resp);
        setServices(resolvedServices);
    };

    useEffect(() => {
        getServices();
    }, [])*/

    return (<div id="floor2" className="flex flex-col gap-8 items-center">
        <div className="flex flex-col sm:gap-4 items-center lg:w-[800px] px-8">
            <MaskText className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">OUR SERVICES</MaskText>
            <MaskText className="text-sm sm:text-md md:text-lg">We’re passionate about bringing your creative ideas to life with our extensive range of high quality printing services. Whether you’re looking for something personal or professional, we’ve got you covered with a variety of products tailored to meet your needs</MaskText>
        </div>
        <motion.div
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
            }} className="flex w-screen lg:w-[1024px] px-8">
            <button onClick={() => swiperRef.current?.slidePrev()} className="text-[#86654a] text-6xl block lg:hidden"><RiArrowLeftWideLine /></button>
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
                grabCursor={true}
                loop={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={1}
                slidesPerGroupSkip={1}
                spaceBetween={30}
            >
                {
                    services?.map((value, key) => (
                        <SwiperSlide className="py-2" key={key}>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front border-2 border-[#86654a] flex flex-col p-2 rounded-sm shadow-md">
                                        <div className="flex h-64 items-center justify-center">
                                            <img className="duration-100 object-contain h-64" alt={value.title} src={value.imageUrl} />
                                        </div>
                                        <div className="flex h-10 items-center justify-center">
                                            <span className="font-bold text-lg">{value.title}</span>
                                        </div>
                                    </div>
                                    <div className="flip-card-back border-2 border-[#86654a] flex flex-col p-2 rounded-sm shadow-md bg-[#fff5e1]">
                                        <div className="flex h-full items-center justify-center text-center p-4">
                                            <p className="text-sm">{value.description}</p>
                                        </div>
                                        <button onClick={() => floorSwiper.slideTo(4) } className="font-bold">Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <button onClick={() => swiperRef.current?.slideNext()} className="text-[#86654a] text-6xl block lg:hidden"><RiArrowRightWideLine /></button>
        </motion.div>
    </div>)
}

export default Service;