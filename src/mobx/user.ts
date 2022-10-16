import { makeAutoObservable } from "mobx";
import UserType from "../types/User";

class User {
  name: string = "";
  surname: string = "";
  id: number = 0;
  isAuth: boolean = false;
  pageToRedirect: string = "/";
  constructor() {
    makeAutoObservable(this);
  }

  assignPageToRedirect(path: string) {
    this.pageToRedirect = path;
  }

  assignUser(user: UserType) {
    this.name = user.name;
    this.surname = user.surname;
    this.id = user.id;
    this.isAuth = true;
    this.pageToRedirect =
      this.pageToRedirect !== "/" ? this.pageToRedirect : "/";
  }
}
export default new User();
