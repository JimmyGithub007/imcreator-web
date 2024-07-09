"use client";

import { auth, db } from "../../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Monoton } from "next/font/google";
import { motion } from "framer-motion";
import moment, { duration } from "moment";
import Image from "next/image";
const monoton = Monoton({ subsets: ["latin"], weight: '400' });

type Inputs = {
    email: string
    password: string
}

const Login = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            router.push("/admin/profile");
        } catch (error) {
            console.log(error)
        }
    }

    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = moment(now).format('llll') //now.toLocaleTimeString();
            setCurrentTime(timeString);
        };

        const intervalId = setInterval(updateClock, 1000);
        updateClock(); // initial call to set the time immediately

        return () => clearInterval(intervalId);
    }, []);

    return (<motion.div
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
            transition: {
                duration: 0.5,
            }
        }}
        className="flex items-center justify-start w-screen relative overflow-hidden">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: "url('/assets/background/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
                zIndex: -1,
            }}
        >
        </div>
        <motion.div
            initial={{
                opacity: 0,
                y: 100,
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.5,
                    duration: 0.5,
                }
            }}
            className={`${monoton.className} absolute bottom-0 font-bold right-0 text-white text-6xl text-right`}>
            {currentTime}
        </motion.div>
        <motion.div
            initial={{
                opacity: 0,
                x: -100,
            }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    delay: 0.5,
                    duration: 0.5,
                }
            }}
            className="bg-[#f5f4f2] flex flex-col gap-4 h-screen max-w-[400px] justify-center items-center relative shadow-sm shadow-[#f5f4f2]">
            <Image className={``} alt="logo" width={200} height={200} src={"/assets/logo/logo.png"} />
            <div className="flex flex-col gap-2 px-8 sm:px-16">
                <span className="font-bold text-3xl">Welcome Back to ImCreator.</span>
                <h1 className="font-bold text-xl">Admin Panel</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-8 sm:px-16 w-full">
                <div className="flex flex-col">
                    <input
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-2 sm:py-3 rounded-md shadow-md w-full`}
                        placeholder={`E-MAIL`}
                        type={`text`}
                        {...register("email",
                            {
                                required: "E-mail is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Please enter email format",
                                },
                            })
                        }
                    />
                    <div className="flex h-4 items-center">{ !!errors.email && <span className="text-red-600 text-xs">*{errors.email?.message}</span> }</div>
                    <input
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-2 sm:py-3 rounded-md shadow-md w-full`}
                        placeholder={`PASSWORD`}
                        type={`password`}
                        {...register("password",
                            {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            }
                        )}
                    />
                    <div className="flex h-4 items-center">{ !!errors.password && <span className="text-red-600 text-xs">*{errors.password?.message}</span> }</div>
                </div>
                <button type="submit" className="border-2 border-[#d0c7c1] bg-[#d0c7c1] duration-300 font-bold focus:border-[inherit] focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-[#d0c7c1]/90 py-2 rounded-3xl shadow-md text-white w-full">LOGIN</button>
                <div className="text-gray-500 text-sm">Don&apos;t have an account? Try ask admin to help you for creating account.</div>
            </form>
            <div className="absolute bottom-4 text-center text-gray-300 text-sm w-full">Imcreator 2024 All Rights Reserved ©</div>
        </motion.div>
    </motion.div>)
}

export default Login;