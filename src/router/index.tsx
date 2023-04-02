import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../views/layout/index"
import Dashboard from "../views/dashboard/index";
import User from "../views/user/index";
import Login from "../views/login";

export const router_item:Array<object> = [
	{ path:"/", label:"dashboard", key:"/", element: <Navigate to="/login" />},
	{ path:"/login", label:"login", key:"login", element: <Login />},
	{
		path:'/layout',
		label:"stockage",
		key:"layout",
		element: <Layout />,
		children: [
			{ path: 'user', label:"User",	key:"User",element: <User />, index: true},
			{ path: 'home', label:"Dashboard",	key:"Dashboard",element: <Dashboard />}
		]
	},
];
const GetRouters = () => {
	const routes:React.ReactElement | null = useRoutes(router_item)
	return routes
}

export default GetRouters
