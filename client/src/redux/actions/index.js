import { createActions } from "redux-actions";

export const getUser = createActions({
  getUserRequest: undefined,
  getUserSuccess: (payload) => payload,
  getUserFailure: (err) => err,
});
