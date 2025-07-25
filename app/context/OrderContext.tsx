"use client"
import React, { SetStateAction, useState, Dispatch, createContext } from "react";

type Props = {
  children: React.ReactNode;
};

type OrderContextType = [any[], Dispatch<SetStateAction<any[]>>];

const initialOrders: any[] = []; // You can replace this with your actual initial state

export const OrderContext = createContext<OrderContextType>([initialOrders, () => { }]);

function OrderContextWrapper({ children }: Props) {
  const [order, setOrder] = useState<any[]>([]);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContextWrapper;
