export default interface UserType {
  name: string;
  surname: string;
  email: string;
  id: string;
  balance: number;
  role: "admin" | "specialist" | "patient";
  isAuth: boolean;
}
