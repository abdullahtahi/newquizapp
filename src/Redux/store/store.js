import { configureStore,combineReducers } from "@reduxjs/toolkit";
import getquizquestion  from "../Dispatch/getquizquestion"
const reducer=combineReducers({
    getquestion:getquizquestion
})


export const store=configureStore({
    reducer
}) 