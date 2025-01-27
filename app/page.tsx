"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsMessenger, BsWhatsapp } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { About, Contact, Footer, FramerMagnetic, Loading, Navbar, Order, Panel, Project, Review, Service } from "@/components";
import { plusFloor, minusFloor, setFloor } from "@/store/slice/floorSlice";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "@/store";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
import 'swiper/css';

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP;
const messengerUrl = process.env.NEXT_PUBLIC_MESSENGER;

const menus = [
  { floor: 0, title: "HOME" },
  { floor: 1, title: "ABOUT" },
  { floor: 2, title: "RECENT PROJECT" },
  { floor: 3, title: "CUSTOMER REVIEW" },
  { floor: 4, title: "OUR SERVICES" },
  { floor: 5, title: "HOW TO ORDER" },
  { floor: 6, title: "CONTACT" }
];

type contactProps = {
  email: string,
  addressLine1: string,
  addressLine2: string,
  facebook: string,
  instagram: string,
  phoneNo: string,
}

const Home = () => {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ swiper, setSwiper ] = useState<any>(null);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const { floor } = useSelector((state: RootState) => state.floor);
  const [contact, setContact] = useState<contactProps>({
    email: "",
    addressLine1: "",
    addressLine2: "",
    facebook: "",
    instagram: "",
    phoneNo: "",
  });

  const getContact = async () => {
    const q = query(collection(db, "contact"), limit(1));
    const contactSnapshot = await getDocs(q);
    if (contactSnapshot.docs.length > 0) {
      const contactTemp = contactSnapshot.docs[0].data();
      setContact({
        email: contactTemp.email,
        addressLine1: contactTemp.addressLine1,
        addressLine2: contactTemp.addressLine2,
        facebook: contactTemp.facebook,
        instagram: contactTemp.instagram,
        phoneNo: contactTemp.phoneNo,
      })
    }
  }

  useEffect(() => {
    getContact();
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen w-screen"><Loading /></div>

  return (
    <main className="bg-[#f5f4f2]">
      <motion.header
        id="navbar"
        initial={{
          opacity: 0,
          y: -50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5
          }
        }}
        className="flex flex-col items-center justify-center sticky top-0 z-50">
        {/*<div className="bg-[#86654a] flex gap-80 font-bold items-center h-12 overflow-hidden text-[#f0e2c2] w-full whitespace-nowrap">
          <div>NEW PROMOTIONS | UP TO 70% OFF</div>
          <div>NEW PROMOTIONS | UP TO 70% OFF</div>
          <div>NEW PROMOTIONS | UP TO 70% OFF</div>
          <div>NEW PROMOTIONS | UP TO 70% OFF</div>
          <div>NEW PROMOTIONS | UP TO 70% OFF</div>
          <div>NEW PROMOTIONS | UP TO 70% OFF</div>
        </div>*/}
        <div className="border-b-2 border-b-black flex h-16 sm:h-24 items-center justify-between lg:w-[1024px] px-4 w-full">
          <Image alt="logo" className="h-[80px] w-[80px] sm:h-[150px] sm:w-[150px]" height={150} width={150} src={`/assets/logo/logo.png`} />
          <div className="gap-4 hidden items-center md:flex">
            {
              menus.map((value, key) => (
                <a className={`${floor === value.floor ? "cursor-normal font-bold text-[#8a6b51] scale-[1.2]" : "cursor-pointer"} duration-300 text-center w-24`} key={key} onClick={() => { swiper.slideTo(value.floor); }}>{value.title}</a>
              ))
            }
          </div>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: "100%"
            }}
            onClick={() => setIsOpen(true)}
            className="text-2xl md:hidden">
            <HiMenuAlt3 />
          </motion.button>
        </div>
      </motion.header>
      <Swiper
        className="h-[calc(100vh-64px)] sm:h-[calc(100vh-96px)]"
        direction={"vertical"}
        modules={[Mousewheel]}
        mousewheel={true}
        onSwiper={setSwiper}
        onSlideChange={(swiperCore) => {
          dispatch(setFloor(swiperCore.realIndex))
        }}
      >
        <SwiperSlide style={{ overflow: "hidden" }}><Panel /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><About /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><Project /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><Review /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><Order /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><Service floorSwiper={swiper} /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><Order /></SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}><Contact contact={contact} /></SwiperSlide>
      </Swiper>
      <AnimatePresence>
        {floor < 4 && <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            bounce: 0,
            duration: 0.8
          }}
          className="fixed bottom-4 right-16 gap-2 hidden sm:flex z-50">
          <FramerMagnetic><BsMessenger className="cursor-pointer duration-300 hover:opacity-80 text-[#86654a] text-5xl" onClick={() => window.open(messengerUrl, '_blank')} /></FramerMagnetic>
          <FramerMagnetic><BsWhatsapp className="cursor-pointer duration-300 hover:opacity-80 text-[#86654a] text-5xl" onClick={() => window.open(whatsappUrl, '_blank')} /></FramerMagnetic>
        </motion.div>}
      </AnimatePresence>
      <motion.div className="flex sm:hidden flex-col gap-2 fixed left-2 top-[50%]">
        {
          [0, 1, 2, 3, 4].map((_, key) => (
            <button key={key} className={`${floor === key ? "bg-[#86654a] scale-[1.7]" : "bg-[#86654a]/40"} duration-300 h-2 rounded-full shadow-sm shadow-blue-950/40 w-2`}></button>
          ))
        }
      </motion.div>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{
              y: "-100%"
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: "-100%"
            }}
            transition={{
              bounce: 0,
              duration: 0.3
            }}
            className="bg-[#f5f4f2] fixed h-screen left-0 top-0 w-screen z-50">
            <div className="flex flex-col items-center font-bold text-2xl">
              <motion.button
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: "100%",
                }}
                transition={{
                  duration: 0.2
                }}
                className="duration-300 hover:text-slate-300 text-6xl"
                onClick={() => setIsOpen(false)}>
                <IoIosClose />
              </motion.button>
              {
                menus.map((value, key) => (<motion.div
                  initial={{
                    x: "100%"
                  }}
                  animate={{
                    x: 0
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 * key
                  }}
                  className={`${key === 0 && "border-t-2"} border-b-2 border-black flex justify-between px-4 py-2 w-full`} key={key}>
                  <span>0{key + 1}.</span>
                  <a className={`${floor === value.floor ? "cursor-normal font-bold text-[#8a6b51]" : "cursor-pointer"} duration-300 text-center`} key={key} onClick={() => { swiper.slideTo(value.floor); setIsOpen(false); }}>{value.title}</a>
                </motion.div>))
              }
            </div>
            <div className="border-black bg-white border-2 m-4 rounded-lg shadow-sm">
              <Footer contact={contact} />
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </main>
  );
}

export default Home;
