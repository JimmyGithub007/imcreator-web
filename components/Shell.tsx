"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lobster } from "next/font/google";
import { AiFillProduct } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { LuContact } from "react-icons/lu";
import { MdDashboard, MdMailOutline, MdOutlineColorLens, MdOutlineRequestQuote } from "react-icons/md";
import { TbUserSquareRounded, TbUsers } from "react-icons/tb";
import Image from "next/image";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { SiTarget } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { PiStepsBold } from "react-icons/pi";

const lobster = Lobster({ subsets: ["latin"], weight: '400' });

const Shell = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [ page, setPage ] = useState<string>("dashboard");
    const [ open, setOpen ] = useState<boolean>(false);

    const changePage = (pageName: string) => {
        setPage(pageName);
        router.push(`/admin/${pageName}`);
    }

    const Logout = () => {
        signOut(auth).then(() => {
            router.push("/admin/login");
        })
    }

    useEffect(() => {
        if(pathname) {
            setPage(pathname.replace("/admin/", ""));
        }
    }, [pathname])

    if (pathname == "/" || pathname.includes("/quotation") || pathname == "/admin/login") return children;

    return (<motion.div className="bg-[#f5f4f2] flex items-center">
        <motion.div
            initial={{
                opacity: 0,
                x: -50,
            }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.5,
                }
            }}
            className="bg-slate-50 fixed flex flex-col gap-8 h-screen items-center px-4 py-8 text-blue-950 top-0 w-64 z-50 overflow-y-auto">
            <div className="flex flex-col">
                <Image alt="" height={100} width={100} src={`/assets/logo/logo.png`} />
                <div className={`text-xl ${lobster.className}`}>Admin Panel</div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {/*<button onClick={() => page !== "dashboard" && changePage("dashboard")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "dashboard" ? "border-l-4" : "hover:border-l-4"}`}><MdDashboard />Dashboard</button>*/}
                {/*<div>Products Setting</div>
                <button onClick={() => page !== "quotations" && changePage("quotations")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "quotation" ? "border-l-4" : "hover:border-l-4"}`}><MdOutlineRequestQuote />Quotations</button>
                <button onClick={() => page !== "colors" && changePage("colors")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "colors" ? "border-l-4" : "hover:border-l-4"}`}><MdOutlineColorLens />Colors</button>
                <button onClick={() => page !== "products" && changePage("products")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "products" ? "border-l-4" : "hover:border-l-4"}`}><AiFillProduct />Products</button>*/}
                <button onClick={() => {}} className={`cursor-not-allowed flex font-bold gap-2 items-center px-4 py-2 text-slate-300`}><MdMailOutline />Mailbox</button>
                <button onClick={() => {}} className={`cursor-not-allowed flex font-bold gap-2 items-center px-4 py-2 text-slate-300`}><MdOutlineRequestQuote />Quotation</button>
                <div>Landing Page Setting</div>
                <button onClick={() => page !== "banners" && changePage("banners")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "banners" ? "border-l-4" : "hover:border-l-4"}`}><RiAdvertisementFill />Banners</button>
                <button onClick={() => page !== "customers" && changePage("customers")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "customers" ? "border-l-4" : "hover:border-l-4"}`}><SiTarget />Customers</button>
                <button onClick={() => page !== "services" && changePage("services")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "services" ? "border-l-4" : "hover:border-l-4"}`}><GrServices />Services</button>
                <button onClick={() => page !== "ordersteps" && changePage("ordersteps")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "ordersteps" ? "border-l-4" : "hover:border-l-4"}`}><PiStepsBold />Order steps</button>
                <button onClick={() => page !== "contact" && changePage("contact")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "contact" ? "border-l-4" : "hover:border-l-4"}`}><LuContact />Contact</button>
                <div>Admin Setting</div>
                <button onClick={() => page !== "users" && changePage("users")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "users" ? "border-l-4" : "hover:border-l-4"}`}><TbUsers />Users</button>
                <button onClick={() => page !== "profile" && changePage("profile")} className={`duration-300 flex font-bold gap-2 items-center px-4 py-2 border-blue-950 ${page == "profile" ? "border-l-4" : "hover:border-l-4"}`}><TbUserSquareRounded />My Profile</button>
            </div>
            <button type="button" onClick={() => setOpen(true) } className="border-2 border-[#d0c7c1] bg-[#d0c7c1] duration-300 font-bold focus:border-slate-50 focus:outline-none focus:ring-[#d0c7c1] focus:ring-2 hover:bg-[#d0c7c1]/90 py-2 rounded-3xl shadow-md text-white w-full">Sign out</button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm Logout
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">No</Button>
                    <Button onClick={() => Logout()} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </motion.div>
        <div className="flex flex-col h-screen items-center overflow-y-auto pl-64 w-screen">
            {children}
        </div>
    </motion.div>)
}

export default Shell;