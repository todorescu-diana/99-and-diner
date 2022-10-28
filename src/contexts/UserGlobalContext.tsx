import { createContext, ReactNode, useContext, useState } from "react";

export const UserGlobalContext = createContext<
  ReturnType<typeof useUserGlobalContextValue>
>(null!);

export type UserGlobalContextValue = {
  id: number;
  email: string;
  password: string;
  role: "manager" | "client" | "";
  firstName: string;
  lastName: string;
};

function useUserGlobalContextValue() {
  const [userGlobalState, setUserGlobalState] =
    useState<UserGlobalContextValue>({
      id: -1,
      email: "",
      password: "",
      role: "",
      firstName: "",
      lastName: "",
    });

  return [userGlobalState, setUserGlobalState] as const;
}

export const UserGlobalContextProvider: any = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userGlobalContext = useUserGlobalContextValue();
  return (
    <UserGlobalContext.Provider value={userGlobalContext}>
      {children}
    </UserGlobalContext.Provider>
  );
};

export function useUserGlobalContext() {
  return useContext(UserGlobalContext);
}
