import axios from "axios";
import { useUserGlobalContext } from "../contexts/UserGlobalContext";
import { User } from "../models/User";

export function useLogin() {
  // const loading = useLoading();
  const [, setUserGlobalState] = useUserGlobalContext();

  async function doLogin(
    signInData: {
      email: string;
      password: string;
    },
    msg?: string,
    delayMs = 1000
  ) {
    try {
      const res = await axios.get("http://localhost:3002/api/get");
      const { data } = await res;
      const allUsers: User[] = data;

      const currentUserInDatabase = allUsers.find(
        (user) => user.user_email === signInData.email
      );

      return await currentUserInDatabase;
    } catch (err) {
      console.log(err);
    }
    // const [, userData] = await loading(
    //   Promise.all([delay(delayMs), postApiUserLogin(signIn)]),
    //   msg,
    // );
  }

  return { doLogin };
}
