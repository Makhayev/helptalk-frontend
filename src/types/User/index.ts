export default interface UserType {
  name: string;
  surname: string;
  id: number;
  role: "admin" | "specialist" | "patient";
  isAuth: boolean;
}
