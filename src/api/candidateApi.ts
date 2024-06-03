import {$authHost, $host } from "./index";
import {Election} from "../interfaces/Election";
import { Candidate } from "../interfaces/Candidate";
export const getAllCandidates= async (electionID:number) => {
  const { data } = await $authHost.get("api/candidate/getAll/"+electionID);
  return data as Candidate[];
};

export const createCandidate = async (fullname:string,description:string,electionID:number,party:string) =>{
  const {data} = await $authHost.post('api/candidate/create',{
    fullname,
    description,
    electionID,
    party
  })
  return data;
}
