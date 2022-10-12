import { makeAutoObservable } from "mobx";
import UserType from "../types/User";

class User {
  name: string = "";
  surname: string = "";
  id: number = 0;
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  assignUser(user: UserType) {
    this.name = user.name;
    this.surname = user.surname;
    this.id = user.id;
    this.isAuth = true;
  }
}
export default new User();
