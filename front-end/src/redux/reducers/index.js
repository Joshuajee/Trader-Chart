import assetReducer from './assets';
import { ASSETS, INDICATORS, SIDENAV } from "../constants/action-types";


const initialState = {
    indicators: [],
    sideNav: false,
    assets: {}
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case INDICATORS:
            return { ...state, indicators: payload }
        case SIDENAV:
            return { ...state, sideNav: payload }
        case ASSETS:
            return { ...state, assets: assetReducer(state, payload) }
        default:
            return state
    }
};
  

export default rootReducer;