import { NAVS, ASSETS, INDICATORS, SIDENAV, UPDATE_INDICATOR } from "../constants/action-types";

export function updateNavs(payload) {
  console.log("update navs", payload)
  return { type: NAVS, payload };
}

export function showSideNav(payload) {
  console.log("Show Side Navigator", payload)
  return { type: SIDENAV, payload };
}

export function updateAssets(payload) {
  console.log("Update Assets", payload)
  return { type: ASSETS, payload };
}

export function addIndicator(payload) {
  console.log("Add Indicator", payload)
  return { type: INDICATORS, payload };
}

export function updateIndicator(payload) {
  console.log("Update Indicator", payload)
  return { type: UPDATE_INDICATOR, payload };
}

export function deleteIndicator(payload) {
  console.log("Delete Indicator", payload)
  return { type: UPDATE_INDICATOR, payload };
}
