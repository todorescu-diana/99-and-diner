import { createContext, FC, ReactNode, useContext, useState } from "react";

export const UserGlobalContext = createContext<
  ReturnType<typeof useUserGlobalContextValue>
>(null!);

type UserGlobalContextValue = {
  email: string;
  password: string;
};

function useUserGlobalContextValue() {
  const [userGlobalState, setUserGlobalState] =
    useState<UserGlobalContextValue>({
      email: "",
      password: "",
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
