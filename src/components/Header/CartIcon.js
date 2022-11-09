import { Badge } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";
import { cartActions, cartSelector } from "../../redux/slices/cartSlice";

const CartIcon = () => {
  const { accessToken } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (accessToken) {
          const res = await Promise.allSettled([
            apiCallerWithToken(accessToken, dispatch).get("cart/account"),
          ]);
          const { code, message, data } = res[0].value.data;
          if (code === 200 && message === "Success") {
            console.log(data);
            dispatch(cartActions.setCart(data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch]);
  return (
    <Badge count={cart ? cart.items.reduce((p, c) => p + c.quantity, 0) : 1}>
      <Link to="/cart">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjI1MDcgNi43NUgzLjc1MDczQzMuMzM2NTIgNi43NSAzLjAwMDczIDcuMDg1NzkgMy4wMDA3MyA3LjVMMy43NTA3MyAxOS41QzMuNzUwNzMgMTkuOTE0MiA0LjA4NjUyIDIwLjI1IDQuNTAwNzMgMjAuMjVIMTkuNTAwN0MxOS45MTQ5IDIwLjI1IDIwLjI1MDcgMTkuOTE0MiAyMC4yNTA3IDE5LjVMMjEuMDAwNyA3LjVDMjEuMDAwNyA3LjA4NTc5IDIwLjY2NDkgNi43NSAyMC4yNTA3IDYuNzVaIiBzdHJva2U9IiMzMzNGNDgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTUuNzUgOS43NVY1LjI1QzE1Ljc1IDQuODUyMTggMTUuNTkyIDQuNDcwNjQgMTUuMzEwNyA0LjE4OTM0QzE1LjAyOTQgMy45MDgwNCAxNC42NDc4IDMuNzUgMTQuMjUgMy43NUg5Ljc1QzkuMzUyMTggMy43NSA4Ljk3MDY0IDMuOTA4MDQgOC42ODkzNCA0LjE4OTM0QzguNDA4MDQgNC40NzA2NCA4LjI1IDQuODUyMTggOC4yNSA1LjI1VjkuNzUiIHN0cm9rZT0iIzMzM0Y0OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
          alt=""
        />
      </Link>
    </Badge>
  );
};

export default CartIcon;
