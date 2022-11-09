import { notification } from "antd";
import React, { memo, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";
import {
  wishlistActions,
  wishlistSelector,
} from "../../redux/slices/wishlistSlice";
const style = {
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 46,
  borderRadius: "50%",
  fontSize: 22,
  cursor: "pointer",
  border: "none",
};
const HeartIcon = ({ product, styleWrapper, styleIcon }) => {
  const [isActive, setIsActive] = useState(false);
  const { items } = useSelector(wishlistSelector);
  const { accessToken } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product)
      setIsActive(
        items.findIndex((item) => item.productId === product.id) !== -1
      );
  }, [product, items]);

  const handleAddToWishlist = async () => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).post(
        "wishlist",
        {
          productId: product.id,
        }
      );
      const { code, message, data } = res.data;
      if (code === 200 || message === "Success") {
        dispatch(wishlistActions.addToWishlist(data));
        notification.success({
          message: "Sản phẩm đã được thêm vào danh sách yêu thích",
        });
      }
    } catch (error) {
      console.log(error);
      notification.info({
        message: "Vui lòng đăng nhập",
      });
    }
  };

  const handleDeleteWishlistItem = async () => {
    try {
      const wishlistItem = items.find((item) => item.productId === product.id);
      const res = await apiCallerWithToken(accessToken, dispatch).delete(
        "wishlist/" + wishlistItem.id
      );
      const { code, message } = res.data;
      if (code === 200 || message === "Success") {
        dispatch(wishlistActions.deleteWishlistItem(wishlistItem.id));
        notification.success({
          message: "Sản phẩm đã được xóa khỏi danh sách yêu thích",
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
      });
    }
  };
  if (!product) return <></>;
  return (
    <span
      className="btn"
      onClick={isActive ? handleDeleteWishlistItem : handleAddToWishlist}
      style={{ ...style, ...styleWrapper }}
    >
      {!isActive && <AiOutlineHeart style={styleIcon} />}
      {isActive && <AiFillHeart style={{ color: "red", ...styleIcon }} />}
    </span>
  );
};

export default memo(HeartIcon);
