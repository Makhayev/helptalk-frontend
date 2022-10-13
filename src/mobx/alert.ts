import { makeAutoObservable } from "mobx";

type alertTypes = "error" | "success";

class alert {
  isOpen: boolean = false;
  TTL: number = 0;
  type: alertTypes = "error";
  message: string = "error";
  constructor() {
    makeAutoObservable(this);
  }

  openAlert(TTL: number, type: alertTypes, message: string) {
    this.isOpen = true;
    this.TTL = TTL;
    this.type = type;
    this.message = message;
    setTimeout(() => {
      this.isOpen = false;
      this.TTL = 0;
      this.type = "error";
      this.message = "error";
    }, TTL);
  }
}

export default new alert();
