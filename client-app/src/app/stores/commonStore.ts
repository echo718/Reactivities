import { reaction } from "mobx";
import { ServerError } from "../models/serverError";
import ActivityStore from "./activityStore";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | undefined | null = localStorage.getItem("jwt");
  appLoaded = true;

  constructor() {
    makeAutoObservable: new ActivityStore();

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken(token: string | undefined | null) {
    if (token) localStorage.setItem("jwt", token);
    this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = !this.appLoaded;
  };
}
