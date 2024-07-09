"use client";

import { auth, db } from "@/firebase/config";

import { Drawer, FormControl, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type userProps = {
    uid: string,
    username: string,
    email: string,
    statusId: number,
    password?: string,
}

const statusArr = [
    { id: 0, name: "Inactive", color: "bg-slate-300" },
    { id: 1, name: "Active", color: "bg-emerald-400" },
];

const Dot = ({ colorClass }: { colorClass: string }) => {
    return <span className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colorClass}`}></span>
    </span>
}

const Users = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState<userProps[]>([]);
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, control, getValues } = useForm<userProps>({
        defaultValues: {
            uid: "",
            username: "",
            email: "",
            statusId: 1,
            password: ""
        }
    });

    const getUsers = async () => {
        const usersQuery = await getDocs(query(collection(db, "users")));
        let usersArr: userProps[] = [];
        usersQuery.docs.map(async (doc: any) => {
            let temp = doc.data();
            usersArr.push({
                uid: temp.uid,
                username: temp.username,
                email: temp.email,
                statusId: temp.statusId,
            });
        })
        setUsers(usersArr);
    }

    const onEdit = async (uid: string) => {
        const q = query(collection(db, "users"), where("uid", "==", uid), limit(1));
        const userSnapshot = await getDocs(q);
        if (userSnapshot.docs.length > 0) {
            const userData = userSnapshot.docs[0].data();
            reset({
                uid: userData.uid,
                username: userData.username,
                email: userData.email,
                statusId: userData.statusId,
            });
            setOpen(true);
        }
    }

    const onSubmit: SubmitHandler<userProps> = async (data) => {
        try {
            if (data.uid !== "") {
                const q = query(collection(db, "users"), where("uid", "==", data.uid), limit(1));
                const userSnapshot = await getDocs(q);
                await updateDoc(userSnapshot.docs[0].ref, {
                    username: data.username,
                    email: data.email,
                    statusId: data.statusId,
                });
            } else {
                const resp = await createUserWithEmailAndPassword(auth, data.email, data.password || "password");
                await addDoc(collection(db, "users"), {
                    uid: resp.user.uid,
                    username: data.username,
                    email: data.email,
                    statusId: data.statusId,
                })
            }
            setOpen(false);
            getUsers();
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers();
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
            <div className="flex items-center justify-between">
                <div className="text-lg">Admin / Users</div>
                <div className="flex flex-col items-end">
                    <button onClick={() => {
                        reset({
                            uid: "", username: "", email: "", password: "", statusId: 1
                        });
                        setOpen(true);
                    }} className="bg-white duration-300 flex items-center justify-center rounded-full shadow-md h-14 text-blue-950 w-14 hover:bg-slate-100"><FaPlus /></button>
                </div>
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
                className="bg-slate-50 border-8 border-[#f5f4f2] rounded-2xl text-white max-w-[calc(100vw-280px)] overflow-x-auto">
                <table className="table-auto">
                    
                        <thead>
                            <tr>
                                <th className="font-bold px-4 py-2 text-blue-950">Username</th>
                                <th className="font-bold px-4 py-2 text-blue-950">Role</th>
                                <th className="font-bold px-4 py-2 text-blue-950" align="right">Status</th>
                                <th className="font-bold px-4 py-2 text-blue-950" align="right">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map((row, key) => (
                                <tr key={key}>
                                    <td  className="px-4 py-2 text-blue-950">
                                        {row.username}<br/>
                                        <span className="text-gray-500">{row.email}</span>
                                    </td >
                                    <td  className="px-4 py-2 text-blue-950">
                                        <span className="px-3 py-1 bg-yellow-500 rounded-3xl shadow-md text-white">Admin</span>
                                    </td >
                                    <td className="px-4 py-2 text-blue-950" align="right"><div className="flex gap-2 items-center">{statusArr.find(e => e.id === row.statusId)?.name} <Dot colorClass={statusArr.find(e => e.id === row.statusId)?.color || "bg-slate-150"} /></div></td>
                                    <td className="px-4 py-2 text-blue-950" align="right">
                                        <div className="flex gap-2 text-xl">
                                            <button onClick={() => onEdit(row.uid)} className="p-2 rounded-full hover:bg-slate-100"><MdOutlineEdit /></button>
                                            <button onClick={() => {}} className="p-2 rounded-full hover:bg-slate-100"><MdOutlineDelete /></button>
                                        </div>
                                    </td >
                                </tr>
                            ))
                            }
                        </tbody >
                    
                </table>
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
        <Drawer
            anchor="bottom"
            open={open}
        >
            <div className="bg-[#f5f4f2] flex flex-col gap-6 items-center p-4">
                <h1>{getValues("uid") !== "" ? "Edit" : "Create New"} User</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[300px]">
                    <TextField className="w-full" label="Username" error={!!errors.username} helperText={errors.username?.message}
                        {...register("username",
                            {
                                required: "Username is required",
                            })
                        }
                    />
                    <TextField className="w-full" label="Email" error={!!errors.email} helperText={errors.email?.message}
                        {...register("email",
                            {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Please enter email format",
                                },
                            })
                        }
                    />
                    {getValues("uid") === "" &&
                        <TextField className="w-full" label="Password" error={!!errors.password} helperText={errors.password?.message}
                            {...register("password",
                                {
                                    required: "Password is required",
                                })
                            }
                        />
                    }
                    <Controller
                        name="statusId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="w-full"
                            >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>Inactive</MenuItem>
                            </Select>
                        )}
                    />
                    <div className="flex gap-4 w-full">
                        <button type="submit" className="border-2 border-[#d0c7c1] bg-[#d0c7c1] duration-300 font-bold focus:border-[inherit] focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-[#d0c7c1]/90 py-2 rounded-3xl shadow-md text-white w-full">SAVE</button>
                        <button type="button" onClick={() => setOpen(false)} className="border-2 border-[#d0c7c1] bg-white duration-300 font-bold focus:border-slate-50 focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-slate-50 py-2 rounded-3xl shadow-md text-[#d0c7c1] w-full">CLOSE</button>
                    </div>
                </form>
            </div>
        </Drawer>
    </main>)
}

export default Users;