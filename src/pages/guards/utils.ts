import { UserGlobalContextValue } from "../../contexts/UserGlobalContext";

export type CustomFC<T = {}> = (
  p: {
    children?:
      | ((guardPass: UserGlobalContextValue) => React.ReactNode)
      | React.ReactNode;
  } & T
) => JSX.Element;

export const isFunction = (obj: any): obj is Function =>
  typeof obj === "function";
