import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  wishlistActions,
  wishlistSelector,
} from "../../redux/slices/wishlistSlice";
import { castToVND } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { authSelector } from "../../redux/slices/authSlice";
import { apiCallerWithToken } from "../../config/configAxios";
import { notification } from "antd";
import HeartIcon from "../HeartIcon";

const Product = ({ product }) => {
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

  if (!product || product.productVariants.length === 0) return <></>;
  return (
    <div style={{ position: "relative" }}>
      <Link to={`/product/${product.alias}`} className="img-link">
        <img src={product.thumbnail} alt="" />
      </Link>
      <HeartIcon
        product={product}
        styleWrapper={{
          position: "absolute",
          right: "10px",
          top: "10px",
          width: "30px",
          height: "30px",
          borderRadius: 0,
        }}
      />
      <div className="info">
        <div className="name">
          <Link to={`/product/${product.alias}`}>
            <span className="three-dot three-dot-1">{product.name}</span>
          </Link>
        </div>
        <div className="price">
          {/* <span>{castToVND(product.newPrice)}</span>
					{product.newPrice !== product.price && <span className="root-price">{castToVND(product.price)}</span>} */}
          <span>{castToVND(product.salePrice)}</span>
          {product.salePrice !== product.price && (
            <span className="root-price">{castToVND(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
