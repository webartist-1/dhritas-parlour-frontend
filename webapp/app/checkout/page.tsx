"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { GrSquare } from 'react-icons/gr'
import { MdAdd, MdRemove } from 'react-icons/md'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createOrder } from '../api'
import Navbar from '../component/Navbar'
import { OrderContext } from '../context/OrderContext'
import ConfirmBottom from './ConfirmBottom'

type Props = {}

interface Details {
    name: string,
    address: string,
    house_number: string,
    post_code: string,
    mobile: string,
    note: string,
    payment_method: string
}

type ParamsObject = {
    [key: string]: string | number | boolean | Array<Object>;
};

export default function Page({ }: Props) {
    const [order, setOrder] = useContext(OrderContext)
    const [totalCost, setTotalCost] = useState<number>()
    const [details, setDetails] = useState<Details>({ name: '', address: '', house_number: '', post_code: '', mobile: '', note: '', payment_method: 'cash_on_delivery' })
    const [hasAllergy, setHasAllergy] = useState<Boolean>(false)
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const notify = (message: string, toastType: string) => {
        const toastConfig: ToastOptions = {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }
        if (toastType == 'error') toast.error(message, toastConfig)
        if (toastType == 'success') toast.success(message, toastConfig)
    };

    const handleIncreaseItem = (itemIdToFind: number) => {
        const tempOrder = [...order];
        const index = tempOrder.findIndex(item => item.menu_item_id === itemIdToFind);

        if (index !== -1) {
            // If the item is found, decrease the quantity
            tempOrder[index].quantity += 1;
            console.log(`Decreased quantity of ${itemIdToFind} to ${tempOrder[index].quantity}`);
        } else {
            // If the item is not found, you can handle it accordingly
            console.log(`${itemIdToFind} not found in the array`);
        }

        setOrder(tempOrder)
    }

    const handleDecreaseItem = (itemIdToFind: number) => {
        // Find the index of the item with the specified itemName
        let tempOrder = [...order];
        const index = tempOrder.findIndex(item => item.menu_item_id === itemIdToFind);

        if (index !== -1) {
            // If the item is found, decrease the quantity
            tempOrder[index].quantity -= 1;
            if (tempOrder[index].quantity == 0) {
                tempOrder = [...tempOrder.slice(0, index), ...tempOrder.slice(index + 1)];
            }
        } else {
            // If the item is not found, you can handle it accordingly
            console.log(`${itemIdToFind} not found in the array`);
        }

        setOrder(tempOrder)
    }

    const handleCheckout = () => {
        const allFieldsFilled = Object.values(details).every((value) => value !== '');

        console.log(order)

        if (details.name && details.address && details.house_number && details.post_code && details.mobile) {
            if (order.length > 0) {
                // Call the createOrder function with details
                createOrder({ ...details, items: order } as (Details & ParamsObject))
                    .then((res) => {
                        setOrder([])
                        onOpenModal()
                        // router.push('/');
                    }).catch((error) => {

                    })
            } else {
                notify('Your basket is empty.', 'error')
            }
        } else {
            notify('Please fill in all fields.', 'error')
        }
    }

    const handleModalClose = () => {
        onCloseModal()
        router.push('/');
    }

    useEffect(() => {
        console.log(order)
        const totalPrice = order.reduce((sum, item) => {
            return sum + (item.itemPrice * item.quantity);
        }, 0);
        setTotalCost(totalPrice)

    }, [order])


    return (
        <div>
            <Navbar />
            <div className='mobile-content-body'>
                <div className='container mb-5'>
                    <div className={`modal fade ${open ? "show" : ""}`} tabIndex={-1} role="dialog" style={open ? { display: "block" } : {}}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <Image layout='fill'    src='https://api.meghskitchen.com/storage/gif/orderplaced.gif' alt='order placed' />
                                    </div>
                                    <p className='fs-3 fw-bold text-dark mb-2'>Woohoo, your order is placed!</p>
                                    <p className='text-dark'>We will shortly contact you for order confirmation and the payment </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success text-dark" data-dismiss="modal" onClick={handleModalClose}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />

                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-lg-8'>
                            <div className='card my-3'>
                                <div className='card-header'>
                                    Order Details
                                </div>
                                <div className='card-body'>
                                    <div className='row mb-2'>
                                        <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                            Name
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-8'>
                                            <input
                                                className='form-control'
                                                type='text'
                                                placeholder='Enter your name'
                                                value={details?.name}
                                                onChange={(e) => { setDetails({ ...details, name: e.target.value }) }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                            Address
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-8'>
                                            <input
                                                className='form-control'
                                                type='text'
                                                placeholder='Enter your address'
                                                value={details?.address}
                                                onChange={(e) => { setDetails({ ...details, address: e.target.value }) }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-6 col-md-12 mb-md-2'>
                                            <div className='row'>
                                                <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                                    House Number
                                                </div>
                                                <div className='col-sm-12 col-md-6 col-lg-8'>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        placeholder='House Number'
                                                        value={details?.house_number}
                                                        onChange={(e) => { setDetails({ ...details, house_number: e.target.value }) }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6 col-md-12'>
                                            <div className='row'>
                                                <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                                    Post Code
                                                </div>
                                                <div className='col-sm-12 col-md-6 col-lg-8'>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        placeholder='Post code'
                                                        value={details?.post_code}
                                                        onChange={(e) => { setDetails({ ...details, post_code: e.target.value }) }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                            Mobile
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-8'>
                                            <input
                                                className='form-control'
                                                type='text'
                                                placeholder='Enter your whatapp mobile'
                                                value={details?.mobile}
                                                onChange={(e) => { setDetails({ ...details, mobile: e.target.value }) }}
                                                required
                                            />
                                            <small className='fw-light lh-1'>Please provide whatapp mobile for receiving order status</small>
                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                            Allergy
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-8'>
                                            {/* <label>
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    checked={hasAllergy === true}
                                                    onChange={(e) => handleRadioChange(e)}
                                                />
                                                Yes
                                            </label>
                                            <label className='mx-4'>
                                                <input
                                                    type="radio"
                                                    value="no"
                                                    checked={hasAllergy === false}
                                                    onChange={(e) => handleRadioChange(e)}
                                                />
                                                No
                                            </label> */}
                                            <div className='d-flex'>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={hasAllergy === true} onChange={(e) => setHasAllergy(true)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="form-check mx-4">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={hasAllergy === false} onChange={(e) => setHasAllergy(false)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {hasAllergy && <div className='row mb-2'>
                                        <div className='col-sm-12 col-md-6 col-lg-4 px-3 fw-bold'>
                                            Note (optional)
                                        </div>
                                        <div className='col-sm-12 col-md-6 col-lg-8'>
                                            <input
                                                className='form-control'
                                                type='text'
                                                // placeholder='Enter your name'
                                                value={details?.note}
                                                onChange={(e) => { setDetails({ ...details, note: e.target.value }) }}
                                                required
                                            />
                                            <small className='fw-light lh-1'>If you have a food allergies or intolerance, please inform us when placing your orders</small>
                                        </div>
                                    </div>}
                                    {/* <div className='row px-3 my-2'>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                            <label className="form-check-label">
                                                Cash On Delivery
                                            </label>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-4'>
                            <div className='card my-3'>
                                <div className='card-header'>
                                    {order.length} ITEMS
                                </div>
                                <div className='card-body'>
                                    {
                                        order.map((orderedItem, index) => (
                                            <div className='row align-items-center  my-3' key={index}>
                                                <div className='col-1'>
                                                    <GrSquare color={orderedItem.itemVeg ? "green" : "red"} />
                                                </div>
                                                <div className='col-8'>
                                                    <p className='text-dark fw-bolder mb-0'>{orderedItem.itemName}</p>
                                                    <small>£ {orderedItem.itemPrice}</small>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='row align-items-center border border-danger border-dashed rounded'>
                                                        <div className='col-3'>
                                                            <MdRemove size={10} onClick={(e: any) => handleDecreaseItem(orderedItem.menu_item_id)} />
                                                        </div>
                                                        <div className='col-4'>
                                                            {orderedItem.quantity}
                                                        </div>
                                                        <div className='col-3'>
                                                            <MdAdd size={10} onClick={(e: any) => handleIncreaseItem(orderedItem.menu_item_id)} />
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <p className='text-dark fw-bolder'> £ {(orderedItem.quantity * orderedItem.itemPrice).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmBottom
                handleCheckout={handleCheckout}
            />
        </div>
    )
}