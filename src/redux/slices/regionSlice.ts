import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Region{
    name:string;
    id:number;
}

export interface RegionState{
    value:Region[];
}

const initialState:RegionState = {
    value:[]
}

export const regionSlice = createSlice({
    name:'region',
    initialState,
    reducers:{
        loadRegions: (state,action:PayloadAction<Region[]>)=>{
            state.value= action.payload;
        },
        clearRegions:(state)=>{
            state.value= [];
        }
    }
})

export const {loadRegions,clearRegions} = regionSlice.actions
export default regionSlice.reducer;