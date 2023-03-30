import { makeAutoObservable } from "mobx";
import UserType from "../types/User";
import api from "../api/AxiosInstance";
class User {
  name: string = "";
  surname: string = "";
  id: string = "";
  email: string = "";
  isAuth: boolean = false;
  balance: number = 0;
  pageToRedirect: string = "/";
  role: "admin" | "specialist" | "patient" | "" = "";
  avatar: string | null = null;
  constructor() {
    makeAutoObservable(this);
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) {
      api
        .get(`/loginByAccessToken`)
        .then((response) => {
          const { first_name, last_name, role, email, id, balance } =
            response?.data;
          if (
            first_name &&
            role &&
            email &&
            last_name &&
            balance !== undefined
          ) {
            this.assignUser({
              name: first_name,
              surname: last_name,
              id: id,
              balance: balance,
              role: role,
              email: email,
              isAuth: true,
            } as UserType);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  assignPageToRedirect(path: string) {
    this.pageToRedirect = path;
  }
  logOutUser() {
    this.name = "";
    this.surname = "";
    this.id = "";
    this.isAuth = false;
    this.pageToRedirect = "/";
    localStorage.removeItem("accessToken");
  }
  assignUser(user: UserType) {
    this.name = user.name;
    this.surname = user.surname;
    this.id = user.id;
    this.isAuth = true;
    this.balance = user.balance;
    this.email = user.email;
    this.role = user.role;
    this.pageToRedirect =
      this.pageToRedirect !== "/" ? this.pageToRedirect : "/";
  }
}
export default new User();
