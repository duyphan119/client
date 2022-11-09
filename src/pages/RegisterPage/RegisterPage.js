import React from "react";
import "./index.scss";
import { Button, Form, Input, notification } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import instance from "../../config/configAxios";
import { authActions, authSelector } from "../../redux/slices/authSlice";

const RegisterPage = () => {
	useTitle("Register");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(authSelector);
	const onFinish = async (values) => {
		console.log("Success:", values);
		try {
			const res = await instance.post("auth/register", values);
			const { code, message, data } = res.data;
			if (code === 200 || message === "Success") {
				dispatch(authActions.register(data));
				navigate("/");
				notification.success({
					message: "Register successfully",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	if (user) return <Navigate to="/profile" />;
	return (
		<main className="register">
			<div className="p-50">
				<div className="container-auth">
					<div className="title">
						<span>Đăng ký</span>
					</div>
					<div className="group-input">
						<Form
							name="Login"
							initialValues={{ fullName: "", email: "", password: "", phone: "" }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
							className="form-custom"
							labelAlign="left"
						>
							<Form.Item
								label="Họ và tên"
								name="fullName"
								rules={[
									{
										required: true,
										message: "Please fill in this field!",
									},
								]}
							>
								<Input size="large" />
							</Form.Item>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										type: "email",
										message: "Please enter a valid email address",
									},
								]}
							>
								<Input size="large" />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: "Please enter a password",
									},
								]}
							>
								<Input.Password size="large" />
							</Form.Item>
							<Form.Item
								label="Số điện thoại"
								name="phone"
								rules={[
									{
										required: true,
										message: "Please fill in this field!",
									},
									{
										len: 10,
										message: "Phone must be 10 digits",
									},
								]}
							>
								<Input size="large" />
							</Form.Item>
							<Form.Item
								rules={[
									{
										required: true,
									},
								]}
							>
								<Button type="primary" htmlType="submit" className="btn-auth">
									Đăng nhập
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default RegisterPage;
