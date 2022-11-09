import { Col, Row, Steps } from "antd";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import "./index.scss";

const CartPage = () => {
  useTitle("Cart");
  const { state } = useLocation();

  if (!state || state.current + state.expiredIn < new Date().getTime())
    return <Navigate to="/cart" />;

  return (
    <section className="payment-page">
      <Row justify="center">
        <Col xl={8} md={16} xs={24}>
          <Steps
            items={[
              { title: "Giỏ hàng" },
              { title: "Đặt hàng" },
              { title: "Hoàn tất" },
            ]}
            size="large"
            current={2}
          />
        </Col>
      </Row>
      <div className="" style={{ textAlign: "center", marginBlock: 120 }}>
        <p>
          Đơn hàng có mã là: {state.data.id}
          <br />
          Đơn hàng của bạn đang chờ được xử lý.
          <br />
          <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
            Quay về trang chủ
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CartPage;
