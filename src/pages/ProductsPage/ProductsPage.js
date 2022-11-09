import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Col, Pagination, Row, Select } from "antd";
import Product from "../../components/Product/Product";
import { useParams } from "react-router-dom";
import instance from "../../config/configAxios";
import VariantFilter from "./VariantFilter";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
const { Option } = Select;

const prices = [
  {
    label: "Tất cả",
    query: null,
  },
  {
    label: "Dưới 500.000",
    query: {
      max_price: 500000,
    },
  },
  {
    label: "Từ 500.000 đến 1.000.000",
    query: {
      min_price: 500000,
      max_price: 1000000,
    },
  },
  {
    label: "Trên 1.000.000",
    query: {
      min_price: 1000000,
    },
  },
];

const sorts = [
  {
    label: "Mặc định",
    query: null,
  },
  {
    label: "Giá thấp đến cao",
    query: {
      sort_by: "salePrice",
      sort_type: "asc",
    },
  },
  {
    label: "Giá cao đến thấp",
    query: {
      sort_by: "salePrice",
      sort_type: "desc",
    },
  },
  {
    label: "Tên A - Z",
    query: {
      sort_by: "name",
      sort_type: "asc",
    },
  },
  {
    label: "Tên Z - A",
    query: {
      sort_by: "name",
      sort_type: "desc",
    },
  },
];

const ProductsPage = () => {
  const { slug } = useParams();
  const [state, setState] = useState({
    products: [],
    count: 0,
    variantValues: [],
    selectedVariantValueIds: [],
    priceQuery: null,
    sortQuery: null,
    page: 1,
    pageSize: 24,
    size: "",
    color: "",
  });

  useEffect(() => {
    (async () => {
      const res = await Promise.allSettled([
        instance.get("product", {
          params: {
            limit: state.pageSize,
            p: state.page,
            ...(slug === "latest" ? {} : { category_alias: slug }),
          },
        }),
      ]);
      let products = [];
      let count = 0;

      if (res[0].status === "fulfilled") {
        const { code, message, data } = res[0].value.data;
        if (code === 200 || message === "Success") {
          products = data.items;
          count = data.count;
        }
      }

      setState((prev) => ({ ...prev, products, count }));
    })();
  }, [slug, state.page, state.pageSize]);

  // const handleChangeVariant = (value) => {
  // 	setState((prev) => ({ ...prev, selectedVariantValueIds: value === -1 ? [] : [...prev.selectedVariantValueIds.filter((e) => e !== value), value] }));
  // };

  const handleFilter = () => {
    (async () => {
      const res = await Promise.allSettled([
        instance.get("product", {
          params: {
            limit: state.pageSize,
            p: state.page,
            ...(slug === "latest" ? {} : { category_alias: slug }),
            ...(state.size !== "" ? { size: state.size } : {}),
            ...(state.priceQuery ? state.priceQuery : {}),
            ...(state.sortQuery ? state.sortQuery : {}),
          },
        }),
      ]);
      let products = [];
      let count = 0;

      if (res[0].status === "fulfilled") {
        const { code, message, data } = res[0].value.data;
        if (code === 200 || message === "Success") {
          products = data.items;
          count = data.count;
        }
      }

      setState((prev) => ({ ...prev, products, count }));
    })();
  };

  const handleChangeSize = (value) => {
    setState((prev) => ({ ...prev, size: value }));
  };

  const handleChangePrice = (value) => {
    setState((prev) => ({
      ...prev,
      priceQuery: prices.find((p) => p.label === value).query,
    }));
  };

  const handleChangeSort = (value) => {
    setState((prev) => ({
      ...prev,
      sortQuery: sorts.find((s) => s.label === value).query,
    }));
  };

  const handleChangePage = (page, pageSize) => {
    setState((prev) => ({ ...prev, page, pageSize }));
  };
  return (
    <main>
      <div className="header_filter">
        <VariantFilter onChange={handleChangeSize} />
        <div className="select_option">
          <p className="title_select">Chọn giá</p>
          <Select
            defaultValue={prices[0].label}
            style={{
              width: "100%",
            }}
            onChange={handleChangePrice}
          >
            {prices.map((price) => {
              return (
                <Option key={price.label} value={price.label}>
                  {price.label}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="select_option">
          <p className="title_select">Sắp xếp theo</p>
          <Select
            defaultValue={sorts[0].label}
            style={{
              width: "100%",
            }}
            onChange={handleChangeSort}
          >
            {sorts.map((s) => {
              return (
                <Option key={s.label} value={s.label}>
                  {s.label}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f1f1f1",
          display: "flex",
          justifyContent: "center",
          paddingBottom: 16,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            maxWidth: 100,
            padding: "4px 16px",
            cursor: "pointer",
            backgroundColor: "#000",
            color: "#fff",
          }}
          onClick={handleFilter}
        >
          <RiSearchLine /> Tìm
        </button>
      </div>
      <div
        style={{
          padding: "40px 100px",
        }}
      >
        <Row gutter={[16, 16]}>
          {state.products.map((product) => {
            return (
              <Col lg={6} md={8} xl={4} xs={12} key={product.id}>
                <Product product={product} />
              </Col>
            );
          })}
          {state.count > state.pageSize ? (
            <Col xs={24} style={{ textAlign: "center" }}>
              <Pagination
                total={state.count}
                onChange={handleChangePage}
                current={state.page}
                pageSize={state.pageSize}
              />
            </Col>
          ) : null}
        </Row>
      </div>
    </main>
  );
};

export default ProductsPage;
