import { LayoutMode } from "@/types";
import * as ActionTypes from "./actionTypes";

export const changeLayoutMode = (mode: LayoutMode): {
  type: LayoutMode;
  mode: LayoutMode;
} => ({
  type: ActionTypes.SINGLE_COLUMN,
  mode,
});
