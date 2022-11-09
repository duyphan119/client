import { Button, Col, Grid, notification, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "swiper/css";
import HeartIcon from "../../components/HeartIcon";
import Product from "../../components/Product";
import instance, { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";
import { cartActions } from "../../redux/slices/cartSlice";
import { castToVND } from "../../utils";
import "./index.scss";
const { useBreakpoint } = Grid;

const ProductDetailPage = () => {
  const screens = useBreakpoint();
  const { accessToken } = useSelector(authSelector);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    product: null,
    variants: [],
    variantsIsActive: [],
    productDetail: null,
    productVariant: null,
    indexImage: 0,
    color: "",
    size: "",
    images: [],
    quantity: 1,
    recommend: {
      items: [],
      count: 0,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.allSettled([
          instance.get("product", { params: { alias: slug } }),
          instance.get("product/recommend", {
            params: { alias: slug, limit: 10 },
          }),
        ]);
        const { code, message, data } = res[0].value.data;
        const {
          code: code1,
          message: message1,
          data: data1,
        } = res[1].value.data;
        if (
          (code1 === 200 || message1 === "Success") &&
          (code === 200 || message === "Success")
        ) {
          const x = {};
          data.items[0].productVariants.forEach((productVariant) => {
            productVariant.variantValues.forEach((variantValue) => {
              const oldVariantValues = x[variantValue.variant.name] || [];
              if (
                oldVariantValues.findIndex(
                  (item) => item.id === variantValue.id
                ) === -1
              ) {
                oldVariantValues.push(variantValue);
              }
              x[variantValue.variant.name] = oldVariantValues;
            });
          });
          const results = [];

          for (let key of Object.keys(x)) {
            const value = x[key];
            value.sort((a, b) => a.id - b.id);
            results.push({ [key]: value });
          }
          setState((prev) => ({
            ...prev,
            product: data.items[0],
            variants: results,
            images: [
              { path: data.items[0].thumbnail },
              ...data.items[0].productImages,
            ],
            indexImage: 0,
            recommend: data1,
          }));
        }
      } catch (error) {}
    })();
  }, [slug]);

  const handleAddToCart = async () => {
    const { productVariant } = state;
    if (!accessToken) {
      notification.info({ message: "Please login." });
      return;
    }

    if (!productVariant) {
      notification.info({
        message: "Vui lòng chọn đầy đủ thông tin",
      });
      return;
    }

    try {
      const res = await apiCallerWithToken(accessToken, dispatch).post(
        "cart/item",
        {
          quantity: 1,
          productVariantId: productVariant.id,
          productVariant,
        }
      );
      const { code, message, data } = res.data;
      if (code === 201 || message === "Success") {
        dispatch(cartActions.addToCart(data));
        notification.success({ message: "Thêm giỏ hàng thành công" });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: `Đã có lỗi xảy ra. Vui lòng thử lại`,
      });
    }
  };

  const handleClickVariant = (variantValue) => {
    setState((prev) => {
      const variantsIsActive = [
        ...prev.variantsIsActive.filter(
          (_) =>
            _.id !== variantValue.id && _.variant.id !== variantValue.variant.id
        ),
        variantValue,
      ];
      return {
        ...prev,
        variantsIsActive,
        productVariant: prev.product.productVariants.find((_) =>
          _.variantValues.every((v) =>
            variantsIsActive.find((e) => e.id === v.id)
          )
        ),
      };
    });
  };

  const handleChangeQuantity = (newQuantity) => {
    if (newQuantity > 0)
      setState((prev) => ({ ...prev, quantity: newQuantity }));
  };

  if (!state.product) return <></>;
  return (
    <main>
      <div
        className="product-detail"
        style={{ margin: screens.lg ? "0 200px" : "0 12px" }}
      >
        <div>
          <Row gutter={[32, 32]}>
            <Col
              className="gutter-row"
              xs={24}
              lg={12}
              style={{ gap: "4px", display: "flex" }}
            >
              <div style={{ flex: 1 }} className="image_main">
                <img src={state.images[state.indexImage]?.path} alt="" />
              </div>
              <div
                style={{
                  overflowY: "auto",
                  gap: "4px",
                  maxHeight: "70vh",
                  overflowX: "hidden",
                }}
              >
                {state.images.map((image, index) => (
                  <div
                    key={image.path}
                    className="item"
                    style={{
                      height: 80,
                      width: 80,
                      objectFit: "cover",
                      objectPosition: "center",
                      cursor: "pointer",
                      backgroundSize: "cover",
                      backgroundImage: `url(${image.path})`,
                      border:
                        state.indexImage === index
                          ? "1px solid black"
                          : "1px solid transparent",
                      marginTop: index === 0 ? 0 : 4,
                    }}
                    onClick={() =>
                      setState((prev) => ({ ...prev, indexImage: index }))
                    }
                  ></div>
                ))}
              </div>
            </Col>
            <Col className="gutter-row" xs={24} lg={12}>
              <div className="product_infor">
                <div className="header_product-detail">
                  <h2 className="product_name">{state.product?.name}</h2>
                  <div className="box_price" style={{ display: "flex" }}>
                    <div className="new_price" style={{ marginRight: "12px" }}>
                      {castToVND(state.product?.salePrice)}
                    </div>
                    {state.product?.salePrice !== state.product?.price && (
                      <div className="old_price">
                        {castToVND(state.product?.price)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="body_product-detail">
                  {state.variants.map((obj) => (
                    <div className="box_size" key={Object.keys(obj)[0]}>
                      <span className="color">{Object.keys(obj)[0]}</span>
                      <div className="option_select">
                        {obj[Object.keys(obj)[0]].map((variantValue) => (
                          <span
                            className={`select_wrapper ${
                              state.variantsIsActive.find(
                                (_) => _.id === variantValue.id
                              )
                                ? "selected_wrapper"
                                : ""
                            }`}
                            key={variantValue.id}
                            onClick={() => handleClickVariant(variantValue)}
                          >
                            {variantValue.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Space>
                    <div
                      style={{
                        width: 100,
                        display: "flex",
                        alignItems: "center",
                        marginBlock: 8,
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30,
                          border: "1px solid gray",
                          cursor: "pointer",
                          height: 46,
                          userSelect: "none",
                        }}
                        onClick={() => handleChangeQuantity(state.quantity - 1)}
                      >
                        <AiOutlineMinus />
                      </button>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          borderTop: "1px solid gray",
                          borderBottom: "1px solid gray",
                          height: 46,
                        }}
                      >
                        {state.quantity}
                      </div>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30,
                          border: "1px solid gray",
                          cursor: "pointer",
                          height: 46,
                          userSelect: "none",
                        }}
                        onClick={() => handleChangeQuantity(state.quantity + 1)}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    {state.productVariant ? (
                      <div>Còn: {state.productVariant.inventory}</div>
                    ) : null}
                  </Space>
                  <div className="box_buttons">
                    <Button
                      className="btn btn-add-to-cart"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    <HeartIcon product={state.product} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="product-related-box" style={{ padding: "24px 100px" }}>
        <div className="related-box-title">Có thể bạn sẽ thích</div>
        <Row gutter={[16, 16]}>
          {state.recommend.items.map((_) => (
            <Col
              xs={12}
              sm={8}
              md={6}
              key={_.id}
              style={screens.lg ? { maxWidth: "20%", flex: "0 0 20%" } : {}}
            >
              <Product product={_} />
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
};

export default ProductDetailPage;
