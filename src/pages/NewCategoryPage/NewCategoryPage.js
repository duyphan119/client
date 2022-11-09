import { Button, Form, Input, Layout, notification, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderTitle from "../../components/HeaderTitle";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";
import "./index.scss";
const { Content } = Layout;
const NewCategoryPage = () => {
	useTitle("New category");
	const [parents, setParents] = useState([]);
	const { accessToken } = useSelector(authSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			try {
				const res = await apiCallerWithToken(accessToken, dispatch).get("category/read/all");
				const { data } = res.data;
				setParents(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [accessToken, dispatch]);

	const onFinish = async (values) => {
		try {
			const _values = {
				name: values.name,
				alias: values.alias,
				parentId: values.parentIndex === -1 ? null : parents[values.parentIndex].id,
			};
			const res = await apiCallerWithToken(accessToken, dispatch).post("category/create", _values);
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
			<HeaderTitle title="Category" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<Form
							initialValues={{
								name: "",
								alias: "",
								parentIndex: -1,
							}}
							wrapperCol={{ span: 8 }}
							labelCol={{ span: 2 }}
							labelAlign="left"
							onFinish={onFinish}
						>
							<Form.Item
								name="name"
								label="Name"
								rules={[
									{
										required: true,
										message: "Name is required",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="alias"
								label="Alias"
								rules={[
									{
										required: true,
										message: "Alias is required",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="parentIndex"
								label="Parent"
								rules={[
									{
										required: true,
										message: "Parent is required",
									},
								]}
							>
								<Select>
									<Select.Option value={-1}>No parent</Select.Option>
									{parents.map((parent, index) => {
										return (
											<Select.Option key={parent.id} value={index}>
												{parent.name}
											</Select.Option>
										);
									})}
								</Select>
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

export default NewCategoryPage;
