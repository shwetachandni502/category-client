import axios from "axios";
import { server } from "../config/keys";

export const categoryInstance = axios.create({
  baseURL: `${server}/category`,
});
