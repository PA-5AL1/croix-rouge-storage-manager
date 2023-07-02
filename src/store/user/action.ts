
import { UserAction, UserInfo } from "@/types";
import * as ActionTypes from "./actionTypes";
export const setUserInfoAction = (info: UserInfo): UserAction => ({
  type: ActionTypes.SET_USERINFO,
  info,
});

export const clearUser = (): UserAction => ({
  type: ActionTypes.CLEAR_USERINFO,
});
