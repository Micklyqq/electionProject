import { useEffect } from "react"
import { Region } from "../redux/slices/regionSlice";
import { getRegion } from "../api/regionApi";
import { useDispatch } from "react-redux";
import { loadRegions } from "../redux/slices/regionSlice";

export default function DataLoader(){
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async ()=>{
    try {
const data:Region[] = await getRegion(); 
if(data.length>0){
dispatch(loadRegions(data));
}
    } catch (error) {
     console.log(error);   
    }
    }
    fetchData();
  }, [])
  
  return (
<>
</>
  )
}