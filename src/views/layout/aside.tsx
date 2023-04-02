import {router_item} from "../../router";
import { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

function aside(){
	const [router] = useState(router_item)
	const navigate = useNavigate()
	const handlerMenu: MenuProps['onClick'] = e => {
		const keyPath = e.keyPath.reverse().join("/")
		console.log(e.keyPath.reverse().join("/"))
		navigate('/' + keyPath)
	}
	return(
		<>{
			router.map(item =>{
				return(
					<Menu items={router} mode="inline" onClick={handlerMenu} />
				)
			})
		}</>
	)
}

export default aside;
