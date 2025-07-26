// FixedBottomDiv.js

import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'


import burger from '../assests/menu/categoryBuger.png'
import { MdOutlineDining } from 'react-icons/md'
import { Poppins } from 'next/font/google'
import { OrderContext } from '../context/OrderContext'

const poppins = Poppins({
    weight: ['300'],
    subsets: ['latin'],
    display: 'swap',
})

type Props = {
    handleCheckout: () => void
}

export default function ConfirmBottom({ handleCheckout }: Props) {
    const [order, setOrder] = useContext(OrderContext)
    const [totalCost, setTotalCost] = useState<number>()

    useEffect(() => {
        console.log(order)
        const totalPrice = order.reduce((sum, item) => {
            return sum + (item.itemPrice * item.quantity);
        }, 0);
        setTotalCost(totalPrice)

    }, [order])

    return (
        <div className="fixed-checkout-bottom-sm text-light">
            <div className='container'>
                <div className='row align-item-center'>
                    {/* <div className='col-2'>
                        <MdOutlineDining size={40} />
                    </div> */}
                    <div className='col-6 align-item-start'>
                        <p className={`fs-2 fw-bolder order-price ${poppins.className}`}>£ {totalCost?.toFixed(2)}</p>
                        <small className={`${poppins.className}`}>Total</small>
                    </div>
                    <div className='col-6 d-flex align-item-start justify-content-end'>
                        {/* <small className={`${poppins.className}`}>2 Items in cart</small> */}
                        <button className={`btn order-btn`} onClick={handleCheckout}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

