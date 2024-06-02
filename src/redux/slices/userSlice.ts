import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User{
    email:string | undefined,
    id:number | undefined,
    role:string | undefined,
    regionID:number | undefined
}

export interface UserState{
    value:User;
}

const initialState:UserState= {
    value:{
        id: undefined,
        email:undefined,
        role:undefined,
        regionID:undefined
    }
}

export const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        loadUser: (state,action:PayloadAction<User>)=>{
            state.value= action.payload;
        },
        clearUser:(state)=>{
        state.value= {
        id: undefined,
        email:undefined,
        role:undefined,
        regionID:undefined
    };
        }
    }
})

export const {loadUser,clearUser} = userSlice.actions
export default userSlice.reducer;