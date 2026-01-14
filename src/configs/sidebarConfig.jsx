import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { ICON_SIZES } from "../constants";

export const topItems = [
  { id: 'dashboard', icon: <LuLayoutDashboard size={ICON_SIZES.MEDIUM} />, label: 'Dashboard', url: '#' },
  { id: 'trash', icon: <FaRegTrashCan size={ICON_SIZES.MEDIUM} />, label: 'Trash', url: '#' },
];

export const bottomItems = [
  { id: 'settings', icon: <IoSettingsOutline size={ICON_SIZES.MEDIUM} />, label: 'Settings', url: '#' },
  { id: 'logout', icon: <LuLogOut size={ICON_SIZES.MEDIUM} />, label: 'Log Out', url: '#' },
];