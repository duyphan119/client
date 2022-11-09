import { Col, Grid, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Product from "../../components/Product/Product";
import instance from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import "./index.scss";
const { useBreakpoint } = Grid;
const items = [
  {
    display: "Hàng mới",
    alias: "latest",
  },
  {
    display: "Nike",
    alias: "nike",
  },
  {
    display: "Adidas",
    alias: "adidas",
  },
  {
    display: "Vans-converse",
    alias: "vans-converse",
  },
  {
    display: "New Balance",
    alias: "new-balance",
  },
  {
    display: "MLB",
    alias: "mlb",
  },
];
const HomePage = () => {
  useTitle("Trang chủ");
  const screens = useBreakpoint();
  const [itemActive, setItemActive] = useState();
  const [productData, setProductData] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get("product");
        const { code, message, data } = res.data;
        if (code === 200 || message === "Success") {
          setProductData(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (itemActive) {
          const res = await instance.get("product", {
            params: { category_alias: itemActive.alias },
          });
          const { code, message, data } = res.data;
          if (code === 200 || message === "Success") {
            setProductData(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [itemActive]);

  return (
    <main
      style={{
        padding: screens.md ? "0 100px" : "0 12px",
      }}
    >
      <div className="content">
        <section className="banner">
          <a href="/#" style={{ display: "block" }}>
            <img
              alt=""
              src="https://res.cloudinary.com/dwhjftwvw/image/upload/v1667811436/xshop/slide_index_1_fz1pye.jpg"
            />
          </a>
        </section>

        {/* <section className="voucher">
          <div className="voucher-title">
            <h2>Ưu đãi riêng bạn</h2>
          </div>
          <Row gutter={[16, 16]}>
            <Col xl={12}>
              <a href="/#">
                <img
                  alt=""
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662004977/canifa/list_image_tablet1660064322_pdoeco.jpg"
                />
              </a>
            </Col>
            <Col xl={12}>
              <a href="/#">
                <img
                  alt=""
                  src="https://res.cloudinary.com/diot4imoq/image/upload/v1662004977/canifa/list_image_tablet1660064322_pdoeco.jpg"
                />
              </a>
            </Col>
          </Row>
        </section> */}

        {/* <section className="block-endow">
          <div className="block-endow-title">
            <h2>Sản phẩm giá tốt</h2>
          </div>
          <a href="/#">
            <img
              alt=""
              src="https://res.cloudinary.com/diot4imoq/image/upload/v1662007772/canifa/list_image_tablet1646719696_zpgxfv.jpg"
            />
          </a>
        </section> */}

        <section className="new-shoes">
          <ul>
            {items.map((item) => (
              <li key={item.display}>
                {item.alias === "latest" ? (
                  <h2>{item.display}</h2>
                ) : (
                  <div
                    className={
                      item.display === itemActive?.display
                        ? "local-shoes-item active"
                        : "local-shoes-item"
                    }
                    onClick={() => setItemActive(item)}
                  >
                    {item.display}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Row gutter={[24, 24]}>
            {productData?.items.map((product) => {
              return (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  key={product.id}
                  // style={screens.xl ? { maxWidth: "20%", flex: "0 0 25%" } : {}}
                >
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <div className="view-all">
            {itemActive ? (
              <Link to={`/product/category/${itemActive.alias}`}>
                Xem tất cả
              </Link>
            ) : (
              <Link to={`/product/category/${items[0].alias}`}>Xem tất cả</Link>
            )}
          </div>
        </section>

        <section className="block">
          <Row gutter={[16, 16]}>
            <Col xl={12}>
              <div className="block-subscribe">
                <div className="block-title">Đăng ký nhận bản tin</div>
                <div className="block-content">
                  <input type="email" placeholder="Nhập email của bạn..." />
                </div>
              </div>
            </Col>
            <Col xl={12}>
              <div className="block-social">
                <div className="block-title">Kết nối ngay</div>
                <div className="block-img">
                  <img
                    alt=""
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxyZWN0IHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgcng9IjQiIGZpbGw9IiMzMzNGNDgiLz4KPHBhdGggZD0iTTAgNDRWMEg0NFY0NEgwWiIgZmlsbD0iIzMzM0Y0OCIvPgo8cGF0aCBkPSJNMjMuMzg4NCAyOC40NjQzVjQ0LjAwMkgyOS41MTEzVjI4LjQ2NDRIMzQuNTQyNkwzNS4zNDk1IDIyLjEyMTVIMjkuNTExM1YxNy43MTI1QzI5LjUxMTMgMTYuNDgxNSAzMC40NzQ3IDE1LjQ4MzUgMzEuNjYzIDE1LjQ4MzVIMzUuNDQ0NVY5Ljc3OTc5SDMwLjE1OThDMjYuNDIgOS43Nzk3OSAyMy4zODg0IDEyLjkyMDQgMjMuMzg4NCAxNi43OTQ1VjIyLjEyMTRIMTguMzMzM1YyOC40NjQzSDIzLjM4ODRaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiByeD0iNCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
                  />
                  <img
                    alt=""
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOS41NDYgMTAuMDg4OUgxNC40NTQ2QzEyLjA0NjEgMTAuMDg4OSAxMC4wODYyIDEyLjA0ODcgMTAuMDg2MiAxNC40NTczVjI5LjU0ODZDMTAuMDg2MiAzMS45NTc2IDEyLjA0NjEgMzMuOTE3NiAxNC40NTQ2IDMzLjkxNzZIMjkuNTQ2QzMxLjk1NDkgMzMuOTE3NiAzMy45MTQ5IDMxLjk1NzYgMzMuOTE0OSAyOS41NDg2VjE0LjQ1NzNDMzMuOTE0OSAxMi4wNDg4IDMxLjk1NDkgMTAuMDg4OSAyOS41NDYgMTAuMDg4OVpNMjIgMjkuODQ3M0MxNy42NzUxIDI5Ljg0NzMgMTQuMTU1OSAyNi4zMjgxIDE0LjE1NTkgMjIuMDAyN0MxNC4xNTU5IDE3LjY3NzggMTcuNjc1MSAxNC4xNTg2IDIyIDE0LjE1ODZDMjYuMzI1NSAxNC4xNTg2IDI5Ljg0NDYgMTcuNjc3OCAyOS44NDQ2IDIyLjAwMjdDMjkuODQ0NiAyNi4zMjgxIDI2LjMyNTUgMjkuODQ3MyAyMiAyOS44NDczWk0zMC4wOTcgMTUuNzgwN0MyOS4wNzMgMTUuNzgwNyAyOC4yNDA0IDE0Ljk0ODEgMjguMjQwNCAxMy45MjQ3QzI4LjI0MDQgMTIuOTAxMiAyOS4wNzMgMTIuMDY4NiAzMC4wOTcgMTIuMDY4NkMzMS4xMjA0IDEyLjA2ODYgMzEuOTUzIDEyLjkwMTIgMzEuOTUzIDEzLjkyNDdDMzEuOTUzIDE0Ljk0ODIgMzEuMTIwNCAxNS43ODA3IDMwLjA5NyAxNS43ODA3WiIgZmlsbD0iIzMzM0Y0OCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIxLjk5OTYgMTcuNDY4M0MxOS41MDI5IDE3LjQ2ODMgMTcuNDY5NyAxOS41MDA1IDE3LjQ2OTcgMjEuOTk3MkMxNy40Njk3IDI0LjQ5NSAxOS41MDI5IDI2LjUyNzcgMjEuOTk5NiAyNi41Mjc3QzI0LjQ5NzMgMjYuNTI3NyAyNi41MjkxIDI0LjQ5NSAyNi41MjkxIDIxLjk5NzJDMjYuNTI5MSAxOS41MDA1IDI0LjQ5NzMgMTcuNDY4MyAyMS45OTk2IDE3LjQ2ODNaIiBmaWxsPSIjMzMzRjQ4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwVjQ0SDQ0VjBIMFpNMzcuMjI4OCAyOS41NDU2QzM3LjIyODggMzMuNzgyOCAzMy43ODI4IDM3LjIyODggMjkuNTQ1OCAzNy4yMjg4SDE0LjQ1NDRDMTAuMjE3NyAzNy4yMjg4IDYuNzcxMTYgMzMuNzgyOCA2Ljc3MTE2IDI5LjU0NTZWMTQuNDU0NEM2Ljc3MTE2IDEwLjIxNzcgMTAuMjE3NyA2Ljc3MTE2IDE0LjQ1NDQgNi43NzExNkgyOS41NDU4QzMzLjc4MjggNi43NzExNiAzNy4yMjg4IDEwLjIxNzcgMzcuMjI4OCAxNC40NTQ0VjI5LjU0NTZaIiBmaWxsPSIjMzMzRjQ4Ii8+Cjwvc3ZnPgo="
                  />
                  <img
                    alt=""
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHZpZXdCb3g9IjAgMCA0NCA0NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjM0ODggMzIuNTQ2QzE5LjM0ODggMzIuNiAxOS4zNDg4IDMyLjY2NzYgMTkuMzE4OSAzMi43MDUzQzE5LjExNjEgMzIuOTY2OSAxOC44NzQ3IDMzLjE4NTEgMTguNTU4MSAzMy4zMDFDMTguMjgyOSAzMy40MDE0IDE4LjA2MzcgMzMuMjc4OCAxOC4wMDU4IDMyLjk5M0MxNy45ODI2IDMyLjg4IDE3Ljk4MTcgMzIuNzYxMyAxNy45ODE3IDMyLjY0NTRDMTcuOTgwNyAzMC41MTY1IDE3Ljk3NDkgMjYuMTUxNiAxNy45NzIgMjYuMDk4NUgxNi40MDEyQzE2LjQwMTIgMjYuMTU3NCAxNi4zOTkyIDMyLjIzOCAxNi40MDMxIDMzLjM4NjlDMTYuNDA0MSAzMy42OTc4IDE2LjQzNjkgMzQuMDA2NyAxNi41NjYzIDM0LjI5NTRDMTYuNzA1MyAzNC42MDgyIDE2LjkzNjEgMzQuODA2MiAxNy4yNzk4IDM0Ljg2MzFDMTcuNTMxOCAzNC45MDY2IDE3Ljc3OCAzNC44Nzg2IDE4LjAxNzQgMzQuNzk2NUMxOC41MDc5IDM0LjYyNzUgMTguODkyMSAzNC4zMDg5IDE5LjIzMSAzMy45MjY2QzE5LjI2MDkgMzMuODkyOCAxOS4yOTI4IDMzLjg2IDE5LjM0OTggMzMuNzk5MlYzNC43NTMxSDIwLjkyNDVWMzAuNTc5M0MyMC45MjQ1IDI5LjEzMyAyMC45MjQ1IDI2LjA4NSAyMC45MjQ1IDI2LjA4NUwxOS4zNDg4IDI2LjA4ODhWMzIuNTQ2WiIgZmlsbD0iIzMzM0Y0OCIvPgo8cGF0aCBkPSJNMjYuNzkyNiAyNi43NzQ3QzI2LjQ2MDUgMjYuMDY3IDI1Ljc2MjQgMjUuODc5NyAyNS4xNTcxIDI2LjAzMTNDMjQuNzkwMiAyNi4xMjQgMjQuNDkyOCAyNi4zMzU0IDI0LjI0ODUgMjYuNjA4N0MyNC4xNjc0IDI2LjcwMDQgMjQuMDc4NiAyNi44NzggMjQuMDc4NiAyNi44NzhDMjQuMDc4NiAyNi44NzggMjQuMDc4NiAyNC4yNjQ1IDI0LjA3ODYgMjMuMDE1MUgyMi41MDFWMzQuNzUwNkgyNC4wNzg2VjM0LjA5MjFDMjQuMDc4NiAzNC4wOTIxIDI0LjE5MDYgMzQuMjEwOSAyNC4yMzEyIDM0LjI1NDNDMjQuNTkzMiAzNC42NDczIDI1LjAzMjUgMzQuODYyNiAyNS41NzQxIDM0Ljg2NzRDMjYuMjQwMyAzNC44NzQyIDI2LjcwMzggMzQuNTUxNyAyNi45MTQyIDMzLjkxODNDMjcuMDExNyAzMy42MjM5IDI3LjA0MzYgMzMuMzIwNyAyNy4wNDQ2IDMzLjAxMzdDMjcuMDQ2NSAzMS4zNzMzIDI3LjA0NjUgMjkuNzMzIDI3LjA0MzYgMjguMDkyNkMyNy4wNDM2IDI3LjYzODggMjYuOTg4NiAyNy4xOTI5IDI2Ljc5MjYgMjYuNzc0N1pNMjUuNDE5NyAzMi44MTc4QzI1LjQxOTcgMzIuOTA1NiAyNS40MDkgMzIuOTk0NSAyNS4zOTA3IDMzLjA4MDRDMjUuMzE4MyAzMy40MjQxIDI1LjA1NjYgMzMuNTc4NiAyNC42ODU5IDMzLjUwMjNDMjQuNDYxIDMzLjQ1NiAyNC4yODUyIDMzLjMyNjYgMjQuMTM0NiAzMy4xNjM0QzI0LjEyNzkgMzMuMTU1NyAyNC4wODM1IDMzLjA5NTggMjQuMDgzNSAzMy4wOTU4VjMyLjk2NzRMMjQuMDc5NiAyNy43NTY3QzI0LjA3OTYgMjcuNzU2NyAyNC4xMTM0IDI3LjY2MDIgMjQuMTg3NyAyNy41OTU1QzI0LjM3MzEgMjcuNDMxNCAyNC41Nzc4IDI3LjMyOCAyNC44MzM2IDI3LjM1MzFDMjUuMDUxOCAyNy4zNzQ0IDI1LjIyNTYgMjcuNDc0OCAyNS4zMDY3IDI3LjY3NjZDMjUuMzY3NSAyNy44MzAxIDI1LjQxNTggMjguMDAxIDI1LjQxNjggMjguMTY1MUMyNS40MjQ1IDI5LjcxNTYgMjUuNDIxNiAzMS4yNjYyIDI1LjQxOTcgMzIuODE3OFoiIGZpbGw9IiMzMzNGNDgiLz4KPHBhdGggZD0iTTIxLjEyMDcgMTYuNTQ5MkMyMS40ODg1IDE2LjU0OTIgMjEuNzg3NyAxNi4yNSAyMS43ODc3IDE1Ljg4MjJWMTEuMTc1NEMyMS43ODc3IDEwLjgwNzUgMjEuNDg4NCAxMC41MDgzIDIxLjEyMDcgMTAuNTA4M0MyMC43NTI5IDEwLjUwODMgMjAuNDUzNiAxMC44MDc2IDIwLjQ1MzYgMTEuMTc1NFYxNS44ODIyQzIwLjQ1MzUgMTYuMjQ5OSAyMC43NTI4IDE2LjU0OTIgMjEuMTIwNyAxNi41NDkyWiIgZmlsbD0iIzMzM0Y0OCIvPgo8cGF0aCBkPSJNMTYuNDA0NCAyMy4wMTQySDEwLjkzOThWMjQuNjk1OUgxMi43ODFWMzQuNzQ5NkgxNC41NTk0VjI0LjY5MjFIMTYuNDA0NFYyMy4wMTQyWiIgZmlsbD0iIzMzM0Y0OCIvPgo8cGF0aCBkPSJNMzEuMyAzMS42NzM2VjMyLjc4NjhDMzEuMyAzMy4xNzU5IDMwLjk4NTIgMzMuNDkwNiAzMC41OTcxIDMzLjQ5MDZDMzAuMjA4IDMzLjQ5MDYgMjkuODkzMyAzMy4xNzU5IDI5Ljg5MzMgMzIuNzg2OFYzMC42MjEySDMyLjkxNDNDMzIuOTE0MyAzMC42MjEyIDMyLjkzMTcgMjkuMTEwMiAzMi45MTkxIDI4LjQyNDhDMzIuOTE0MyAyOC4xMzIyIDMyLjg5MjEgMjcuODM1OCAzMi44MzIyIDI3LjU1QzMyLjY3NTggMjYuODA4NSAzMi4yNzcxIDI2LjI0OTUgMzEuNTMwNyAyNi4wMDQzQzMxLjMxMTYgMjUuOTMxOSAzMS4wNzYgMjUuODk0MiAzMC44NDUyIDI1Ljg3OTdDMzAuMDc3NyAyNS44MzA1IDI5LjQwNTcgMjYuMDQ5NyAyOC44ODA1IDI2LjYzNzZDMjguNDE5OSAyNy4xNTIzIDI4LjI1OTcgMjcuNzcyMSAyOC4yNTg3IDI4LjQ0NDFDMjguMjU1OCAyOS43MjkxIDI4LjI1IDMxLjAxNTEgMjguMjYyNiAzMi4zMDAyQzI4LjI2NjQgMzIuNjI3NSAyOC4zMDMxIDMyLjk2MTYgMjguMzc3NSAzMy4yODAyQzI4LjUzNzcgMzMuOTY0NyAyOC45MTE0IDM0LjUwMjUgMjkuNTcwOCAzNC43OTk4QzMwLjA1MjYgMzUuMDE4IDMwLjU2MTQgMzUuMDI4NiAzMS4wNzUgMzQuOTUzM0MzMS45MDM0IDM0LjgzMTcgMzIuNDY4MiAzNC4zODc2IDMyLjc0MTQgMzMuNTg3MkMzMi45NDcxIDMyLjk4NzYgMzIuOTIzIDMxLjY3MzYgMzIuOTIzIDMxLjY3MzZIMzEuM1pNMjkuODkzMyAyOC4wNjI4QzI5Ljg5MzMgMjcuNjc0NyAzMC4yMDggMjcuMzU5IDMwLjU5NzEgMjcuMzU5QzMwLjk4NTIgMjcuMzU5IDMxLjMgMjcuNjc0NyAzMS4zIDI4LjA2MjhWMjkuMjc4M0gyOS44OTMzVjI4LjA2MjhaIiBmaWxsPSIjMzMzRjQ4Ii8+CjxwYXRoIGQ9Ik0wIDBWNDRINDRWMEgwWk0yNC43ODczIDkuMTcxMTFIMjYuMzg5NlYxNS44MTU3QzI2LjM4OTYgMTUuOTAzNyAyNi4zOTY3IDE1Ljk5MjcgMjYuNDEyMSAxNi4wNzlDMjYuNDYwNyAxNi4zNTI4IDI2LjY2MzEgMTYuNDgxNyAyNi45MjY4IDE2LjM5MDNDMjcuMjQ4MiAxNi4yNzkxIDI3LjQ5MzUgMTYuMDU2NSAyNy43MDE1IDE1Ljc5NDNDMjcuNzMxMSAxNS43NTY5IDI3LjcyNTYgMTUuNjg3IDI3LjcyNTYgMTUuNjMyVjkuMTcxMTFIMjkuMzM5NkwyOS4zMzkyIDE3Ljg4NEgyNy43MjQ4TDI3LjcyNjcgMTYuOTQ4QzI3LjU0ODIgMTcuMTIzOCAyNy4zOTU4IDE3LjI4OCAyNy4yMjg0IDE3LjQzNTVDMjYuOTMxNiAxNy42OTcgMjYuNTk1NSAxNy44OTE5IDI2LjIwMjIgMTcuOTY4OUMyNS41OTg1IDE4LjA4NjkgMjUuMDg0MyAxNy44OTYxIDI0Ljg5MTggMTcuMjcwOEMyNC44Mjc3IDE3LjA2MjYgMjQuNzg4OSAxNi44MzgxIDI0Ljc4NzMgMTYuNjIwN1Y5LjE3MTExWk0yMS4xMjAyIDguOTUzMDFDMjIuMzk3IDguOTUzMDEgMjMuNDMyIDkuOTg4MDEgMjMuNDMyIDExLjI2NDhWMTUuNzg4OUMyMy40MzIgMTcuMDY1NyAyMi4zOTcgMTguMTAwNyAyMS4xMjAyIDE4LjEwMDdDMTkuODQzNSAxOC4xMDA3IDE4LjgwODUgMTcuMDY1NyAxOC44MDg1IDE1Ljc4ODlWMTEuMjY0OEMxOC44MDg0IDkuOTg4MDEgMTkuODQzNCA4Ljk1MzAxIDIxLjEyMDIgOC45NTMwMVpNMTQuOTAxNSA2LjA4OTI5QzE0LjkwMTUgNi4wODkyOSAxNS42MzU4IDkuMjA3OSAxNS45ODYzIDEwLjY4NTJIMTUuOTg2OEMxNi4zMzczIDkuMjA3OSAxNy4wNzE2IDYuMDg5MjkgMTcuMDcxNiA2LjA4OTI5SDE4LjkwODhDMTguOTA4OCA2LjA4OTI5IDE3LjQ5NzIgMTAuNzcwNiAxNi44NjYgMTIuODU4NEMxNi44NDMyIDEyLjkzMzggMTYuODMyOSAxMy4wMTU5IDE2LjgzMjkgMTMuMDk0OUwxNi44MzM3IDE3Ljg4MjJIMTUuMTM5NUwxNS4xNDAyIDEzLjA5NDlDMTUuMTQwMiAxMy4wMTU5IDE1LjEyOTggMTIuOTMzOSAxNS4xMDcxIDEyLjg1ODRDMTQuNDc1OSAxMC43NzA2IDEzLjA2NDMgNi4wODkyOSAxMy4wNjQzIDYuMDg5MjlIMTQuOTAxNVpNMzUuMTAyOSAzMy44NzU0QzM1LjEwMjkgMzYuMDE2OCAzMy4zOTIxIDM3Ljc2NjMgMzEuMjUxNiAzNy44MTE2QzI1LjA4NTEgMzcuOTQzOSAxOC45MTU2IDM3Ljk0MzkgMTIuNzQ4MSAzNy44MTE2QzEwLjYwODYgMzcuNzY2MyA4Ljg5Nzc4IDM2LjAxNjggOC44OTc3OCAzMy44NzU0VjI0LjI0MzdDOC44OTc3OCAyMi4xMDMzIDEwLjYwODYgMjAuMzUzOCAxMi43NDgxIDIwLjMwODRDMTguOTE1NiAyMC4xNzYyIDI1LjA4NTEgMjAuMTc2MiAzMS4yNTE2IDIwLjMwODRDMzMuMzkyMSAyMC4zNTM4IDM1LjEwMjkgMjIuMTAzMyAzNS4xMDI5IDI0LjI0MzdWMzMuODc1NFoiIGZpbGw9IiMzMzNGNDgiLz4KPC9zdmc+Cg=="
                  />
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
