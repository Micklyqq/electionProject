import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email:string, password:string,regionID:number) => {
  const { data } = await $host.post("api/user/reg", {
    email,
    password,
    regionID
  });
  return data;
//   localStorage.setItem("token", data.token);
//   return jwtDecode(data.token);
};

export const login = async (email:string, password:string) => {
  const { data } = await $host.post("api/user/auth", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  try {
    const { data } = await $authHost.get("api/user/checkAuth");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (e) {
    return false;
  }
};
