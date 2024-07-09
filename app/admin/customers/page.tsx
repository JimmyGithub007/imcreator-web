"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDragIndicator, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, MenuItem, Select, TextField } from "@mui/material";
import { db, sdb } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { RootState } from "@/store";

import Image from "next/image";

type customer = {
    id: string,
    sortingId: number,
    name: string,
    statusId: number,
    logoUrl: string,
    dateCreated: string,
}

const statusArr = [
    { id: 0, name: "Draft", color: "bg-slate-300" },
    { id: 1, name: "Active", color: "bg-emerald-400" },
];

const Dot = ({ colorClass }: { colorClass: string }) => {
    return <span className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colorClass}`}></span>
    </span>
}

type Inputs = {
    name: string,
    statusId: number,
    logoUrl: "",
}

const Customers = () => {
    const dispatch = useDispatch();
    const [rows, setRows] = useState<customer[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const uploadRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, formState: { errors }, setError, reset, control } = useForm<Inputs>({
        defaultValues: {
            name: "",
            statusId: 1,
        }
    });

    const onDone = () => {
        setOpen(false);
        reset({
            name: "",
            statusId: 1,
        });
        setSelectedImage(null);
        setImageFile(null);
        setEditId(null);
        getCustomers();
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        if (!editId && !imageFile) {
            setError("logoUrl", { type: "manual", message: "Please select an image." });
            return;
        }

        try {
            if (imageFile) {
                const imageRef = ref(sdb, `customers/${imageFile.name}`);
                const uploadTask = uploadBytesResumable(imageRef, imageFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Can use this to show progress if needed
                    },
                    (error) => {
                        console.error(error);
                    },
                    async () => {
                        const logoUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        if (editId) {
                            // Update existing customer
                            const customerDoc = doc(db, "customers", editId);
                            await updateDoc(customerDoc, {
                                name: data.name,
                                statusId: Number(data.statusId),
                                logoUrl: logoUrl,
                            });
                        } else {
                            // Add new customer
                            await addDoc(collection(db, "customers"), {
                                name: data.name,
                                statusId: Number(data.statusId),
                                logoUrl: logoUrl,
                                sortingId: rows.length, // New item at the end
                                dateCreated: new Date()
                            });
                        }
                        onDone();
                    }
                );
            } else if (!imageFile && editId) {
                const customerDoc = doc(db, "customers", editId);
                await updateDoc(customerDoc, {
                    name: data.name,
                    statusId: Number(data.statusId),
                });
                onDone();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onEdit = (row: customer) => {
        setEditId(row.id);
        setSelectedImage(row.logoUrl);
        reset({
            name: row.name,
            statusId: row.statusId,
        })
        setOpen(true);
    }

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteId) {
            const customerDoc = doc(db, "customers", deleteId);
            await deleteDoc(customerDoc);
            setRows(rows.filter((row) => row.id !== deleteId));
            setDeleteDialogOpen(false);
            setDeleteId(null);
        }
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return;
        const items = Array.from(rows);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update the sortingId for all items
        const updatedRows = items.map((item, index) => ({ ...item, sortingId: index }));
        setRows(updatedRows);

        // Update Firestore with new sortingIds
        for (const item of updatedRows) {
            const customerDoc = doc(db, "customers", item.id);
            await updateDoc(customerDoc, { sortingId: item.sortingId });
        }
    };

    const getCustomers = async () => {
        const customerQuery = await getDocs(query(collection(db, "customers"), orderBy("sortingId"))); // updated
        const customers = customerQuery.docs.map(async (doc) => {
            const b = doc.data();
            return {
                id: doc.id,
                sortingId: b.sortingId,
                name: b.name,
                statusId: b.statusId,
                logoUrl: b.logoUrl,
                dateCreated: b.dateCreated?.toDate().toDateString(),
            };
        });
        const resolvedCustomers = await Promise.all(customers);
        console.log(resolvedCustomers)
        setRows(resolvedCustomers);
    };

    useEffect(() => {
        getCustomers();
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
                <div className="text-lg">Admin / Customers</div>
                <div className="flex flex-col items-end">
                    <button onClick={() => {
                        reset({
                            name: "", statusId: 1
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
                            <th className="font-bold px-4 py-2 text-blue-950">Sorting</th>
                            <th className="font-bold px-4 py-2 text-blue-950" align="left">Customer name</th>
                            <th className="font-bold px-4 py-2 text-blue-950" align="center">Customer logo</th>
                            <th className="font-bold px-4 py-2 text-blue-950" align="right">Status</th>
                            <th className="font-bold px-4 py-2 text-blue-950" align="right">Date created</th>
                            <th className="font-bold px-4 py-2 text-blue-950">Action</th>
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="customers" type="group">
                            {(provided) => (
                                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                    {rows.map((row, index) =>
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <tr ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                    <td className="px-4 py-2 text-blue-950"><div className="duration-300 flex items-center justify-center cursor-move hover:bg-slate-100 rounded-full h-8 w-8 text-xl"><MdDragIndicator /></div></td>
                                                    <td className="px-4 py-2 text-blue-950" align="left">{row.name}</td>
                                                    <td className="px-4 py-2 text-blue-950" align="center"><Image alt="" height={50} width={50} src={row.logoUrl} /></td>
                                                    <td className="px-4 py-2 text-blue-950" align="right"><div className="flex gap-2 items-center">{statusArr.find(e => e.id === row.statusId)?.name} <Dot colorClass={statusArr.find(e => e.id === row.statusId)?.color || "bg-slate-150"} /></div></td>
                                                    <td className="px-4 py-2 text-blue-950" align="right">{row.dateCreated}</td>
                                                    <td className="px-4 py-2 text-blue-950">
                                                        <div className="flex gap-2 text-xl">
                                                            <button onClick={() => onEdit(row)} className="p-2 rounded-full hover:bg-slate-100"><MdOutlineEdit /></button>
                                                            <button onClick={() => handleDeleteClick(row.id)} className="p-2 rounded-full hover:bg-slate-100"><MdOutlineDelete /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                    </DragDropContext>
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
                <h1>{editId ? "Edit" : "Create New"} Customer</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center w-[300px]">
                    <div id="uploadImageBox" onClick={() => {
                        if (uploadRef.current) {
                            uploadRef.current.click();
                        }
                    }} className="bg-slate-100 border-2 border-dashed cursor-pointer flex flex-col items-center justify-center h-[300px] overflow-hidden rounded-2xl shadow-sm w-[300px]">
                        {selectedImage ? (
                            <Image src={selectedImage} alt="Selected Image" height={300} width={300} className="object-cover" />
                        ) : (
                            <>
                                <IoCloudUploadOutline className="text-5xl text-slate-200" />
                                <div className="text-center">Please upload customer logo</div>
                            </>
                        )}
                        <input accept="image/*" ref={uploadRef} onChange={onFileChange} type="file" hidden />
                    </div>
                    <div className="flex h-2 items-center">{ !!errors.logoUrl && <span className="text-red-600 text-xs">*{errors.logoUrl?.message}</span> }</div>
                    <TextField className="w-full" label="Name" error={!!errors.name} helperText={errors.name?.message}
                        {...register("name",
                            { required: "Customer name is required", })
                        }
                    />
                    <Controller
                        name="statusId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="w-full"
                            >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>Draft</MenuItem>
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
        <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
        >
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this customer?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </main>)
}

export default Customers;