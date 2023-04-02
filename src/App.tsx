import './App.scss';
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./views/dashboard";
import User from "./views/user";
import Layout from "./views/layout";
import GetRouters from "./router";

function App() {

	return (
		<HashRouter>
			<GetRouters />
		</HashRouter>
	);
}

export default App;
