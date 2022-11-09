import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../config/configAxios";
import { castToVND } from "../../utils";
const SearchInput = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    q: "",
    result: { items: [], count: 0 },
    visible: false,
  });
  const { q, result, visible } = state;
  const ref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, visible: false, q: "" }));
    navigate("/search?q=" + q);
  };

  useEffect(() => {
    const timerId = setTimeout(async () => {
      try {
        if (q !== "") {
          const res = await instance.get("product", { params: { q } });
          const { code, message, data } = res.data;
          (code === 200 || message === "Success") &&
            setState((prev) => ({ ...prev, result: data }));
        } else {
          setState((prev) => ({ ...prev, result: { items: [], count: 0 } }));
        }
      } catch (error) {
        console.log(error);
      }
    }, 555);
    return () => clearTimeout(timerId);
  }, [q]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    setState((prev) => ({
      ...prev,
      visible: ref.current.contains(e.target) ? true : false,
    }));
  };

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <form onSubmit={handleSubmit} className="header-search">
        <Input
          value={q}
          onChange={(e) => setState((prev) => ({ ...prev, q: e.target.value }))}
          placeholder="Bạn cần tìm gì....."
          prefix={<SearchOutlined />}
          allowClear
          width={240}
          size="large"
          // onBlur={() => setVisible(false)}
          // onFocus={() => setVisible(true)}
        />
      </form>
      {visible && result.count > 0 ? (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              maxHeight: 250,
            }}
          >
            {result.items.map((product) => (
              <>
                <Link
                  to={`/product/${product.alias}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: 3,
                  }}
                  key={product.id}
                  onClick={() =>
                    setState((prev) => ({ ...prev, visible: false, q: "" }))
                  }
                >
                  <Avatar
                    src={product.thumbnail}
                    alt=""
                    style={{ width: 52, height: 52 }}
                    shape="square"
                  />
                  <div>
                    <div className="three-dot three-dot-1">{product.name}</div>
                    <div style={{ color: "gray", fontSize: 13 }}>
                      {castToVND(product.salePrice)}
                      {product.price !== product.salePrice ? (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "red",
                            marginLeft: 6,
                          }}
                        >
                          {castToVND(product.price)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgb(169, 169, 170)",
                    marginBlock: 3,
                  }}
                ></div>
              </>
            ))}
          </div>
          {result.count > 0 ? (
            <Link
              to={"/search?q=" + q}
              style={{ display: "block", textAlign: "center" }}
              onClick={() =>
                setState((prev) => ({ ...prev, visible: false, q: "" }))
              }
            >
              Xem tất cả
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
