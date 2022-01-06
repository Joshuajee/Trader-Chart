import {ASSETS, INDICATORS, SIDENAV } from "../constants/action-types";

export function addIndicator(payload) {
  console.log("Add Indicator", payload)
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

