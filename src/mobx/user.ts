import { makeAutoObservable } from "mobx";
import UserType from "../types/User";
import api from "../api/AxiosInstance";
class User {
  name: string = "";
  surname: string = "";
  id: string = "";
  isAuth: boolean = false;
  pageToRedirect: string = "/";
  role: "admin" | "specialist" | "patient" | "" = "";
  constructor() {
    makeAutoObservable(this);
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) {
      api
        .get(`/loginByAccessToken`)
        .then((response) => {
          const { first_name, last_name, role, email, id } = response?.data;
          if (first_name && role && email && last_name) {
            this.assignUser({
              name: first_name,
              surname: last_name,
              id: id,
              role: role,
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
    this.role = user.role;
    this.pageToRedirect =
      this.pageToRedirect !== "/" ? this.pageToRedirect : "/";
  }
}
export default new User();
