"use client";

import { FaPhoneAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { delay, motion } from "framer-motion";
import { Footer, MaskText } from ".";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import nodemailer from 'nodemailer';
import { Alert, CircularProgress, Snackbar } from "@mui/material";

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
    const [ sending, setSending ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>("");
    const [ severity, setSeverity ] = useState<"success" | "info" | "warning" | "error">("info");
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset, control, getValues, setError, clearErrors } = useForm<messageProps>();

    const onSubmit: SubmitHandler<messageProps> = async (data) => {
        if(!sending) {
            try {
                /*const docRef = await addDoc(collection(db, "mailbox"), {
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                });
                reset({ name: "", email: "", subject: "", message: "" });
                router.push(`/mailbox/${docRef.id}`);*/
                setSending(true);
                setSeverity("warning");
                setMessage("Please do not close or refresh the page until your message has been successfully sent. This may take a few moments. Thank you for your patience!");
                await fetch("/api/email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        subject: data.subject,
                        text: "Name:"+data.name+"\nEmail:"+data.email+"\nContent:\n"+data.message,
                    })
                })
                setSeverity("success");
                setMessage("Your request was sent successfully, our people will contact you as soon as possible.");
            } catch (error) {
                setSeverity("error");
                setMessage("Something wrong, please try to call/ whatsapp with the contact number.");
            } finally {
                setSending(false);
            }
        }
    }

    return (<div id="floor4" className="flex flex-col items-center">
        <div className="flex items-center lg:w-[1024px] h-[calc(100vh-240px)] px-8">
            <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1 sm:gap-4">
                    <MaskText className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Contact Us</MaskText>
                    <MaskText className="font-bold italic pr-2 text-xs sm:text-sm md:text-md lg:text-lg">
                        Please fill out the form below to spend us an email
                    </MaskText>
                    <MaskText className="text-xs sm:text-sm md:text-md lg:text-lg">
                        If you have any inquiries regarding our products and services, kindly drop us a message, and we will contact you soon.
                    </MaskText>
                    <div className="flex gap-2">
                        <div className="bg-[#ef534f] flex h-8 items-center justify-center rounded-full shadow-md sm:h-10 sm:w-10 w-8">
                            <MdMail className="text-white text-md sm:text-lg md:text-xl" />
                        </div>
                        <div className="flex flex-col text-xs sm:text-sm md:text-md">
                            <MaskText className="">E-mail</MaskText>
                            <MaskText className="font-bold">{process.env.NEXT_PUBLIC_EMAIL}</MaskText>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-black flex h-8 items-center justify-center rounded-full shadow-md sm:h-10 sm:w-10 w-8">
                            <FaPhoneAlt className="text-white text-md sm:text-lg md:text-xl" />
                        </div>
                        <div className="flex flex-col text-xs sm:text-sm md:text-md">
                            <MaskText className="">Contact Number</MaskText>
                            <MaskText className="font-bold">60 12-754 0007 / 60 16-755 5707</MaskText>
                        </div>
                    </div>
                </div>
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-end">
                    <motion.input
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 0.1, duration: 0.5 } }}
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-1 sm:py-3 rounded-md shadow-md w-full`}
                        placeholder={`NAME`}
                        type={`text`}
                        {...register("name", { required: "Name is required", })}
                    />
                    <div className="flex h-3 sm:h-4 items-center">{!!errors.name && <span className="text-red-600 text-xs">*{errors.name?.message}</span>}</div>
                    <motion.input
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-1 sm:py-3 rounded-md shadow-md w-full`}
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
                    <div className="flex h-3 sm:h-4 items-center">{!!errors.email && <span className="text-red-600 text-xs">*{errors.email?.message}</span>}</div>
                    <motion.input
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-1 sm:py-3 rounded-md shadow-md w-full`}
                        placeholder={`SUBJECT`}
                        type={`text`}
                        {...register("subject", { required: "Subject is required", })}
                    />
                    <div className="flex h-3 sm:h-4 items-center">{!!errors.subject && <span className="text-red-600 text-xs">*{errors.subject?.message}</span>}</div>
                    <motion.textarea
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
                        className={`border-[#d0c7c1] bg-[#d0c7c1] border-2 custom-input duration-300 focus:border-[inherit] focus:ring-2 focus:outline-none focus:ring-[#d0c7c1] px-2 py-1 sm:py-3 resize-none rounded-md shadow-md w-full`}
                        placeholder={`MESSAGE`}
                        rows={4}
                        {...register("message", { required: "Message is required", })}
                    />
                    <div className="flex h-3 sm:h-4 items-center">{!!errors.message && <span className="text-red-600 text-xs">*{errors.message?.message}</span>}</div>
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1, transition: { delay: 0.5, duration: 0.6 } }}
                        type="submit"
                        className={`${sending ? "border-[#d0c7c1]/20 bg-[#d0c7c1]/20 cursor-not-allowed" : "border-[#d0c7c1] bg-[#d0c7c1] focus:border-[inherit] focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-[#d0c7c1]/90"} border-2 duration-300 flex font-bold gap-2 items-center px-8 py-2 rounded-3xl shadow-md text-white`}
                    >
                        SUBMIT
                        { sending && <CircularProgress color="inherit" size={25} /> }
                    </motion.button>
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
            className="hidden justify-center w-screen md:flex">
            <Footer contact={contact} />
        </motion.div>
        <Snackbar
            autoHideDuration={10000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={message !== "" ? true : false}
            onClose={() => setMessage("")}
        >
            <Alert
                onClose={() => setMessage("")}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >{message}</Alert>
        </Snackbar>
    </div>)
}

export default Contact;