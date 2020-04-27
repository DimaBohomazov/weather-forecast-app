import {combineReducers} from "redux"
import weathersReducer from "./weathers"

export default combineReducers({
    weathers: weathersReducer
})