import React from "react";

import { CustomFC, isFunction } from "./utils";

export const AuthGuard: CustomFC = ({ children }) => {
  const [{ user }] = useGlobalContext();

  return <>{isFunction(children) ? children(user) : children}</>;
};
function useGlobalContext(): [{ user: any }] {
  throw new Error("Function not implemented.");
}
