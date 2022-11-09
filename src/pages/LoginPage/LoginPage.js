import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authActions } from "../../redux/slices/authSlice";
import "./index.scss";

const LoginPage = () => {
	useTitle("Login");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		try {
			const res = await instance.post("/auth/login", values);
			const { code, message, data } = res.data;
			if (code === 200 || message === "Success") {
				dispatch(authActions.login(data));
				navigate(data.account.accountRole === "Admin" ? "/admin/dashboard" : "/");
				notification.success({
					message: "Login successfully",
				});
			}
		} catch (error) {
			console.log(error);
		}
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<main className="login">
			<div className="p-50">
				<div className="container-auth">
					<div className="title">
						<span>Đăng nhập</span>
					</div>
					<div className="group-input">
						<Form
							name="Login"
							initialValues={{ email: "", password: "" }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
							className="form-custom"
							labelAlign="left"
						>
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
					<div className="text-register">
						<span>
							Bằng cách tạo một tài khoản với cửa hàng của chúng tôi, bạn có thể thao tác quy trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ
							giao hàng, xem và theo dõi các đơn hàng của bạn trong phần tài khoản của bạn và hơn thế nữa.
						</span>
						<Link to="/register">Đăng ký</Link>
					</div>
				</div>
			</div>
		</main>
	);
};
export default LoginPage;
