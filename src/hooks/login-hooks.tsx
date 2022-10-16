import { useUserGlobalContext } from "../contexts/UserGlobalContext";

export function useLogin() {
  // const loading = useLoading();
  const [, setGlobalState] = useUserGlobalContext();

  async function doLogin(
    signInData: {
      email: string;
      password: string;
    },
    msg?: string,
    delayMs = 1000
  ) {
    // const [, userData] = await loading(
    //   Promise.all([delay(delayMs), postApiUserLogin(signIn)]),
    //   msg,
    // );
    setGlobalState({
      email: signInData.email,
      password: signInData.password,
      role: "client",
      firstName: "example firstName",
      lastName: "example lastName",
    });

    // return userData;
  }

  return { doLogin };
}
