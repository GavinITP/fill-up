"use client"
import ReportIcon from '@mui/icons-material/Report';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

export default function ReportModal() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true); 
    const handleClose = (event: Event, reason: "backdropClick") => {setOpen(false)};

    return (
        <div className="flex gap-2 text-gray-300">
            <span className="cursor-pointer" onClick={handleOpen}><ReportIcon />รายงานปัญหา</span>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                sx={{
                    display: 'flex',
                    p: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                container={() => rootRef.current!} // what is this? ans: rootRef is a ref to the root element of the component that you want to render the modal in 
            >
                <Fade in={open}>
                    <Box
                        sx={{ bgcolor: 'background.paper', m: 1, p: 3, borderRadius: '10px' }} 
                        className="flex flex-col gap-3 w-4/5 max-w-2xl"
                    >
                        <h1 className="text-left text-4xl font-black text-[#01579B] mb-5">รายงานปัญหา<ErrorOutlineIcon fontSize='large' className='ml-1'/></h1>
                        <p className="text-left text-gray-500">ระบุปัญหาที่พบเกี่ยวกับตู้กดน้ำ</p>
                        <textarea className="w-full h-36 p-2 border-2 border-gray-300 rounded-lg" placeholder="ระบุปัญหาที่พบ"></textarea>
                        <div className='flex justify-end text-base text-white mt-5'>
                            <button
                                className="bg-gray-400 px-2 py-1 rounded-md mr-2"
                            >
                                <p>ยกเลิก</p>
                            </button>
                            <button
                                className="bg-blue-500 px-2 py-1 rounded-md"
                            >
                                <p>ส่งรายงาน</p>
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}