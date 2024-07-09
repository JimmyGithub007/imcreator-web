"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsMessenger, BsWhatsapp } from "react-icons/bs";
import { About, Contact, Navbar, Order, Panel, Service } from "@/components";
import { RootState } from "@/store";
import { plusFloor, minusFloor } from "@/store/slice/floorSlice";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const { floor } = useSelector((state: RootState) => state.floor);

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      dispatch(plusFloor());
    } else {
      dispatch(minusFloor());
    }
  }

  useEffect(() => {
    const element = document.getElementById(`floor${floor}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [floor])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [])

  return (
    <main className="bg-[#f5f4f2] flex flex-col">
      <Navbar />
      <Panel />
      <About />
      <Service />
      <Order />
      <Contact />
      <AnimatePresence>
        {floor < 4 && <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            bounce: 0,
            duration: 0.8
          }}
          className="fixed bottom-2 right-16 flex gap-2">
          <BsMessenger className="cursor-pointer text-[#86654a] text-5xl" />
          <BsWhatsapp className="cursor-pointer text-[#86654a] text-5xl" />
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}

export default Home;
