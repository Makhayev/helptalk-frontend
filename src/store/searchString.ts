import { makeAutoObservable } from "mobx";
import search from "../pages/Search";

class SearchString {
  search: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setSearchString(str: string) {
    this.search = str;
  }

  clearSearchString() {
    this.search = "";
  }
}

export default new SearchString();
