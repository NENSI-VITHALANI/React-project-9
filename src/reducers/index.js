import { combineReducers } from "redux";

import Crud from "./Crud";

const rootReducer = combineReducers({
  
    crud : Crud
})

export default rootReducer;