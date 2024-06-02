import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const getRegion = async () => {
  const { data } = await $host.post("api/region/getAll");
  return data;
};

