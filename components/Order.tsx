"use client";

//import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { MaskText } from '.';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
//import { db } from '@/firebase/config';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/*type orderStepPros = {
    sortingId: number,
    name: string,
    imageUrl: string,
}*/

type customMadeStepsProps = {
    title: string,
    imageUrl: string,
}

const customMadeSteps:customMadeStepsProps[] = [
    { title: "Select Apparel Pattern", imageUrl: "/assets/orders/customMadeStep2.jpg" },
    { title: "Choose Color & Material", imageUrl: "/assets/orders/customMadeStep1.jpg" },
    { title: "Confirm Your Design", imageUrl: "/assets/orders/customMadeStep3.jpg" },
    { title: "Leave your Contact Information", imageUrl: "/assets/orders/customMadeStep4.jpg" }
]

const Order = () => {
    const swiperRef = useRef<any>();
    const [ step, setStep ] = useState<number>(0);
    {/*const [orderSteps, setOrderSteps] = useState<orderStepPros[]>();

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
    }, [])*/}

    return (<div id="floor3" className="flex flex-col gap-8 items-center">
        <div className="flex flex-col sm:gap-4 items-center lg:w-[800px] px-8">
            <MaskText className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">CUSTOM MADE</MaskText>
            {/*<MaskText className="text-sm sm:text-md md:text-lg">Highlight your identity and express yourself through clothes.</MaskText>*/}
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
            <button onClick={() => swiperRef.current?.slidePrev()} className={`duration-100 text-[#86654a] text-6xl block lg:hidden ${step > 0 ? "opacity-100" : "opacity-0"}`}><RiArrowLeftWideLine /></button>
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
                loop={false}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={1}
                slidesPerGroupSkip={1}
                spaceBetween={30}
                onSlideChange={(swiperCore) => {
                    setStep(swiperCore.realIndex);
                }}
            >
                {
                    customMadeSteps?.map((value, key) => (
                        <SwiperSlide className="py-2" key={key}>
                            <div className="bg-white border-2 border-[#86654a] flex flex-col p-2 rounded-sm shadow-md">
                                <div className="flex h-64 items-center justify-center">
                                    <img className="cursor-pointer duration-200 object-contain h-64 hover:hue-rotate-30" alt="" src={value.imageUrl} />
                                </div>
                                <div className="flex justify-center h-16">
                                    <span className="font-bold text-center text-md lg:text-lg">{value.title}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <button onClick={() => swiperRef.current?.slideNext()} className={`duration-100 text-[#86654a] text-6xl block lg:hidden ${step < (4/swiperRef.current?.params.slidesPerView-1) ? "opacity-100" : "opacity-0"}`}><RiArrowRightWideLine /></button>
        </motion.div>
    </div>)
}

export default Order;