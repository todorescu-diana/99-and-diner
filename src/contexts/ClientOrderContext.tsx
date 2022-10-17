import { createContext, ReactNode, useContext, useState } from "react";

export const ClientOrderContext = createContext<
  ReturnType<typeof useClientOrderContextValue>
>(null!);

export type ClientOrderContextValue = {
  orderProducts: {
    productName: string;
    productPrice: number;
    productType: "food" | "drink" | "";
    productQty: number
  }[];
  orderTotalPrice: number;
};

function useClientOrderContextValue() {
  const [clientOrderState, setClientOrderState] =
    useState<ClientOrderContextValue>({
      orderProducts: [],
      orderTotalPrice: 0,
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
