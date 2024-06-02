import { configureStore } from "@reduxjs/toolkit";
import regionReduces from "./slices/regionSlice"
import userReducer from "./slices/userSlice"
export const store = configureStore({
    reducer:{ regions:regionReduces,users:userReducer},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;