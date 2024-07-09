"use client";

import { db } from "@/firebase/config";
import { RootState } from "@/store";
import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import { addDoc, collection, doc, getDocs, limit, query, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFacebook, BsInstagram, BsMailbox, BsMap, BsPhone, BsWhatsapp } from "react-icons/bs";
import { SiXiaohongshu } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type contactProps = {
    facebook: string,
    whatsapp: string,
    instagram: string,
    xhs: string,
    email: string,
    phoneNo: string,
    addressLine1: string,
    addressLine2: string,
}

const Contact = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: { errors }, reset, control, getValues } = useForm<contactProps>({
        defaultValues: {
            facebook: "",
            whatsapp: "",
            instagram: "",
            xhs: "",
            email: "",
            phoneNo: "",
            addressLine1: "",
            addressLine2: "",
        }
    });

    const onSubmit: SubmitHandler<contactProps> = async (data) => {
        const q = query(collection(db, "contact"), limit(1));
        const contactSnapshot = await getDocs(q);

        const contactTemp = {
            facebook: data.facebook,
            whatsapp: data.whatsapp,
            instagram: data.instagram,
            xhs: data.xhs,
            email: data.email,
            phoneNo: data.phoneNo,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
        }

        if (contactSnapshot.docs.length > 0) {
            await updateDoc(contactSnapshot.docs[0].ref, contactTemp);
        } else {
            await addDoc(collection(db, "contact"), contactTemp)
        }
        setMessage("Contact info updated successfully.");
    }

    useEffect(() => {
        const getContact = async () => {
            const q = query(collection(db, "contact"), limit(1));
            const contactSnapshot = await getDocs(q);
            if (contactSnapshot.docs.length > 0) {
                const contactTemp = contactSnapshot.docs[0].data();
                reset({
                    facebook: contactTemp.facebook,
                    whatsapp: contactTemp.whatsapp,
                    instagram: contactTemp.instagram,
                    xhs: contactTemp.xhs,
                    email: contactTemp.email,
                    phoneNo: contactTemp.phoneNo,
                    addressLine1: contactTemp.addressLine1,
                    addressLine2: contactTemp.addressLine2,
                });

            }
        }

        getContact();
    }, [])

    return (<main className={`flex flex-col items-center w-full`}>
        <motion.header
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 1
                }
            }}
            className="border-8 border-[#f5f4f2] bg-gradient-to-r from-cyan-500 to-blue-500 h-40 px-8 pt-6 rounded-3xl text-white w-full">
            <div className="flex h-14 items-center">
                <div className="text-lg">Admin / Contact</div>
            </div>
        </motion.header>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-144px)] -mt-16">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 50,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        bounce: 0.4,
                        delay: 0.5,
                        duration: 1.2,
                    }
                }}
                className="bg-slate-50 border-8 border-[#f5f4f2] flex flex-col gap-8 p-4 rounded-2xl w-[400px]">
                <h1 className="text-2xl">Please fill in your company contact info below</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <TextField label="Address line 1" error={!!errors.addressLine1} helperText={errors.addressLine1?.message}
                        {...register("addressLine1",
                            {
                                required: "Address line 1 is required",
                            }
                        )}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsMap />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Address line 2"
                        {...register("addressLine2")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsMap />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Phone no." error={!!errors.phoneNo} helperText={errors.phoneNo?.message}
                        {...register("phoneNo", {
                            required: "Phone no. is required"
                        })}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsPhone />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Email address" error={!!errors.email} helperText={errors.email?.message}
                        {...register("email",
                            {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Please enter email format",
                                },
                            }
                        )}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsMailbox className="text-red-800" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Facebook link"
                        {...register("facebook")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsFacebook className="text-[#3B5998]" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Whatsapp link"
                        {...register("whatsapp")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsWhatsapp className="text-[#25D366]" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Instagram link"
                        {...register("instagram")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BsInstagram className="text-black" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Xiao hong shu link"
                        {...register("xhs")}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SiXiaohongshu className="text-[#FF4500]" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <button type="submit" className="bg-blue-950 duration-200 font-bold flex gap-2 items-center justify-center px-8 py-2 rounded-lg shadow-md text-white focus:ring-4 focus:outline-none focus:ring-blue-950/40 hover:bg-blue-950/90">Upate contact</button>
                </form>
            </motion.div>
        </div>
        <motion.footer
            initial={{
                opacity: 0,
                y: 50,
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.5,
                    duration: 0.5,
                }
            }}
            className="bg-black flex items-center justify-center h-12 text-gray-300 w-full z-10">
            ImCreator 2024 All Rights Reserved ©
        </motion.footer>
        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={message !== "" ? true : false}
            onClose={() => setMessage("")}
        >
            <Alert
                onClose={() => setMessage("")}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >{message}</Alert>
        </Snackbar>
    </main>)
}

export default Contact;