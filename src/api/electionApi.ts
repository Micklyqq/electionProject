import {$authHost, $host } from "./index";
import {Election} from "../interfaces/Election";
export const getElections = async (regionID:number) => {
  const { data } = await $authHost.get("api/election/getAll/"+regionID);
  return data as Election[];
};
export const getOneElection = async (electionID:number) => {
  const { data } = await $authHost.get("api/election/getOne/"+electionID);
  return data as Election;
};
