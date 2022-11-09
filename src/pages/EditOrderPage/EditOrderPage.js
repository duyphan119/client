import { Button, Form, Layout, notification, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderTitle from "../../components/HeaderTitle";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";
import { castToVND, formatDateTime } from "../../utils";
import "./index.scss";
const { Content } = Layout;
const EditOrderPage = () => {
	useTitle("Edit Order");

	const { id } = useParams();
	const [state, setState] = useState({ current: null });
	const { accessToken } = useSelector(authSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			try {
				const res = await Promise.allSettled([apiCallerWithToken(accessToken, dispatch).get("order/read/" + id)]);
				const { code, data, message } = res[0].value.data;
				if (code === 200 || message === "Success") {
					setState({ current: data });
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [accessToken, dispatch, id]);

	const onFinish = async (values) => {
		try {
			const res = await apiCallerWithToken(accessToken, dispatch).patch("order/update/" + id, values);
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
	console.log(state);
	if (!state.current) return <>Order's not found</>;
	return (
		<main className="section-common">
			<HeaderTitle title="Order" />
			<Content className="common-layout-content-cus">
				<div className="common-content-wrap">
					<div className="common-content">
						<div>
							Đơn hàng: <strong>{state.current.id}</strong>
						</div>
						<div style={{ marginTop: 8 }}>
							Email người nhận: <strong>{state.current.account.email}</strong>
						</div>
						<div style={{ marginTop: 8 }}>
							Họ tên người nhận: <strong>{state.current.fullName}</strong>
						</div>
						<div style={{ marginTop: 8 }}>
							Số điên thoại người nhận: <strong>{state.current.phone}</strong>
						</div>
						<div style={{ marginTop: 8 }}>
							Ngày đặt: <strong>{formatDateTime(state.current.createdAt)}</strong>
						</div>
						<div style={{ marginTop: 8 }}>
							Địa chỉ:{" "}
							<strong>
								{state.current.address}, {state.current.ward}, {state.current.district}, {state.current.province}
							</strong>
						</div>
						<div style={{ marginTop: 8 }}>Sản phẩm:</div>
						<table style={{ width: "100%", marginTop: 8 }}>
							<thead>
								<tr>
									<th style={{ paddingBlock: 8, boxShadow: "0 0 1px 0 #333" }}>Sản phẩm</th>
									<th style={{ paddingBlock: 8, boxShadow: "0 0 1px 0 #333" }}>Đơn giá</th>
									<th style={{ paddingBlock: 8, boxShadow: "0 0 1px 0 #333" }}>Số lượng</th>
									<th style={{ paddingBlock: 8, boxShadow: "0 0 1px 0 #333" }}>Thành tiền</th>
								</tr>
							</thead>
							<tbody>
								{state.current.items.map((orderItem) => (
									<tr key={orderItem.id}>
										<td style={{ display: "flex", alignItems: "center", boxShadow: "0 0 1px 0 #333", padding: 8 }}>
											<img alt="" src={orderItem.productDetail.product.thumbnail} style={{ width: 60, height: 60, objectFit: "cover" }} />
											<div style={{ marginLeft: 8 }}>
												<div>{orderItem.productDetail.product.name}</div>
												{orderItem.productDetail.variantValues.map((variantValue) => {
													return (
														<div key={variantValue.id}>
															{variantValue.variant.name}: {variantValue.value}
														</div>
													);
												})}
											</div>
										</td>
										<td style={{ textAlign: "center", boxShadow: "0 0 1px 0 #333" }}>{castToVND(orderItem.price)}</td>
										<td style={{ textAlign: "center", boxShadow: "0 0 1px 0 #333" }}>{orderItem.quantity}</td>
										<td style={{ textAlign: "center", boxShadow: "0 0 1px 0 #333" }}>{castToVND(orderItem.quantity * orderItem.price)}</td>
									</tr>
								))}
							</tbody>
						</table>
						<div style={{ textAlign: "right", marginTop: 8 }}>
							Tổng thành tiền: {castToVND(state.current.items.reduce((p, orderItem) => p + orderItem.quantity * orderItem.price, 0))}
						</div>
						{state.current.coupons.map((coupon) => (
							<div key={coupon.id} style={{ textAlign: "right", marginTop: 8 }}>
								Giảm giá: <span style={{ color: "red" }}>-{castToVND(coupon.priceDiscount)}</span>
							</div>
						))}

						<div style={{ textAlign: "right", marginTop: 8, marginBottom: 8 }}>
							Tổng tiền: <strong>{castToVND(state.current.items.reduce((p, orderItem) => p + orderItem.quantity * orderItem.price, 0))}</strong>
						</div>

						<Form onFinish={onFinish} initialValues={{ status: state.current.status }}>
							<Form.Item label="Trạng thái:" name="status">
								<Select>
									<Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
									<Select.Option value="Đang vận chuyển">Đang vận chuyển</Select.Option>
									<Select.Option value="Vận chuyển thành công">Vận chuyển thành công</Select.Option>
								</Select>
							</Form.Item>
							<Button htmlType="submit" type="primary">
								Submit
							</Button>
						</Form>
					</div>
				</div>
			</Content>
		</main>
	);
};

export default EditOrderPage;
