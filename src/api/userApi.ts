import { User } from "../redux/slices/userSlice";
import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email:string, password:string,regionID:number) => {
  const { data } = await $host.post("api/user/reg", {
    email,
    password,
    regionID
  });
 localStorage.setItem("token",data.token) 
 return jwtDecode(data.token) as User;
//   localStorage.setItem("token", data.token);
//   return jwtDecode(data.token);
};

export const login = async (email:string, password:string) => {
  const { data } = await $host.post("api/user/auth", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token) as User;
};

export const check = async () => {
  try {
    const { data } = await $authHost.get("api/user/checkAuth");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token) as User;
  } catch (e) {
    localStorage.removeItem('token');
    return false;
  }
};
