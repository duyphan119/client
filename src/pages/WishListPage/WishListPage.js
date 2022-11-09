import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Product from "../../components/Product";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";
import {
  wishlistActions,
  wishlistSelector,
} from "../../redux/slices/wishlistSlice";
import "./index.scss";
const PAGE_SIZE = 8;
const WishListPage = () => {
  useTitle("Wish list");

  const { itemsLimit, count } = useSelector(wishlistSelector);
  const { accessToken, user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const handleLoadMore = () => {
    setPageSize((prev) => prev + PAGE_SIZE);
  };

  const handleCollapse = () => {
    setPageSize(PAGE_SIZE);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCallerWithToken(accessToken, dispatch).get(
          "wishlist/account",
          { params: { limit: pageSize } }
        );
        const { code, message, data } = res.data;
        if (code === 200 && message === "Success") {
          dispatch(wishlistActions.setWishListLimit(data));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch, pageSize]);
  if (!user) return <Navigate to="/login" />;
  return (
    <main className="wish-list-page">
      <div className="content">
        <h3>Sản phẩm yêu thích của tôi</h3>
        <div
          style={{
            padding: "0 20px 0 0",
          }}
        >
          <Row gutter={[16, 16]} className="list-product">
            {itemsLimit.map((item) => {
              return (
                <Col xs={12} lg={6} key={item.id}>
                  <Product product={item.product} />
                </Col>
              );
            })}
            {pageSize === PAGE_SIZE && pageSize >= count ? (
              <></>
            ) : (
              <Col xs={24} style={{ textAlign: "center" }}>
                {pageSize < count ? (
                  <button
                    style={{
                      backgroundColor: "transparent",
                      padding: "14px 24px",
                      minWidth: 240,
                      cursor: "pointer",
                    }}
                    onClick={handleLoadMore}
                  >
                    Xem thêm
                  </button>
                ) : (
                  <button
                    onClick={handleCollapse}
                    style={{
                      backgroundColor: "transparent",
                      padding: "14px 24px",
                      minWidth: 240,
                      cursor: "pointer",
                    }}
                  >
                    Thu gọn
                  </button>
                )}
              </Col>
            )}
          </Row>
        </div>
      </div>
    </main>
  );
};

export default WishListPage;
