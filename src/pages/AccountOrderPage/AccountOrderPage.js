import { DatePicker, Popconfirm, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";
import { castToVND, formatDate, formatDateTime } from "../../utils";
import "./index.scss";
const AccountOrderPage = () => {
  useTitle("Đơn hàng của tôi");
  const [orderData, setOrderData] = useState();
  const { accessToken } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    begin: formatDate(new Date()),
    end: formatDate(new Date()),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCallerWithToken(accessToken, dispatch).get(
          "order/account"
        );
        const { code, message, data } = res.data;
        if (code === 200 || message === "Success") {
          setOrderData(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch]);

  const getTotalPrice = (order) => {
    const firstPrice = order.items.reduce(
      (p, orderItem) => p + orderItem.quantity * orderItem.price,
      0
    );
    return order.coupon ? firstPrice - order.coupon.priceDiscount : firstPrice;
  };

  const handleConfirm = async (id) => {
    try {
      const res1 = await apiCallerWithToken(accessToken, dispatch).delete(
        "order/" + id
      );
      const { code: code1, message: message1 } = res1.data;
      if (code1 === 200 || message1 === "Success") {
        const res = await apiCallerWithToken(accessToken, dispatch).get(
          "order/account"
        );
        const { code, message, data } = res.data;
        if (code === 200 || message === "Success") {
          setOrderData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="my-order">
      <div className="content">
        <h3>Đơn hàng của tôi</h3>
        <div className="order-list">
          <div style={{ marginBlock: 8 }}>
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              onChange={([begin, end]) => {
                setState({
                  begin: formatDate(begin.toDate()),
                  end: formatDate(end.toDate()),
                });
                (async () => {
                  try {
                    const res = await apiCallerWithToken(
                      accessToken,
                      dispatch
                    ).get("order/account", { params: { begin, end } });
                    const { code, message, data } = res.data;
                    if (code === 200 || message === "Success") {
                      setOrderData(data);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                })();
              }}
            />
          </div>
          <table className="table-order-items">
            <thead>
              <tr>
                <th className="common-th id">Đơn hàng</th>
                <th className="common-th date">Ngày đặt</th>
                <th className="common-th qty">Số lượng</th>
                <th className="common-th total">Tổng tiền</th>
                <th className="common-th status">Trạng thái</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {orderData?.items.map((order) => {
                console.log("order: ", order);
                return (
                  <tr key={order.id}>
                    <td className="common-th id">{order.id}</td>
                    <td className="common-th date">
                      {formatDateTime(order.createdAt)}
                    </td>
                    <td className="common-th qty">
                      {order.items.reduce(
                        (p, orderItem) => p + orderItem.quantity,
                        0
                      )}
                    </td>
                    <td className="common-th total">
                      {castToVND(getTotalPrice(order))}
                    </td>
                    <td className="common-th status">{order.status}</td>
                    <td className="common-th">
                      {order.status === "Đang xử lý" ? (
                        <Popconfirm
                          placement="topRight"
                          title="Chắc chắn hủy đơn hàng ?"
                          onConfirm={() => handleConfirm(order.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button
                            style={{
                              color: "red",
                              textDecoration: "underline",
                              border: "none",
                              backgroundColor: "inherit",
                              cursor: "pointer",
                            }}
                          >
                            Hủy
                          </button>
                        </Popconfirm>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AccountOrderPage;
