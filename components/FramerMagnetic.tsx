"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

type Position = {
    x: number;
    y: number;
}

const FramerMagnetic = ({ children } : { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [ postion, setPosition ] = useState<Position>({ x: 0, y: 0 });

    const mouseMove = (e: any) => {
        if (ref.current) {
            const { clientX, clientY } = e;
            const { width, height, left, top } = ref.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x, y });
        }
    }

    const mouseLeave = () => {
        setPosition({x: 0, y: 0});
    }

    const { x, y } = postion;

    return (<motion.div
        ref={ref}
        animate={{x, y}}
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
        {children}
    </motion.div>)
}

export default FramerMagnetic;