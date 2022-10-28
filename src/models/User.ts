export interface User {
  user_id: number;
  user_email: string;
  user_password: string;
  user_role: "manager" | "client" | "";
  user_first_name: string;
  user_last_name: string;
}
