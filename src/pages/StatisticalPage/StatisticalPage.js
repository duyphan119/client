import { Button, Col, Form, Layout, Row, Select } from "antd";
import { BarElement, Chart as ChartJS, LinearScale, Title } from "chart.js";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import HeaderTitle from "../../components/HeaderTitle";
import { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";
import "./index.scss";

ChartJS.register(BarElement, LinearScale, Title);
const { Content } = Layout;

const StatisticalPage = () => {
  const [state, setState] = useState({
    revenueYYYY: [],
    revenueMMYYYY: [],
    revenueDDMMYYYY: [],
  });

  const { accessToken } = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const res = await Promise.allSettled([
          apiCallerWithToken(accessToken, dispatch).get("statistics/revenue", {
            params: { day, month, year },
          }),
          apiCallerWithToken(accessToken, dispatch).get("statistics/revenue", {
            params: { month, year },
          }),
          apiCallerWithToken(accessToken, dispatch).get("statistics/revenue", {
            params: { year },
          }),
        ]);
        let revenueDDMMYYYY, revenueMMYYYY, revenueYYYY;
        if (res[0].status === "fulfilled") {
          const {
            code: code1,
            message: message1,
            data: data1,
          } = res[0].value.data;
          if (code1 === 200 || message1 === "Success") {
            revenueDDMMYYYY = data1;
          }
        }
        if (res[1].status === "fulfilled") {
          const {
            code: code2,
            message: message2,
            data: data2,
          } = res[1].value.data;
          if (code2 === 200 || message2 === "Success") {
            revenueMMYYYY = data2;
          }
        }
        if (res[2].status === "fulfilled") {
          const {
            code: code3,
            message: message3,
            data: data3,
          } = res[2].value.data;
          if (code3 === 200 || message3 === "Success") {
            revenueYYYY = data3;
          }
        }
        setState({ revenueDDMMYYYY, revenueMMYYYY, revenueYYYY });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch]);

  const onFinish = async (values) => {
    //
    try {
      const res = await Promise.allSettled([
        apiCallerWithToken(accessToken, dispatch).get("statistics/revenue", {
          params: { day: values.day, month: values.month, year: values.year },
        }),
        apiCallerWithToken(accessToken, dispatch).get("statistics/revenue", {
          params: { month: values.month, year: values.year },
        }),
        apiCallerWithToken(accessToken, dispatch).get("statistics/revenue", {
          params: { year: values.year },
        }),
      ]);
      let revenueDDMMYYYY, revenueMMYYYY, revenueYYYY;
      if (res[0].status === "fulfilled") {
        const {
          code: code1,
          message: message1,
          data: data1,
        } = res[0].value.data;
        if (code1 === 200 || message1 === "Success") {
          revenueDDMMYYYY = data1;
        }
      }
      if (res[1].status === "fulfilled") {
        const {
          code: code2,
          message: message2,
          data: data2,
        } = res[1].value.data;
        if (code2 === 200 || message2 === "Success") {
          revenueMMYYYY = data2;
        }
      }
      if (res[2].status === "fulfilled") {
        const {
          code: code3,
          message: message3,
          data: data3,
        } = res[2].value.data;
        if (code3 === 200 || message3 === "Success") {
          revenueYYYY = data3;
        }
      }
      setState({ revenueDDMMYYYY, revenueMMYYYY, revenueYYYY });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);
  return (
    <Content className="common-layout-content-cus">
      <div className="common-content-wrap">
        <div className="common-content" style={{ padding: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form
                initialValues={{
                  day: new Date().getDate(),
                  month: new Date().getMonth() + 1,
                  year: new Date().getFullYear(),
                }}
                onFinish={onFinish}
                style={{ display: "flex" }}
              >
                <Form.Item style={{ marginRight: 8 }} label="Ngày" name="day">
                  <Select>
                    {new Array(31).fill("").map((_, index) => {
                      return (
                        <Select.Option key={index} value={index + 1}>
                          {index + 1}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginRight: 8 }}
                  label="Tháng"
                  name="month"
                >
                  <Select>
                    {new Array(12).fill("").map((_, index) => {
                      return (
                        <Select.Option key={index} value={index + 1}>
                          {index + 1}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginRight: 8 }} label="Năm" name="year">
                  <Select>
                    {new Array(50).fill("").map((_, index) => {
                      return (
                        <Select.Option
                          key={index}
                          value={new Date().getFullYear() - index}
                        >
                          {new Date().getFullYear() - index}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  View
                </Button>
              </Form>
            </Col>
            <Col xs={24}>
              <div
                className=""
                style={{ boxShadow: "0 0 2px 0 #567777", padding: 8 }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Revenue {new Date().getDate()}/{new Date().getMonth() + 1}/
                  {new Date().getFullYear()}
                </div>
                <Bar
                  data={{
                    labels: new Array(24)
                      .fill("")
                      .map((_, index) => index + "h"),
                    datasets: [
                      {
                        label: "Revenue",
                        data: new Array(24).fill("").map((_, index) => {
                          const x = state.revenueDDMMYYYY.find(
                            (item) => item.hour === index
                          );
                          return x ? x.revenue : 0;
                        }),
                        fill: false,
                        tension: 0.1,
                        backgroundColor: "rgb(24, 144, 255)",
                        borderColor: "rgb(24, 144, 255)",
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
                  Revenue {new Date().getMonth() + 1}/{new Date().getFullYear()}
                </div>
                <Bar
                  data={{
                    labels: new Array(31).fill("").map((_, index) => index + 1),
                    datasets: [
                      {
                        label: "Revenue",
                        data: new Array(31).fill("").map((_, index) => {
                          const x = state.revenueMMYYYY.find(
                            (item) => item.day === index + 1
                          );
                          return x ? x.revenue : 0;
                        }),
                        fill: false,
                        borderColor: "rgb(24, 144, 255)",
                        tension: 0.1,
                        backgroundColor: "rgb(24, 144, 255)",
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
                  Revenue {new Date().getFullYear()}
                </div>
                <Bar
                  data={{
                    labels: new Array(12).fill("").map((_, index) => index + 1),
                    datasets: [
                      {
                        label: "Revenue",
                        data: new Array(12).fill("").map((_, index) => {
                          const x = state.revenueYYYY.find(
                            (item) => item.month === index + 1
                          );
                          return x ? x.revenue : 0;
                        }),
                        fill: false,
                        borderColor: "rgb(24, 144, 255)",
                        tension: 0.1,
                        backgroundColor: "rgb(24, 144, 255)",
                      },
                    ],
                  }}
                  height={80}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default StatisticalPage;
