import assetReducer from './assets';
import { ASSETS, INDICATORS, SIDENAV } from "../constants/action-types";
import indicatorReducer from './indicator';


const initialState = {
    indicators: { },
    sideNav: false,
    assets: {}
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case INDICATORS:
            return { ...state, indicators: indicatorReducer(state, payload) }
        case SIDENAV:
            return { ...state, sideNav: payload }
        case ASSETS:
            return { ...state, assets: assetReducer(state, payload) }
        default:
            return state
    }
};
  

export default rootReducer;