import assetReducer from './assets';
import { SIDENAV, ASSETS, INDICATORS, UPDATE_INDICATOR, NAVS } from "../constants/action-types";
import indicatorReducer, { updateIndicator } from './indicator';

const indicator = localStorage.getItem('indicators')

const initialState = {
    indicators: indicator? JSON.parse(indicator): {},
    sideNav: false,
    assets: {},
    navs: []
};
  
function rootReducer(state = initialState, action) {

    console.log("Action Type", action.type)

    const payload = action.payload

    switch (action.type) {
        case NAVS:
            return { ...state, navs: payload }
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