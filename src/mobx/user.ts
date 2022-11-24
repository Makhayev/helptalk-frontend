import { makeAutoObservable } from "mobx";
import UserType from "../types/User";
class User {
  name: string = "";
  surname: string = "";
  id: number = 0;
  isAuth: boolean = false;
  pageToRedirect: string = "/";
  role: "admin" | "specialist" | "patient" | "" = "";
  constructor() {
    makeAutoObservable(this);
    // TODO: fetch verify JWT on backend and login user if ok
  }

  assignPageToRedirect(path: string) {
    this.pageToRedirect = path;
  }
  logOutUser() {
    (this.name = ""), (this.surname = ""), (this.id = 0), (this.isAuth = false);
    this.pageToRedirect = "/";
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
