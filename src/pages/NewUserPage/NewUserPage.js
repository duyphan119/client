import { Button, Form, Input, Layout, notification } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderTitle from "../../components/HeaderTitle";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";
import "./index.scss";
const { Content } = Layout;
const NewUserPage = () => {
	useTitle("New user");
	const { accessToken } = useSelector(authSelector);
	const dispatch = useDispatch();
	const onFinish = async (values) => {
		try {
			const res = await apiCallerWithToken(accessToken, dispatch).post("account/create", values);
			const { code, message } = res.data;
			if (code === 201 || message === "Success") {
				notification.success({
					message: "Successfully",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<main className="section-common">
			<HeaderTitle title="User" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<Form
							initialValues={{
								email: "",
								fullName: "",
								phone: "",
								password: "",
							}}
							wrapperCol={{ span: 8 }}
							labelCol={{ span: 2 }}
							labelAlign="left"
							onFinish={onFinish}
						>
							<Form.Item
								name="email"
								label="Email"
								rules={[
									{
										required: true,
										type: "email",
										message: "Please enter a valid email address",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message: "Password is required",
									},
									{
										min: true,
										message: "Password must be least 6 characters",
									},
								]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								name="fullName"
								label="Full Name"
								rules={[
									{
										required: true,
										message: "Full name is required",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="phone"
								label="Phone"
								rules={[
									{
										required: true,
										message: "Phone is required",
									},
									{
										len: 10,
										message: "Phone must be 10 digits",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</Content>
		</main>
	);
};

export default NewUserPage;
