import React, { memo } from "react";
import { Input } from "antd";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../../config/configAxios";
import { authSelector } from "../../../redux/slices/authSlice";
import { cartActions, cartSelector } from "../../../redux/slices/cartSlice";
import { castToVND } from "../../../utils";
import { useLocation } from "react-router-dom";
const CartItem = ({ cartItem }) => {
  const { accessToken } = useSelector(authSelector);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const handleChangeQuantity = async (cartItem, newQuantity) => {
    console.log("update:", cartItem.id);
    try {
      if (newQuantity === 0) {
        handleDelete(cartItem.id);
      } else {
        const res = await apiCallerWithToken(accessToken, dispatch).patch(
          "cart/item/" + cartItem.id,
          { newQuantity }
        );
        const { code, message, data } = res.data;
        if (code === 200 || message === "Success") {
          dispatch(cartActions.updateCartItem(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).delete(
        "cart/item/" + id
      );
      const { code, message } = res.data;
      if (code === 200 || message === "Success") {
        dispatch(cartActions.deleteCartItem(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="product-item" key={cartItem.id}>
      <div
        className="info"
        style={{
          width: "40%",
          padding: "0 20px 0 0",
        }}
      >
        <img src={cartItem.productVariant.product.thumbnail} alt="" />
        <div className="wrap-info">
          <a href={`/product/${cartItem.productVariant.product.slug}`}>
            {cartItem.productVariant.product.name}
          </a>
          {cartItem.productVariant.variantValues.map((variantValue) => (
            <span key={variantValue.id}>
              {variantValue.variant.name}: {variantValue.value}
            </span>
          ))}
          {pathname === "/cart" ? (
            <span
              style={{
                color: "red",
              }}
              onClick={() => handleDelete(cartItem.id)}
            >
              Xóa
            </span>
          ) : null}
        </div>
      </div>
      <div
        className="price"
        style={{
          width: "20%",
          padding: "0 20px 0 0",
        }}
      >
        <span className="current-price">
          {castToVND(cartItem.productVariant.product.salePrice)}
        </span>
        {cartItem.productVariant.product.salePrice !==
          cartItem.productVariant.product.price && (
          <span className="root-price">
            {castToVND(cartItem.productVariant.product.price)}
          </span>
        )}
      </div>
      <div
        className="qtt"
        style={{
          width: "20%",
          padding: "0 20px 0 0",
        }}
      >
        {pathname === "/cart" ? (
          <>
            <AiOutlineMinusCircle
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleChangeQuantity(cartItem, cartItem.quantity - 1)
              }
            />
            <Input value={cartItem.quantity} readOnly className="input-qtt" />
            <AiOutlinePlusCircle
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleChangeQuantity(cartItem, cartItem.quantity + 1)
              }
            />
          </>
        ) : (
          cartItem.quantity
        )}
      </div>
      <div
        className="total-price"
        style={{
          width: "20%",
          padding: "0 20px 0 0",
        }}
      >
        <span>
          {castToVND(
            cartItem.quantity * cartItem.productVariant.product.salePrice
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(CartItem);
