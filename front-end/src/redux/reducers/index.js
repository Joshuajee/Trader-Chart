import assetReducer from './assets';
import { SIDENAV, ASSETS, INDICATORS, UPDATE_INDICATOR } from "../constants/action-types";
import indicatorReducer, { updateIndicator } from './indicator';


const initialState = {
    indicators: { },
    sideNav: false,
    assets: {}
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case SIDENAV:
            return { ...state, sideNav: payload }
        case ASSETS:
            return { ...state, assets: assetReducer(state, payload) }
        case INDICATORS:
            return { ...state, indicators: indicatorReducer(state, payload) }
        case UPDATE_INDICATOR:
            return { ...state, indicators: updateIndicator(state, payload) }
        default:
            return state
    }
};
  

export default rootReducer;