import { Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../components/Product";
import instance from "../../config/configAxios";
const PAGE_SIZE = 8;
const SearchProductsPage = () => {
	const [query] = useSearchParams();
	const q = query.get("q");
	const [state, setState] = useState({
		items: [],
		count: 0,
		limit: PAGE_SIZE,
		p: 1,
	});

	useEffect(() => {
		(async () => {
			try {
				const res = await instance.get("product", { params: { q, limit: PAGE_SIZE, p: 1 } });
				const { code, message, data } = res.data;
				if (code === 200 || message === "Success") {
					setState((prev) => ({ ...prev, items: data.items, count: data.count }));
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [q]);

	const handleChange = async (page, pageSize) => {
		try {
			const res = await instance.get("product", { params: { q, limit: pageSize, p: page } });
			const { code, message, data } = res.data;
			if (code === 200 || message === "Success") {
				setState((prev) => ({ ...prev, items: data.items, count: data.count, limit: pageSize, p: page }));
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log(state);

	return (
		<div
			style={{
				padding: "40px 100px",
			}}
		>
			<h1>Kết quả tìm kiếm "{q || ""}"</h1>
			<Row gutter={[16, 16]}>
				{state.items.map((product) => {
					return (
						<Col key={product.id} xs={12} md={8} lg={6}>
							<Product product={product} />
						</Col>
					);
				})}
				<Col xs={24} style={{ textAlign: "center" }}>
					<Pagination total={state.count} current={state.p} pageSize={state.limit} onChange={handleChange} />
				</Col>
			</Row>
		</div>
	);
};

export default SearchProductsPage;
