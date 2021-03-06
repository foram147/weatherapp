import { Action } from "redux";
import { initialState } from "../store/index";

export const UserRed = (state = initialState.user, action: any) => {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};