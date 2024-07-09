"use client";

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6"
import { MdOutlineMailOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form"
import { motion } from "framer-motion";
import { Alert, Snackbar, TextField } from "@mui/material"
import { auth } from "@/firebase/config";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import Shell from "@/components/Shell"
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Inputs = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [message, setMessage] = useState<string>("");
    const [user, setUser] = useState<{ uid: number, email: string }>({ uid: 0, email: "" });
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError('confirmPassword', { type: 'custom', message: 'New password not same as confirm password' });
            return;
        }

        try {
            const u = auth.currentUser;
            if (u && u.email) {
                const credential = EmailAuthProvider.credential(u.email, data.currentPassword);
                await reauthenticateWithCredential(u, credential);
                await updatePassword(u, data.newPassword);
                setMessage("Your password updated successfully");
                reset({
                    currentPassword: "", newPassword: "", confirmPassword: ""
                });
            }
        } catch (error) {
            console.error("Error updating password", error);
            setError('currentPassword', { type: 'custom', message: 'Current password not correctly' });
        }
    }

    useEffect(() => {
        const handleAuthStateChanged = async (user: any) => {
            if (user) {
                console.log(user)
                setUser({
                    uid: user.uid,
                    email: user.email
                });

            } else {
                router.push("/admin/login");
            }
        }
        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
        return () => {
            unsubscribe();
        };
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="text-xl">HI, you can try update your current password below</div>
                    <div className="">Email: {user.email}</div>
                    <TextField className="w-full" label="Current Password" type="password" error={!!errors.currentPassword} helperText={errors.currentPassword?.message}
                        {...register("currentPassword",
                            {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 8 characters long",
                                },
                            }
                        )} />
                    <TextField className="w-full" label="New Password" type="password" error={!!errors.newPassword} helperText={errors.newPassword?.message}
                        {...register("newPassword",
                            {
                                required: "New Password is required",
                                minLength: {
                                    value: 6,
                                    message: "New Password must be at least 8 characters long",
                                },
                            }
                        )} />
                    <TextField className="w-full" label="Confirm Password" type="password" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
                        {...register("confirmPassword",
                            {
                                required: "Confirm Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Confirm Password must be at least 8 characters long",
                                },
                            }
                        )} />
                    <button type="submit" className="border-2 border-[#d0c7c1] bg-[#d0c7c1] duration-300 font-bold focus:border-[inherit] focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-[#d0c7c1]/90 py-2 rounded-3xl shadow-md text-white w-full">Update password</button>
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

export default Profile;