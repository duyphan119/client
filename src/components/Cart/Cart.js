import React from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/slices/cartSlice";
import CartItem from "./CartItem";
const Cart = () => {
  const { cart } = useSelector(cartSelector);

  if (!cart) return <>OK</>;
  return (
    <div className="list-product">
      <div className="title">
        <div
          className="text-title"
          style={{
            width: "40%",
          }}
        >
          Sản phẩm
        </div>
        <div
          className="text-title"
          style={{
            width: "20%",
          }}
        >
          Giá tiền
        </div>
        <div
          className="text-title"
          style={{
            width: "20%",
          }}
        >
          Số lượng
        </div>
        <div
          className="text-title"
          style={{
            width: "20%",
          }}
        >
          Tổng tiền
        </div>
      </div>
      {cart.items.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.id} />
      ))}
    </div>
  );
};

export default Cart;
