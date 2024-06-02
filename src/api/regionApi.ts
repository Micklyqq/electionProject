import {$host } from "./index";

export const getRegion = async () => {
  const { data } = await $host.get("api/region/getAll");
  return data;
};

