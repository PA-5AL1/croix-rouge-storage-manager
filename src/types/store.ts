import { LayoutMode } from "./layout"
import { MenuState } from "./menu"
import { UserInfo } from "./user"


export interface componentsVisible {
  footer: boolean
  topMenu: boolean
}

export default interface State {
  menu: MenuState
  user: UserInfo
  layout: LayoutMode
  componentsVisible: componentsVisible
}