export default interface UserType {
  name: string;
  surname: string;
  id: string;
  role: "admin" | "specialist" | "patient";
  isAuth: boolean;
}
