import { INIT_STATE } from "../../utils";
import { getUser } from "../actions";

export default function userReducer(state = INIT_STATE.user, action) {
  switch (action.type) {
    case getUser.getUserRequest().type:
      return {
        ...state,
        isLoading: true,
      };
    case getUser.getUserSuccess().type:
      return {
        ...state,
        isLoading: false,
        id: action.payload,
      };
    case getUser.getUserFailure().type:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
