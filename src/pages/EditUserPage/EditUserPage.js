import { Layout, Form, Input, notification, Button } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { useTitle } from "../../hooks/useTitle";
import "./index.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { apiCallerWithToken } from "../../config/configAxios";
const { Content } = Layout;
const EditUserPage = () => {
	useTitle("Edit user");

	const { id } = useParams();
	const [current, setCurrent] = useState();
	const { accessToken } = useSelector(authSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const res = await apiCallerWithToken(accessToken, dispatch).get("account/read/" + id);
				const { code, data, message } = res.data;
				if (code === 200 || message === "Success") {
					setCurrent(data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [id, accessToken, dispatch]);

	const onFinish = async (values) => {
		try {
			const res = await apiCallerWithToken(accessToken, dispatch).patch("account/update/" + id, values);
			const { code, message } = res.data;
			if (code === 200 || message === "Success") {
				notification.success({
					message: "Successfully",
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	if (!current) return <>User's not found</>;
	return (
		<main className="section-common">
			<HeaderTitle title="User" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<Form
							initialValues={{
								email: current.email || "",
								fullName: current.fullName || "",
								phone: current.phone || "",
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

export default EditUserPage;
