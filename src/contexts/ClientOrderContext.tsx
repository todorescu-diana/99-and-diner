import { createContext, ReactNode, useContext, useState } from "react";

export const ClientOrderContext = createContext<
  ReturnType<typeof useClientOrderContextValue>
>(null!);

export type ClientOrderContextValue = {
  order_products: {
    product_name: string;
    product_price: number;
    product_type: "food" | "drink" | "";
    product_qty: number;
  }[];
  order_total_price: number;
  order_notes: string;
};

function useClientOrderContextValue() {
  const [clientOrderState, setClientOrderState] =
    useState<ClientOrderContextValue>({
      order_products: [],
      order_total_price: 0,
      order_notes: "",
    });

  return [clientOrderState, setClientOrderState] as const;
}

export const ClientOrderContextProvider: any = ({
  children,
}: {
  children: ReactNode;
}) => {
  const clientOrderContext = useClientOrderContextValue();
  return (
    <ClientOrderContext.Provider value={clientOrderContext}>
      {children}
    </ClientOrderContext.Provider>
  );
};

export function useClientOrderContext() {
  return useContext(ClientOrderContext);
}
