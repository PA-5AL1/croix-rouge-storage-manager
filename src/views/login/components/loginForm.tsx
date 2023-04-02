import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginForm() {
	return (
		<Form
			name="basic"
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			autoComplete="off"
		>
			<Form.Item
				name="username"
				rules={[{ required: true, message: 'veuillez entrer e-mail' }]}
			>
				<Input prefix={<UserOutlined/>} placeholder="veuillez entrer e-mail"  />
			</Form.Item>

			<Form.Item
				name="password"
				rules={[{ required: true, message: 'veuillez entrer le mot de passe' }]}
			>
				<Input.Password prefix={<LockOutlined/>} placeholder="veuillez entrer le mot de passe" />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" block>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
}

export default LoginForm;
