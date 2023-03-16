export default interface UserType {
  name: string;
  surname: string;
  email: string;
  id: string;
  balance: number;
  avatar: string | null;
  role: "admin" | "specialist" | "patient";
  isAuth: boolean;
}
