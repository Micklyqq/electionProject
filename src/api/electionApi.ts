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
export const addVote = async (electionID:number,userID:number,candidateID:number)=>{
 const {data} = await $authHost.post("/api/election/vote",{
  userID,
  candidateID,
  electionID
 })
 return data;


}

export const getVote = async(userID:number,electionID:number)=>{
  const {data} = await $authHost.get("/api/election/getVote",{
    params:{
      userID:userID,
      electionID:electionID
    }
  })
  return data;
}

export const createElection = async(title:string,description:string,regionID:number,date:string)=>{
  const {data} = await $authHost.post('/api/election/create',{
    title,
    description,
    regionID,
    date
  })
  return data;
}