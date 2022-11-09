import { Layout, Form, Input, notification, Button, Col, InputNumber, Upload, Space, Tag, Row, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { useTitle } from "../../hooks/useTitle";
import axios from "axios";
import "./index.scss";
import { AiOutlineUpload } from "react-icons/ai";
import { useParams } from "react-router-dom";
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
const EditProductPage = () => {
	useTitle("Edit Product");
	const { id } = useParams();
	const [form] = Form.useForm();
	const [state, setState] = useState({
		categories: [],
		variantValues: [],
		thumbnail: "",
		productCategories: [],
		variant: {},
		productDetails: [],
		product: null,
		deleteProductCategories: [],
	});
	useEffect(() => {
		(async () => {
			try {
				const apiCallerWithToken = axios.create({
					withCredentials: true,
					baseURL: "http://localhost:8080",
					headers: {
						authorization:
							"Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY0Njk3OTUzLCJleHAiOjE2NjQ3MTU5NTN9.nkek8VbImz-8JOSpvmIlPqnIcAhn2rwuuKhtr_M4XjM",
					},
				});
				const res = await Promise.allSettled([
					apiCallerWithToken.get("category/read/all"),
					axios.get("http://localhost:8080/variant-value/read/all"),
					axios.get(`http://localhost:8080/product/read/${id}`),
				]);
				const { data: categories } = res[0].value.data;
				const { data: variantValues } = res[1].value.data;
				const { data: product } = res[2].value.data;
				if (product) {
					console.log("product: ", product);
					const res2 = await Promise.allSettled([axios.get(`http://localhost:8080/category/product/read/${product.id}`)]);
					const { data: productCategories } = res2[0].value.data;
					setState((prev) => ({ ...prev, categories, variantValues, product, productCategories, productDetails: product.productDetails }));
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [id]);

	const onFinish = async (values) => {
		try {
			const apiCallerWithToken = axios.create({
				withCredentials: true,
				baseURL: "http://localhost:8080",
				headers: {
					authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY0Njk3OTUzLCJleHAiOjE2NjQ3MTU5NTN9.nkek8VbImz-8JOSpvmIlPqnIcAhn2rwuuKhtr_M4XjM",
				},
			});
			const _values = {
				...values,
				thumbnail: state.thumbnail,
			};

			const res = await apiCallerWithToken.patch(`product/update/${state.product.id}`, _values);
			const { code, message, data } = res.data;
			if (code === 201 || message === "Success") {
				const res2 = await Promise.allSettled([
					apiCallerWithToken.post(
						"/product/category/create/many",
						state.productCategories.map((item) => ({ categoryId: item.categoryId, productId: data.id }))
					),
					apiCallerWithToken.post(
						"/product-detail/create/many",
						state.productDetails.map((item) => ({ ...item, productId: data.id, sku: `${data.id}${item.sku}` }))
					),
				]);
				const { code: code1, message: message1 } = res2[0].value.data;
				const { code: code2, message: message2 } = res2[1].value.data;
				if ((code1 === 201 || message1 === "Success") && (code2 === 201 || message2 === "Success")) {
					notification.success({
						message: "Successfully",
					});
				}
			}
		} catch (error) {
			console.log(error);
			notification.error({
				message: "Error",
			});
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
	const handleSelectCategory = (category) => {
		setState((prev) => ({ ...prev, productCategories: [...prev.productCategories, { categoryId: category.id, category }] }));
	};
	const handleDeSelectCategory = (category) => {
		setState((prev) => ({ ...prev, productCategories: prev.productCategories.filter((item) => item.categoryId !== category.id) }));
	};
	const handleSelectVariantValue = (variantValue) => {
		setState((prev) => {
			if (prev.variant[variantValue.variant.id]) {
				return {
					...prev,
					variant: {
						...prev.variant,
						[variantValue.variant.id]: [...prev.variant[variantValue.variant.id].filter((item) => item.id !== variantValue.id), variantValue],
					},
				};
			} else {
				return { ...prev, variant: { ...prev.variant, [variantValue.variant.id]: [variantValue] } };
			}
		});
	};
	const handleDeSelectVariantValue = (variantValue) => {
		setState((prev) => ({ ...prev, variant: prev.variant[variantValue.variant.id].filter((item) => item.id !== variantValue.id) }));
	};
	const handleAddNewDetails = () => {
		setState((prev) => {
			const productDetails = combine(Object.keys(state.variant).map((key) => prev.variant[key]))
				.map((item) => ({
					title: item.map((v) => v.value).join(" / "),
					sku: item.map((v) => v.id).join(""),
					variantValues: item,
					inventory: 0,
					weight: 300,
				}))
				.filter((item) => !prev.productDetails.find((v) => v.sku.indexOf(item.sku) !== -1));
			console.log(productDetails);
			return {
				...prev,
				productDetails: [...prev.productDetails, ...productDetails],
			};
		});
	};

	const handleChangeInventory = (productDetail, value) => {
		if (value >= 0) {
			setState((prev) => {
				const index = prev.productDetails.findIndex((item) => item.title === productDetail.title);
				if (index !== -1) {
					prev.productDetails[index].inventory = value;
				}
				return prev;
			});
		}
	};

	const handleChangeWeight = (productDetail, value) => {
		if (value >= 0) {
			setState((prev) => {
				const index = prev.productDetails.findIndex((item) => item.title === productDetail.title);
				if (index !== -1) {
					prev.productDetails[index].weight = value;
				}
				return prev;
			});
		}
	};

	if (!state.product) return <></>;
	if (state.product && !state.product.name) return <>Product's not found</>;
	return (
		<main className="section-common">
			<HeaderTitle title="Category" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<Form
							initialValues={{
								name: state.product.name || "",
								alias: state.product.alias || "",
								price: state.product.price || 0,
								newPrice: state.product.newPrice || 0,
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
										name="price"
										label="Price"
										rules={[
											{
												required: true,
												message: "Price is required",
											},
										]}
									>
										<InputNumber />
									</Form.Item>
									<Form.Item name="newPrice" label="Sale Price">
										<InputNumber />
									</Form.Item>
									<Form.Item label="Upload">
										<Space direction="vertical">
											<Avatar src={state.product.thumbnail} style={{ width: 100, height: 100 }} shape="square" alt="" />
											<Upload {...props}>
												<Button icon={<AiOutlineUpload />}>Click to Upload</Button>
											</Upload>
										</Space>
									</Form.Item>
									<Form.Item label="Categories">
										<Space direction="vertical">
											<Space wrap={true}>
												{state.categories.map((category) => {
													return (
														<Tag key={category.id} style={{ cursor: "pointer" }} onClick={() => handleSelectCategory(category)}>
															{category.name}
														</Tag>
													);
												})}
											</Space>
											<Space wrap={true}>
												Đã chọn:{" "}
												{state.productCategories.map((productCategory) => {
													return (
														<Tag
															key={productCategory.categoryId}
															closable={true}
															onClick={() => handleDeSelectCategory(productCategory.category)}
														>
															{productCategory.category.name}
														</Tag>
													);
												})}
											</Space>
										</Space>
									</Form.Item>
								</Col>
								<Col xs={24} lg={12}>
									<Form.Item label="Variant Values">
										<Space direction="vertical">
											<Space wrap={true}>
												{state.variantValues.map((variantValue) => {
													return (
														<Tag
															key={variantValue.id}
															style={{ cursor: "pointer" }}
															onClick={() => handleSelectVariantValue(variantValue)}
														>
															{variantValue.value}
														</Tag>
													);
												})}
											</Space>
											<Space wrap={true}>
												Đã chọn:{" "}
												{Object.keys(state.variant).map((key) => {
													return state.variant[key].map((variantValue) => {
														return (
															<Tag closable={true} key={variantValue.id} onClick={() => handleDeSelectVariantValue(variantValue)}>
																{variantValue.value}
															</Tag>
														);
													});
												})}
											</Space>
											<Button type="primary" onClick={handleAddNewDetails} disabled={!Object.keys(state.variant).length}>
												New Details
											</Button>
											<Space wrap={true}>
												{state.productDetails.map((productDetail) => {
													return (
														<Space
															key={productDetail.title}
															direction="vertical"
															style={{ border: "1px solid #000", padding: 8, fontSize: 12 }}
														>
															<Space>Sku: {productDetail.sku}</Space>
															<Space>Title: {productDetail.title}</Space>
															<Space>
																Weight:{" "}
																<InputNumber
																	onChange={(value) => handleChangeWeight(productDetail, value)}
																	value={productDetail.weight}
																	size="small"
																/>
															</Space>
															<Space>
																Inventory:{" "}
																<InputNumber
																	onChange={(value) => handleChangeInventory(productDetail, value)}
																	value={productDetail.inventory}
																	size="small"
																/>
															</Space>
														</Space>
													);
												})}
											</Space>
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

export default EditProductPage;
