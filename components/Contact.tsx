"use client";

import { FaPhoneAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { motion } from "framer-motion";
import { Footer } from ".";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type messageProps = {
    name: string,
    email: string,
    subject: string,
    message: string,
}

type contactProps = {
    email: string,
    addressLine1: string,
    addressLine2: string,
    facebook: string,
    instagram: string,
    phoneNo: string,
  }

const Contact = ({ contact }: { contact: contactProps }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset, control, getValues, setError, clearErrors } = useForm<messageProps>();

    const onSubmit: SubmitHandler<messageProps> = async (data) => {
        try {
            const docRef = await addDoc(collection(db, "mailbox"), {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            });
            reset({ name: "", email: "", subject: "", message: "" });
            router.push(`/mailbox/${docRef.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (<div id="floor4" className="flex flex-col items-center px-8">
        <div className="flex items-center lg:w-[1024px] h-[calc(100vh-192px)]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2 sm:gap-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                bounce: 0.4,
                                duration: 1,
                                type: "spring",
                            }
                        }}
                        className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                        Contact Us
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                bounce: 0.4,
                                delay: 0.2,
                                duration: 1,
                                type: "spring",
                            }
                        }} className="font-bold italic text-sm sm:text-md md:text-lg">
                        Please fill out the form below to spend us an email
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                bounce: 0.4,
                                delay: 0.4,
                                duration: 1,
                                type: "spring",
                            }
                        }} className="text-sm sm:text-md md:text-lg">
                        If you have any inquiries regarding our products and services, kindly drop us a message, and we will contact you soon.
                    </motion.span>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                bounce: 0.4,
                                delay: 0.6,
                                duration: 1,
                                type: "spring",
                            }
                        }} className="flex gap-2">
                        <div className="bg-[#ef534f] flex h-8 items-center justify-center rounded-full shadow-md sm:h-10 sm:w-10 w-8">
                            <MdMail className="text-white text-xl sm:text-2xl" />
                        </div>
                        <div className="flex flex-col text-sm sm:text-md">
                            <span className="">E-mail</span>
                            <span className="font-bold">{contact.email}</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                bounce: 0.4,
                                delay: 0.8,
                                duration: 1,
                                type: "spring",
                            }
                        }} className="flex gap-2">
                        <div className="bg-black flex h-8 items-center justify-center rounded-full shadow-md sm:h-10 sm:w-10 w-8">
                            <FaPhoneAlt className="text-white text-xl sm:text-2xl" />
                        </div>
                        <div className="flex flex-col text-sm sm:text-md">
                            <span className="">Contact Number</span>
                            <span className="font-bold">{contact.phoneNo}</span>
                        </div>
                    </motion.div>
                </div>
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            bounce: 0.4,
                            delay: 1,
                            duration: 1,
                            type: "spring",
                        }
                    }} className="flex flex-col items-end">
                    <input
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-2 sm:py-3 rounded-md shadow-md w-full`}
                        placeholder={`NAME`}
                        type={`text`}
                        {...register("name", { required: "Name is required", })}
                    />
                    <div className="flex h-3 sm:h-4 items-center">{ !!errors.name && <span className="text-red-600 text-xs">*{errors.name?.message}</span> }</div>
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
                    <div className="flex h-3 sm:h-4 items-center">{ !!errors.email && <span className="text-red-600 text-xs">*{errors.email?.message}</span> }</div>
                    <input
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-2 sm:py-3 rounded-md shadow-md w-full`}
                        placeholder={`SUBJECT`}
                        type={`text`}
                        {...register("subject", { required: "Subject is required", })}
                    />
                    <div className="flex h-3 sm:h-4 items-center">{ !!errors.subject && <span className="text-red-600 text-xs">*{errors.subject?.message}</span> }</div>
                    <textarea
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-3 resize-none rounded-md shadow-md w-full`}
                        placeholder={`MESSAGE`}
                        rows={5}
                        {...register("message", { required: "Message is required", })}
                    />
                    <div className="flex h-3 sm:h-4 items-center">{ !!errors.message && <span className="text-red-600 text-xs">*{errors.message?.message}</span> }</div>
                    <button type="submit" className="border-2 border-[#d0c7c1] bg-[#d0c7c1] duration-300 font-bold focus:border-[inherit] focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-[#d0c7c1]/90 py-2 rounded-3xl shadow-md text-white w-36">SUBMIT</button>
                </motion.form>
            </div>
        </div>
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
                transition: {
                    duration: 1,
                }
            }}
            className="hidden justify-center w-screen px-8 sm:flex">
            <Footer contact={contact} />
        </motion.div>
    </div>)
}

export default Contact;