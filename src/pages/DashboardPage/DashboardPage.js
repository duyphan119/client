import { Col, Layout, Row } from "antd";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";
import { castToVND, formatDateTime } from "../../utils";

ChartJS.register(LineElement, PointElement, LinearScale, Title);
const { Content } = Layout;

const DashboardPage = () => {
  useTitle("Dashboard");
  const [state, setState] = useState({
    revenueToday: [],
    count: [],
    orderData: {
      items: [],
      count: 0,
    },
  });

  const { accessToken } = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.allSettled([
          apiCallerWithToken(accessToken, dispatch).get("statistics/revenue"),
          apiCallerWithToken(accessToken, dispatch).get("statistics/count"),
          apiCallerWithToken(accessToken, dispatch).get("order"),
        ]);
        let revenueToday = [],
          count,
          orderData;
        if (res[0].status === "fulfilled") {
          const {
            code: code1,
            message: message1,
            data: data1,
          } = res[0].value.data;
          if (code1 === 200 || message1 === "Success") {
            revenueToday = data1;
          }
        }
        if (res[1].status === "fulfilled") {
          const {
            code: code2,
            message: message2,
            data: data2,
          } = res[1].value.data;
          if (code2 === 200 || message2 === "Success") {
            count = data2;
          }
        }
        if (res[2].status === "fulfilled") {
          const {
            code: code3,
            message: message3,
            data: data3,
          } = res[2].value.data;
          if (code3 === 200 || message3 === "Success") {
            orderData = data3;
          }
        }
        setState({ revenueToday, count, orderData });
      } catch (error) {}
    })();
  }, [accessToken, dispatch]);

  const getTotalPrice = (order) => {
    const firstPrice = order.items.reduce(
      (p, orderItem) => p + orderItem.quantity * orderItem.price,
      0
    );

    return order.coupon ? firstPrice - order.coupon.priceDiscount : firstPrice;
  };

  return (
    <Content className="common-layout-content-cus">
      <div className="common-content-wrap">
        <div className="common-content" style={{ padding: 16 }}>
          <Row gutter={[16, 16]}>
            {state.count[1] &&
              Object.keys(state.count[1]).map((key) => {
                return (
                  <Col xs={8} key={key}>
                    <div
                      className=""
                      style={{
                        boxShadow: "0 0 2px 0 #567777",
                        padding: 8,
                        borderRadius: "5px",
                      }}
                    >
                      <div className="" style={{ textTransform: "capitalize" }}>
                        {key === "product"
                          ? "Sản phẩm"
                          : key === "order"
                          ? "Đơn hàng"
                          : key === "account"
                          ? "Tài khoản"
                          : ""}
                      </div>
                      <div className="">
                        {state.count[1][key]}
                        {state.count[1][key] < state.count[0][key] && (
                          <BsChevronDown style={{ color: "red" }} />
                        )}
                        {state.count[1][key] > state.count[0][key] && (
                          <BsChevronUp style={{ color: "green" }} />
                        )}
                      </div>
                      <span style={{ fontSize: 12 }}>
                        Tháng trước ({state.count[0][key]})
                      </span>
                    </div>
                  </Col>
                );
              })}
            <Col xs={24}>
              <div
                className=""
                style={{ boxShadow: "0 0 2px 0 #567777", padding: 8 }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Doanh thu hôm nay
                </div>
                <Line
                  data={{
                    labels: new Array(24)
                      .fill("")
                      .map((_, index) => index + "h"),
                    datasets: [
                      {
                        label: "Revenue",
                        data: new Array(24).fill("").map((_, index) => {
                          const x = state.revenueToday.find(
                            (item) => item.hour === index
                          );
                          return x ? x.revenue : 0;
                        }),
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                      },
                    ],
                  }}
                  height={80}
                />
              </div>
            </Col>
            <Col xs={24}>
              <div
                className=""
                style={{ boxShadow: "0 0 2px 0 #567777", padding: 8 }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Đơn hàng gần đây
                </div>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "4px 0",
                          boxShadow: "0 0 1px 0 #333",
                        }}
                      >
                        Đơn hàng
                      </th>
                      <th
                        style={{
                          padding: "4px 0",
                          boxShadow: "0 0 1px 0 #333",
                        }}
                      >
                        Ngày đặt
                      </th>
                      <th
                        style={{
                          padding: "4px 0",
                          boxShadow: "0 0 1px 0 #333",
                        }}
                      >
                        Số lượng
                      </th>
                      <th
                        style={{
                          padding: "4px 0",
                          boxShadow: "0 0 1px 0 #333",
                        }}
                      >
                        Tổng tiền
                      </th>
                      <th
                        style={{
                          padding: "4px 0",
                          boxShadow: "0 0 1px 0 #333",
                        }}
                      >
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.orderData.items.map((order) => {
                      return (
                        <tr key={order.id}>
                          <td
                            style={{
                              textAlign: "center",
                              boxShadow: "0 0 1px 0 #333",
                            }}
                          >
                            {order.id}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              boxShadow: "0 0 1px 0 #333",
                            }}
                          >
                            {formatDateTime(order.createdAt)}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              boxShadow: "0 0 1px 0 #333",
                            }}
                          >
                            {order.items.reduce(
                              (p, orderItem) => p + orderItem.quantity,
                              0
                            )}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              boxShadow: "0 0 1px 0 #333",
                            }}
                          >
                            {castToVND(getTotalPrice(order))}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              boxShadow: "0 0 1px 0 #333",
                            }}
                          >
                            {order.status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Link
                  to="/admin/order"
                  style={{
                    color: "blue",
                    fontSize: 14,
                    textDecoration: "underline",
                    marginTop: 8,
                    display: "block",
                  }}
                >
                  View all
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default DashboardPage;
