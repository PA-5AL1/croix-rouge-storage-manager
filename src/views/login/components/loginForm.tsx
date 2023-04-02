import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

function LoginForm(){
 return(
	 <Form
		 name="basic"
		 style={{ maxWidth: 600 }}
		 initialValues={{ remember: true }}
		 autoComplete="off"
	 >
		 <Form.Item

			 name="username"
			 rules={[{ required: true, message: 'Please input your username!' }]}
		 >
			 <Input />
		 </Form.Item>

		 <Form.Item

			 name="password"
			 rules={[{ required: true, message: 'Please input your password!' }]}
		 >
			 <Input.Password />
		 </Form.Item>


		 <Form.Item >
			 <Button type="primary" htmlType="submit" block>
				 Login
			 </Button>
		 </Form.Item>
	 </Form>
 )
}

export default LoginForm
