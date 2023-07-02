import { MenuItem, OpenedMenu } from "@/types";
import * as ActionTypes from "./actionTypes";
export const addOpenedMenu = (menuItem: OpenedMenu) => ({
  type: ActionTypes.ADDOPENTMENU,
  menuItem,
});

export const setOpenKey = (keys: string[]) => ({
  type: ActionTypes.SET_OPENKEY,
  keys,
});

export const setSelectKey = (keys: string[]) => ({
  type: ActionTypes.SET_SELECTKEY,
  keys,
});

export const filterOpenKey = (keys: string[]) => ({
  type: ActionTypes.FILTER_OPENKEY,
  keys,
});

export const setUserMenu = (list: MenuItem[]) => ({
  type: ActionTypes.SET_USERMENU,
  list,
});


export const setCurrentPath = (path: string) => ({
  type: ActionTypes.SETCURRENTPATH,
  path
})