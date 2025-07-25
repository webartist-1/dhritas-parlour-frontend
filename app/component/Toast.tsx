// Toast.js
"use client";

import React, { useEffect } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    message: string;
    toastType: string;
    toNotify: boolean;
    onClose: () => void; // Add onClose prop of type function
};

function Toast({ message, toastType, toNotify, onClose }: Props) {
    const notify = React.useCallback((message: string, toastType: string) => {
        const toastConfig: ToastOptions = {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        };
        if (toastType === 'error') toast.error(message, { ...toastConfig, onClose });
        if (toastType === 'success') toast.success(message, { ...toastConfig, onClose });
        if (toastType === 'warning') toast.warning(message, { ...toastConfig, onClose });

    }, [onClose]);

    useEffect(() => {
        if (toNotify) {
            notify(message, toastType);
        }
    }, [toNotify, message, toastType, notify]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default Toast;
