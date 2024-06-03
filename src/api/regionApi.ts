import {$authHost, $host } from "./index";

export const getRegion = async () => {
  const { data } = await $authHost.get("api/region/getAll");
  return data;
};
export const getOneRegion = async ()=>{
  const {data} = await $authHost.get("api/region/getOne");
  return data;
}

