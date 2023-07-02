import { useStateLayout, useStateVisible } from "@/store/hooks";
import * as ActionTypes from "../store/layout/actionTypes";
import "./index.less";
import { SingleColumn, TowColumn, TwoFlanks } from "./mode";

export default function LayoutContainer() {
  const LayoutMode = useStateLayout()
  const visible = useStateVisible()
  switch (LayoutMode) {
    case ActionTypes.SINGLE_COLUMN:
      return <SingleColumn visible={visible} />;
    case ActionTypes.TWO_COLUMN:
      return <TowColumn visible={visible} />;
    case ActionTypes.TWO_FLANKS:
      return <TwoFlanks visible={visible} />;
    default:
      return null;
  }
}