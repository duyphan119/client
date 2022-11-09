import { Layout, Form, Input, notification, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { useTitle } from "../../hooks/useTitle";
import "./index.scss";
import { useParams } from "react-router-dom";
import { authSelector } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../config/configAxios";
const { Content } = Layout;
const EditCategoryPage = () => {
	useTitle("Edit category");

	const { id } = useParams();
	const [state, setState] = useState({ current: null, parents: [] });
	const { accessToken } = useSelector(authSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			try {
				const res = await Promise.allSettled([
					apiCallerWithToken(accessToken, dispatch).get("category/read/" + id),
					apiCallerWithToken(accessToken, dispatch).get("category/read/all"),
				]);
				const { code, data, message } = res[0].value.data;
				if (code === 200 || message === "Success") {
					setState({ current: data, parents: res[1].value.data.data });
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [accessToken, dispatch, id]);

	const onFinish = async (values) => {
		try {
			const _values = {
				name: values.name,
				alias: values.alias,
				parentId: values.parentIndex === -1 ? null : state.parents[values.parentIndex].id,
			};
			const res = await apiCallerWithToken(accessToken, dispatch).patch("category/update/" + id, _values);
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
	if (!state.current) return <>Category's not found</>;
	return (
		<main className="section-common">
			<HeaderTitle title="User" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<Form
							initialValues={{
								name: state.current.name || "",
								alias: state.current.alias || "",
								parentIndex: state.parents.findIndex((item) => state.current.parentId && item.id === state.current.parentId),
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
									{state.parents.map((parent, index) => {
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

export default EditCategoryPage;
