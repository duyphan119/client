import { Badge } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";
import {
  wishlistActions,
  wishlistSelector,
} from "../../redux/slices/wishlistSlice";

const WishlistIcon = () => {
  const { accessToken } = useSelector(authSelector);
  const { count } = useSelector(wishlistSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (accessToken) {
          const res = await Promise.allSettled([
            apiCallerWithToken(accessToken, dispatch).get("wishlist/account"),
          ]);
          const { code, message, data } = res[0].value.data;
          if (code === 200 && message === "Success") {
            dispatch(wishlistActions.setWishList(data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch]);
  return (
    <Badge count={count}>
      <Link to="/wish-list">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMiAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjUzMDMgMTYuODY0TDE5LjEyNzEgOS4yNjcyQzIwLjk5MzcgNy40MDA2IDIxLjI2OTEgNC4zMjk3NiAxOS41MDI3IDIuMzY4MTFDMTkuMDYwMiAxLjg3NTMzIDE4LjUyMiAxLjQ3Nzg2IDE3LjkyMDggMS4xOTk5N0MxNy4zMTk3IDAuOTIyMDY4IDE2LjY2ODIgMC43Njk1NjUgMTYuMDA2MiAwLjc1MTc2MkMxNS4zNDQxIDAuNzMzOTU5IDE0LjY4NTQgMC44NTEyMjkgMTQuMDcwMiAxLjA5NjQyQzEzLjQ1NSAxLjM0MTYxIDEyLjg5NjIgMS43MDk1NyAxMi40Mjc5IDIuMTc3ODZMMTEgMy42MDU3MUw5Ljc2NzIgMi4zNzI5QzcuOTAwNiAwLjUwNjMwMSA0LjgyOTc2IDAuMjMwOTEzIDIuODY4MTEgMS45OTczNUMyLjM3NTMzIDIuNDM5ODEgMS45Nzc4NiAyLjk3ODA0IDEuNjk5OTcgMy41NzkxOUMxLjQyMjA3IDQuMTgwMzQgMS4yNjk1NiA0LjgzMTgxIDEuMjUxNzYgNS40OTM4NEMxLjIzMzk2IDYuMTU1ODggMS4zNTEyMyA2LjgxNDYgMS41OTY0MiA3LjQyOTgxQzEuODQxNjEgOC4wNDUwMyAyLjIwOTU3IDguNjAzODQgMi42Nzc4NiA5LjA3MjE1TDEwLjQ2OTcgMTYuODY0QzEwLjYxMDMgMTcuMDA0NiAxMC44MDExIDE3LjA4MzYgMTEgMTcuMDgzNkMxMS4xOTg5IDE3LjA4MzYgMTEuMzg5NyAxNy4wMDQ2IDExLjUzMDMgMTYuODY0VjE2Ljg2NFoiIHN0cm9rZT0iIzMzM0Y0OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
          alt=""
        />
      </Link>
    </Badge>
  );
};

export default WishlistIcon;
