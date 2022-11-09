import { Button, Col, Row } from "antd";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../../components/Cart";
import { cartSelector } from "../../../redux/slices/cartSlice";
import { castToVND } from "../../../utils";
import "./index.scss";
import emptyCartSvg from "../../../assets/empty_cart.svg";
const CartDetail = () => {
  const { cart } = useSelector(cartSelector);
  console.log("cart: ", cart);
  const tinhGiaGoc = useMemo(
    () =>
      cart.items.reduce(
        (p, cartItem) =>
          p + cartItem.quantity * cartItem.productVariant.product.price,
        0
      ),
    [cart]
  );

  const tinhGiamGia = useMemo(
    () =>
      cart.items.reduce(
        (p, cartItem) =>
          p +
          cartItem.quantity *
            (cartItem.productVariant.product.price -
              cartItem.productVariant.product.salePrice),
        0
      ),
    [cart]
  );

  const tinhTongTien = useMemo(
    () =>
      cart.items.reduce(
        (p, cartItem) =>
          p + cartItem.quantity * cartItem.productVariant.product.salePrice,
        0
      ),
    [cart]
  );

  const isError = useMemo(
    () => cart.items.some((item) => item.quantity > item.inventory),
    [cart]
  );

  if (!cart) return <></>;
  return (
    <section className="cart-detail">
      {cart.items.length > 0 ? (
        <Row
          style={{
            padding: "0 100px",
          }}
        >
          <Col xl={18} className="left">
            {isError ? (
              <div
                style={{
                  backgroundColor: "lightpink",
                  color: "red",
                  width: "100%",
                  padding: "8px 4px",
                  fontWeight: "bold",
                }}
              >
                Hiện tại trong kho không đủ số lượng để đáp ứng
              </div>
            ) : null}
            <div className="qtt-product">
              ({cart.items.reduce((p, c) => p + c.quantity, 0)}) sản phẩm
            </div>
            <Cart />
          </Col>
          <Col xl={6} className="right">
            <div className="title">
              <h2>Đơn hàng</h2>
            </div>
            <div className="info">
              <div className="root-price">
                <span>Giá gốc</span>
                <span>{castToVND(tinhGiaGoc)}</span>
              </div>
              <div className="sale">
                <span>Giảm giá</span>
                <span className="sale-price">{castToVND(tinhGiamGia)}</span>
              </div>
              <div className="total-price">
                <span>
                  <b>Tổng tiền thanh toán</b>
                </span>
                <span>
                  <b>{castToVND(tinhTongTien)}</b>
                </span>
              </div>
            </div>
            <div className="btn-order">
              <Link
                to="/payment"
                onClick={(e) => {
                  if (isError) {
                    e.preventDefault();
                  }
                }}
              >
                <Button type="primary">Đặt hàng</Button>
              </Link>
            </div>
          </Col>
        </Row>
      ) : (
        <section className="cart-page__empty">
          <div
            style={{
              backgroundImage: `url(${emptyCartSvg})`,
              height: 300,
              width: 300,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></div>
          <h1>Giỏ hàng của bạn đang trống</h1>
          <Link to="/" className="cart-page__empty-link">
            Trang chủ
          </Link>
        </section>
      )}
    </section>
  );
};

export default CartDetail;
