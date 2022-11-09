import React from "react";
import "./index.scss";
import "antd/dist/antd.min.css";
import { Col, Grid, Row } from "antd";
const { useBreakpoint } = Grid;
const Footer = () => {
  const screens = useBreakpoint();
  return (
    <footer>
      <div
        className="footer-content"
        style={{
          padding: screens.lg ? "40px 100px" : "40px 12px",
        }}
      >
        <Row className="footer-content-row" gutter={[36, 36]}>
          <Col lg={6} xs={24}>
            <h3>Công ty cổ phần shoes</h3>
            <p>
              Số ĐKKD: 0107574310, ngày cấp: 23/09/2016, nơi cấp: Sở Kế hoạch và
              đầu tư Hà Nội
            </p>
            <p>
              Trụ sở chính: Số 688, Đường Quang Trung, Phường La Khê, Quận Hà
              Đông, Hà Nội, Việt Nam
            </p>
            <p>
              Địa chỉ liên hệ: Phòng 301 Tòa nhà GP Invest, 170 La Thành, P. Ô
              Chợ Dừa, Q. Đống Đa, Hà Nội
            </p>
            <p>Số điện thoại: +8424 - 7303.0222</p>
            <p>Fax: +8424 - 6277.6419</p>
            <p>Địa chỉ email: pttkhdt@gmail.com</p>
          </Col>
          <Col lg={6} xs={24} className="footer-link">
            <h3>Thương hiệu</h3>
            <ul>
              <li>
                <a href=" ">Giới thiệu</a>
              </li>
              <li>
                <a href=" ">Tin tức</a>
              </li>
              <li>
                <a href=" ">Tuyển dụng</a>
              </li>
              <li>
                <a href=" ">Với cộng đồng</a>
              </li>
              <li>
                <a href=" ">Hệ thống cửa hàng</a>
              </li>
              <li>
                <a href=" ">Liên hệ</a>
              </li>
            </ul>
          </Col>
          <Col lg={6} xs={24} className="footer-link">
            <h3>Hỗ trợ</h3>
            <ul>
              <li>
                <a href=" ">Hỏi đáp</a>
              </li>
              <li>
                <a href=" ">Chính sách KHTT</a>
              </li>
              <li>
                <a href=" ">Chính sách vận chuyển</a>
              </li>
              <li>
                <a href=" ">Hướng dẫn chọn size</a>
              </li>
              <li>
                <a href=" ">Kiểm tra đơn hàng</a>
              </li>
              <li>
                <a href=" ">Quy định đổi hàng</a>
              </li>
              <li>
                <a href=" ">Tra cứu điểm thẻ</a>
              </li>
              <li>
                <a href=" ">Chính sách bảo mật</a>
              </li>
            </ul>
          </Col>
          <Col lg={6} xs={24}>
            <h3>Tải ứng dụng trên điện thoại</h3>
            <div className="bancode">
              <img alt="" src="https://canifa.com/assets/images/bancode.png" />
              <img
                alt=""
                src="https://canifa.com/assets/images/googleplay.png"
              />
              <img alt="" src="https://canifa.com/assets/images/appstore.png" />
            </div>
            <br></br>
            <br></br>
            <h3>Phương thức thanh toán</h3>
            <p>
              <img alt="" src="https://canifa.com/assets/images/pay.svg" />
            </p>
            <div className="footer-check">
              <a href=" ">
                <img
                  alt=""
                  src="https://canifa.com/assets/images/bocongthuong.png"
                />
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <div className="footer-bottom">
        <div className="coppyright">© 2022 SHOE</div>
        <div className="footer-social">
          <span>Visit Us</span>
          <img
            alt=""
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjQiIGZpbGw9IiMzMzNGNDgiLz4KPHBhdGggZD0iTTAgMzBWMEgzMFYzMEgwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE1Ljk0NjYgMTkuNDA3NFYzMC4wMDEzSDIwLjEyMTRWMTkuNDA3NUgyMy41NTE4TDI0LjEwMTkgMTUuMDgyOEgyMC4xMjE0VjEyLjA3NjZDMjAuMTIxNCAxMS4yMzczIDIwLjc3ODIgMTAuNTU2OSAyMS41ODg0IDEwLjU1NjlIMjQuMTY2N1Y2LjY2Nzk3SDIwLjU2MzVDMTguMDEzNyA2LjY2Nzk3IDE1Ljk0NjYgOC44MDkyNiAxNS45NDY2IDExLjQ1MDdWMTUuMDgyN0gxMi41VjE5LjQwNzRIMTUuOTQ2NloiIGZpbGw9IiMzMzNGNDgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
          />
          <img
            alt=""
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMSAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAuNjQ1IDYuODc4OTFIMTAuMzU1NEM4LjcxMzI3IDYuODc4OTEgNy4zNzY5NSA4LjIxNTE0IDcuMzc2OTUgOS44NTc0VjIwLjE0NjlDNy4zNzY5NSAyMS43ODk0IDguNzEzMjcgMjMuMTI1NyAxMC4zNTU0IDIzLjEyNTdIMjAuNjQ1QzIyLjI4NzUgMjMuMTI1NyAyMy42MjM4IDIxLjc4OTQgMjMuNjIzOCAyMC4xNDY5VjkuODU3NEMyMy42MjM4IDguMjE1MjMgMjIuMjg3NSA2Ljg3ODkxIDIwLjY0NSA2Ljg3ODkxWk0xNS41IDIwLjM1MDZDMTIuNTUxMiAyMC4zNTA2IDEwLjE1MTggMTcuOTUxMSAxMC4xNTE4IDE1LjAwMkMxMC4xNTE4IDEyLjA1MzIgMTIuNTUxMiA5LjY1Mzc0IDE1LjUgOS42NTM3NEMxOC40NDkyIDkuNjUzNzQgMjAuODQ4NiAxMi4wNTMyIDIwLjg0ODYgMTUuMDAyQzIwLjg0ODYgMTcuOTUxMSAxOC40NDkyIDIwLjM1MDYgMTUuNSAyMC4zNTA2Wk0yMS4wMjA3IDEwLjc1OTdDMjAuMzIyNSAxMC43NTk3IDE5Ljc1NDkgMTAuMTkyIDE5Ljc1NDkgOS40OTQyN0MxOS43NTQ5IDguNzk2NDQgMjAuMzIyNSA4LjIyODc0IDIxLjAyMDcgOC4yMjg3NEMyMS43MTg1IDguMjI4NzQgMjIuMjg2MSA4Ljc5NjQ0IDIyLjI4NjEgOS40OTQyN0MyMi4yODYxIDEwLjE5MjEgMjEuNzE4NSAxMC43NTk3IDIxLjAyMDcgMTAuNzU5N1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuNDk5NyAxMS45MTAyQzEzLjc5NzQgMTEuOTEwMiAxMi40MTExIDEzLjI5NTggMTIuNDExMSAxNC45OTgxQzEyLjQxMTEgMTYuNzAxMSAxMy43OTc0IDE4LjA4NyAxNS40OTk3IDE4LjA4N0MxNy4yMDI3IDE4LjA4NyAxOC41ODggMTYuNzAxMSAxOC41ODggMTQuOTk4MUMxOC41ODggMTMuMjk1OCAxNy4yMDI3IDExLjkxMDIgMTUuNDk5NyAxMS45MTAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjUgMFYzMEgzMC41VjBIMC41Wk0yNS44ODMzIDIwLjE0NDhDMjUuODgzMyAyMy4wMzM3IDIzLjUzMzcgMjUuMzgzMyAyMC42NDQ4IDI1LjM4MzNIMTAuMzU1MkM3LjQ2NjU5IDI1LjM4MzMgNS4xMTY3IDIzLjAzMzcgNS4xMTY3IDIwLjE0NDhWOS44NTUyNUM1LjExNjcgNi45NjY1OSA3LjQ2NjU5IDQuNjE2NyAxMC4zNTUyIDQuNjE2N0gyMC42NDQ4QzIzLjUzMzcgNC42MTY3IDI1Ljg4MzMgNi45NjY1OSAyNS44ODMzIDkuODU1MjVWMjAuMTQ0OFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB4PSIwLjUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
          />
          <img
            alt=""
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjE5MjQgMjIuMTkwNEMxMy4xOTI0IDIyLjIyNzMgMTMuMTkyNCAyMi4yNzMzIDEzLjE3MiAyMi4yOTlDMTMuMDMzOCAyMi40Nzc0IDEyLjg2OTIgMjIuNjI2MiAxMi42NTMzIDIyLjcwNTJDMTIuNDY1NyAyMi43NzM2IDEyLjMxNjMgMjIuNjkgMTIuMjc2OCAyMi40OTUyQzEyLjI2MSAyMi40MTgyIDEyLjI2MDMgMjIuMzM3MiAxMi4yNjAzIDIyLjI1ODJDMTIuMjU5NyAyMC44MDY3IDEyLjI1NTcgMTcuODMwNiAxMi4yNTM3IDE3Ljc5NDRIMTEuMTgyN0MxMS4xODI3IDE3LjgzNDUgMTEuMTgxNCAyMS45ODA0IDExLjE4NCAyMi43NjM4QzExLjE4NDcgMjIuOTc1NyAxMS4yMDcxIDIzLjE4NjQgMTEuMjk1MyAyMy4zODMyQzExLjM5MDEgMjMuNTk2NSAxMS41NDc0IDIzLjczMTQgMTEuNzgxNyAyMy43NzAzQzExLjk1MzYgMjMuNzk5OSAxMi4xMjE0IDIzLjc4MDggMTIuMjg0NyAyMy43MjQ4QzEyLjYxOTEgMjMuNjA5NiAxMi44ODExIDIzLjM5MjQgMTMuMTEyMSAyMy4xMzE3QzEzLjEzMjUgMjMuMTA4NyAxMy4xNTQzIDIzLjA4NjMgMTMuMTkzMSAyMy4wNDQ4VjIzLjY5NTJIMTQuMjY2OFYyMC44NDk1QzE0LjI2NjggMTkuODYzNCAxNC4yNjY4IDE3Ljc4NTIgMTQuMjY2OCAxNy43ODUyTDEzLjE5MjQgMTcuNzg3OFYyMi4xOTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE4LjI2NzYgMTguMjU1N0MxOC4wNDEyIDE3Ljc3MzIgMTcuNTY1MiAxNy42NDU1IDE3LjE1MjUgMTcuNzQ4OUMxNi45MDIzIDE3LjgxMjEgMTYuNjk5NiAxNy45NTYyIDE2LjUzMyAxOC4xNDI1QzE2LjQ3NzcgMTguMjA1MSAxNi40MTcyIDE4LjMyNjIgMTYuNDE3MiAxOC4zMjYyQzE2LjQxNzIgMTguMzI2MiAxNi40MTcyIDE2LjU0NDIgMTYuNDE3MiAxNS42OTI0SDE1LjM0MTZWMjMuNjkzOEgxNi40MTcyVjIzLjI0NDlDMTYuNDE3MiAyMy4yNDQ5IDE2LjQ5MzUgMjMuMzI1OCAxNi41MjEyIDIzLjM1NTVDMTYuNzY4IDIzLjYyMzQgMTcuMDY3NiAyMy43NzAyIDE3LjQzNjkgMjMuNzczNUMxNy44OTExIDIzLjc3ODEgMTguMjA3IDIzLjU1ODIgMTguMzUwNSAyMy4xMjY0QzE4LjQxNyAyMi45MjU2IDE4LjQzODggMjIuNzE4OSAxOC40Mzk0IDIyLjUwOTZDMTguNDQwNyAyMS4zOTExIDE4LjQ0MDcgMjAuMjcyNyAxOC40Mzg4IDE5LjE1NDNDMTguNDM4OCAxOC44NDQ5IDE4LjQwMTIgMTguNTQwOCAxOC4yNjc2IDE4LjI1NTdaTTE3LjMzMTUgMjIuMzc2QzE3LjMzMTUgMjIuNDM1OSAxNy4zMjQzIDIyLjQ5NjUgMTcuMzExOCAyMi41NTUxQzE3LjI2MjQgMjIuNzg5NCAxNy4wODQgMjIuODk0NyAxNi44MzEyIDIyLjg0MjdDMTYuNjc3OSAyMi44MTExIDE2LjU1ODEgMjIuNzIyOSAxNi40NTU0IDIyLjYxMTdDMTYuNDUwOCAyMi42MDY0IDE2LjQyMDUgMjIuNTY1NiAxNi40MjA1IDIyLjU2NTZWMjIuNDc4TDE2LjQxNzggMTguOTI1M0MxNi40MTc4IDE4LjkyNTMgMTYuNDQwOSAxOC44NTk1IDE2LjQ5MTYgMTguODE1M0MxNi42MTggMTguNzAzNCAxNi43NTc1IDE4LjYzMyAxNi45MzIgMTguNjUwMUMxNy4wODA3IDE4LjY2NDYgMTcuMTk5MiAxOC43MzMxIDE3LjI1NDUgMTguODcwNkMxNy4yOTYgMTguOTc1MyAxNy4zMjg5IDE5LjA5MTggMTcuMzI5NiAxOS4yMDM3QzE3LjMzNDggMjAuMjYwOSAxNy4zMzI4IDIxLjMxODEgMTcuMzMxNSAyMi4zNzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTQuNDAwNCAxMS4yODM0QzE0LjY1MTIgMTEuMjgzNCAxNC44NTUyIDExLjA3OTQgMTQuODU1MiAxMC44Mjg2VjcuNjE5MzZDMTQuODU1MiA3LjM2ODU1IDE0LjY1MTIgNy4xNjQ1NSAxNC40MDA0IDcuMTY0NTVDMTQuMTQ5NyA3LjE2NDU1IDEzLjk0NTYgNy4zNjg2MiAxMy45NDU2IDcuNjE5MzZWMTAuODI4NkMxMy45NDU2IDExLjA3OTMgMTQuMTQ5NiAxMS4yODM0IDE0LjQwMDQgMTEuMjgzNFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMS4xODQ5IDE1LjY5MTRINy40NTg5OFYxNi44MzgxSDguNzE0MzNWMjMuNjkyOEg5LjkyNjg4VjE2LjgzNTRIMTEuMTg0OVYxNS42OTE0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTIxLjM0MDkgMjEuNTk1NVYyMi4zNTQ1QzIxLjM0MDkgMjIuNjE5OCAyMS4xMjYzIDIyLjgzNDQgMjAuODYxNyAyMi44MzQ0QzIwLjU5NjQgMjIuODM0NCAyMC4zODE4IDIyLjYxOTggMjAuMzgxOCAyMi4zNTQ1VjIwLjg3OEgyMi40NDE1QzIyLjQ0MTUgMjAuODc4IDIyLjQ1MzQgMTkuODQ3OCAyMi40NDQ4IDE5LjM4MDRDMjIuNDQxNSAxOS4xODEgMjIuNDI2NCAxOC45Nzg5IDIyLjM4NTYgMTguNzg0QzIyLjI3ODkgMTguMjc4NSAyMi4wMDcxIDE3Ljg5NzMgMjEuNDk4MiAxNy43MzAxQzIxLjM0ODggMTcuNjgwNyAyMS4xODgyIDE3LjY1NTEgMjEuMDMwOCAxNy42NDUyQzIwLjUwNzUgMTcuNjExNiAyMC4wNDkzIDE3Ljc2MTEgMTkuNjkxMiAxOC4xNjE5QzE5LjM3NzIgMTguNTEyOCAxOS4yNjggMTguOTM1NCAxOS4yNjczIDE5LjM5MzZDMTkuMjY1MyAyMC4yNjk4IDE5LjI2MTQgMjEuMTQ2NiAxOS4yNjk5IDIyLjAyMjhDMTkuMjcyNiAyMi4yNDU5IDE5LjI5NzYgMjIuNDczNyAxOS4zNDgzIDIyLjY5MDlDMTkuNDU3NSAyMy4xNTc3IDE5LjcxMjMgMjMuNTI0MyAyMC4xNjE5IDIzLjcyNzFDMjAuNDkwNCAyMy44NzU4IDIwLjgzNzMgMjMuODgzMSAyMS4xODc1IDIzLjgzMTdDMjEuNzUyMyAyMy43NDg4IDIyLjEzNzQgMjMuNDQ2IDIyLjMyMzcgMjIuOTAwM0MyMi40NjM5IDIyLjQ5MTUgMjIuNDQ3NSAyMS41OTU1IDIyLjQ0NzUgMjEuNTk1NUgyMS4zNDA5Wk0yMC4zODE4IDE5LjEzMzZDMjAuMzgxOCAxOC44NjkgMjAuNTk2NCAxOC42NTM3IDIwLjg2MTcgMTguNjUzN0MyMS4xMjYzIDE4LjY1MzcgMjEuMzQwOSAxOC44NjkgMjEuMzQwOSAxOS4xMzM2VjE5Ljk2MjRIMjAuMzgxOFYxOS4xMzM2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTAgMFYzMEgzMFYwSDBaTTE2LjkwMDQgNi4yNTMwM0gxNy45OTI5VjEwLjc4MzRDMTcuOTkyOSAxMC44NDM0IDE3Ljk5NzcgMTAuOTA0MSAxOC4wMDgzIDEwLjk2M0MxOC4wNDE0IDExLjE0OTcgMTguMTc5NCAxMS4yMzc2IDE4LjM1OTIgMTEuMTc1MkMxOC41NzgzIDExLjA5OTQgMTguNzQ1NiAxMC45NDc2IDE4Ljg4NzQgMTAuNzY4OUMxOC45MDc1IDEwLjc0MzMgMTguOTAzOSAxMC42OTU3IDE4LjkwMzkgMTAuNjU4MlY2LjI1MzAzSDIwLjAwNDNMMjAuMDA0IDEyLjE5MzZIMTguOTAzM0wxOC45MDQ2IDExLjU1NTRDMTguNzgyOSAxMS42NzUzIDE4LjY3OSAxMS43ODczIDE4LjU2NDggMTEuODg3OUMxOC4zNjI1IDEyLjA2NjEgMTguMTMzMyAxMi4xOTkgMTcuODY1MSAxMi4yNTE1QzE3LjQ1MzUgMTIuMzMxOSAxNy4xMDI5IDEyLjIwMTkgMTYuOTcxNyAxMS43NzU2QzE2LjkyNzkgMTEuNjMzNiAxNi45MDE1IDExLjQ4MDUgMTYuOTAwNCAxMS4zMzIzVjYuMjUzMDNaTTE0LjQwMDEgNi4xMDQzM0MxNS4yNzA3IDYuMTA0MzMgMTUuOTc2MyA2LjgxIDE1Ljk3NjMgNy42ODA1MlYxMC43NjUyQzE1Ljk3NjMgMTEuNjM1NyAxNS4yNzA3IDEyLjM0MTQgMTQuNDAwMSAxMi4zNDE0QzEzLjUyOTYgMTIuMzQxNCAxMi44MjM5IDExLjYzNTcgMTIuODIzOSAxMC43NjUyVjcuNjgwNTJDMTIuODIzOSA2LjgxIDEzLjUyOTYgNi4xMDQzMyAxNC40MDAxIDYuMTA0MzNaTTEwLjE2MDEgNC4xNTE3OUMxMC4xNjAxIDQuMTUxNzkgMTAuNjYwOCA2LjI3ODExIDEwLjg5OTcgNy4yODUzNUgxMC45MDAxQzExLjEzOTEgNi4yNzgxMSAxMS42Mzk3IDQuMTUxNzkgMTEuNjM5NyA0LjE1MTc5SDEyLjg5MjNDMTIuODkyMyA0LjE1MTc5IDExLjkyOTkgNy4zNDM2MSAxMS40OTk1IDguNzY3MDhDMTEuNDg0IDguODE4NDkgMTEuNDc3IDguODc0NDUgMTEuNDc3IDguOTI4MzZMMTEuNDc3NSAxMi4xOTI0SDEwLjMyMjRMMTAuMzIyOSA4LjkyODM2QzEwLjMyMjkgOC44NzQ0NSAxMC4zMTU4IDguODE4NTYgMTAuMzAwMyA4Ljc2NzA4QzkuODY5OSA3LjM0MzYxIDguOTA3NDkgNC4xNTE3OSA4LjkwNzQ5IDQuMTUxNzlIMTAuMTYwMVpNMjMuOTMzOCAyMy4wOTY4QzIzLjkzMzggMjQuNTU2OSAyMi43NjczIDI1Ljc0OTcgMjEuMzA3OSAyNS43ODA3QzE3LjEwMzQgMjUuODcwOSAxMi44OTcgMjUuODcwOSA4LjY5MTkgMjUuNzgwN0M3LjIzMzE1IDI1Ljc0OTcgNi4wNjY2NyAyNC41NTY5IDYuMDY2NjcgMjMuMDk2OFYxNi41Mjk4QzYuMDY2NjcgMTUuMDcwNCA3LjIzMzE1IDEzLjg3NzYgOC42OTE5IDEzLjg0NjdDMTIuODk3IDEzLjc1NjUgMTcuMTAzNCAxMy43NTY1IDIxLjMwNzkgMTMuODQ2N0MyMi43NjczIDEzLjg3NzYgMjMuOTMzOCAxNS4wNzA0IDIzLjkzMzggMTYuNTI5OFYyMy4wOTY4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
