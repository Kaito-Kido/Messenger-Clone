import axios from "axios";
import { refresh } from "./auth";

export const getUser = async () => {
  try {
    // refresh();
    await axios.get(`/user`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
