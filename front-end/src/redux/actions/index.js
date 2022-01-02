import {ASSETS, INDICATORS, SIDENAV } from "../constants/action-types";

export function saveIndicator(payload) {
  console.log("Save Indicator", payload)
  return { type: INDICATORS, payload };
}

export function showSideNav(payload) {
  console.log("Show Side Navigator", payload)
  return { type: SIDENAV, payload };
}

export function updateAssets(payload) {
  console.log("Update Assets", payload)
  return { type: ASSETS, payload };
}
