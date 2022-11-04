import axios from "axios";
import { User } from "../models/User";

export function useLogin() {
  async function doLogin(signInData: { email: string; password: string }) {
    try {
      const res = await axios.get("http://localhost:3002/api/get");
      const { data } = await res;
      const allUsers: User[] = data;

      const currentUserInDatabase = allUsers.find(
        (user) =>
          user.user_email === signInData.email &&
          user.user_password === signInData.password
      );

      return await currentUserInDatabase;
    } catch (err) {
      console.log(err);
    }
  }

  return { doLogin };
}
