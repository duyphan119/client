import { Layout, Form, Input, notification, Button, Col, InputNumber, Upload, Space, Tag, Row, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { useTitle } from "../../hooks/useTitle";
import axios from "axios";
import "./index.scss";
import { AiOutlineUpload } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { apiCallerWithToken } from "../../config/configAxios";
const { Content } = Layout;
function combine(array) {
	function c(part, index) {
		array[index].forEach(function (a) {
			var p = part.concat(a);
			if (p.length === array.length) {
				r.push(p);
				return;
			}
			c(p, index + 1);
		});
	}

	var r = [];

	c([], 0);

	return r;
}
const EditInventoryPage = () => {
	useTitle("Edit Inventory");
	const { id } = useParams();
	const [form] = Form.useForm();
	const [state, setState] = useState({
		variantValues: [],
		thumbnail: "",
		variant: {},
		productDetails: [],
		deleteProductCategories: [],
		productDetail: null,
	});
	const { accessToken } = useSelector(authSelector);
	const dispatch = useDispatch();
	console.log(state);
	useEffect(() => {
		(async () => {
			try {
				const res = await Promise.allSettled([
					axios.get("http://localhost:8080/variant-value/read/all"),
					axios.get(`http://localhost:8080/product-detail/read/${id}`),
				]);
				const { data: variantValues } = res[0].value.data;
				const { data: productDetail } = res[1].value.data;
				setState((prev) => ({ ...prev, variantValues, productDetail }));
			} catch (error) {
				console.log(error);
			}
		})();
	}, [id]);

	const onFinish = async (values) => {
		try {
			const { inventory, sku, weight } = values;
			const res = await apiCallerWithToken(accessToken, dispatch).patch("product-detail/update/" + state.productDetail.id, {
				inventory,
				sku,
				weight,
				thumbnail: state.thumbnail || state.productDetail.thumbnail,
				productId: state.productDetail.productId,
			});
			const { code, message } = res.data;
			if (code === 200 || message === "Success") {
				notification.success("Successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const props = {
		name: "image",
		action: "http://localhost:8080/upload/image/single",
		headers: {
			authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY0Njk3OTUzLCJleHAiOjE2NjQ3MTU5NTN9.nkek8VbImz-8JOSpvmIlPqnIcAhn2rwuuKhtr_M4XjM",
		},
		onChange(info) {
			console.log("info uploaded file: ", info);
			if (info?.file?.response) {
				const { code, message, data: url } = info.file.response;
				if (code === 200 || message === "Success") {
					setState((prev) => ({ ...prev, thumbnail: url }));
				}
			}
		},
	};
	if (!state.productDetail) return <>Product detail was not found</>;
	return (
		<main className="section-common">
			<HeaderTitle title="Inventory" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<Form
							initialValues={{
								sku: state.productDetail.sku || "",
								inventory: state.productDetail.inventory || 0,
								weight: state.productDetail.weight || 0,
							}}
							wrapperCol={{ span: 19 }}
							labelCol={{ span: 5 }}
							labelAlign="left"
							onFinish={onFinish}
							form={form}
						>
							<Row gutter={[16, 16]}>
								<Col xs={24} lg={12}>
									<Form.Item
										name="sku"
										label="SKU"
										rules={[
											{
												required: true,
												message: "SKU is required",
											},
										]}
									>
										<Input disabled />
									</Form.Item>
									<Form.Item name="weight" label="Weight">
										<InputNumber />
									</Form.Item>
									<Form.Item
										name="inventory"
										label="Inventory"
										rules={[
											{
												required: true,
												message: "Inventory is required",
											},
										]}
									>
										<InputNumber />
									</Form.Item>
									<Form.Item label="Upload">
										<Space direction="vertical">
											<Avatar src={state.thumbnail} style={{ width: 100, height: 100 }} shape="square" alt="" />
											<Upload {...props}>
												<Button icon={<AiOutlineUpload />}>Click to Upload</Button>
											</Upload>
										</Space>
									</Form.Item>
								</Col>
							</Row>
						</Form>
						<Button type="primary" htmlType="submit" onClick={() => form.submit()}>
							Submit
						</Button>
					</div>
				</div>
			</Content>
		</main>
	);
};

export default EditInventoryPage;
