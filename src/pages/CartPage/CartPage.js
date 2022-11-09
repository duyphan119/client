import { Col, Row, Steps } from "antd";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import React from "react";
import { useTitle } from "../../hooks/useTitle";
import CartDetail from "./CartDetail/CartDetail";
import "./index.scss";

const CartPage = () => {
  useTitle("Cart");

  return (
    <section className="cart-page">
      <Row justify="center">
        <Col xl={8} md={16} xs={24}>
          <Steps
            items={[
              { title: "Giỏ hàng" },
              { title: "Đặt hàng" },
              { title: "Hoàn tất" },
            ]}
            size="large"
            current={0}
          />
        </Col>
      </Row>
      <CartDetail />
    </section>
  );
};

export default CartPage;
