import { Dropdown } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions, authSelector } from "../../redux/slices/authSlice";
import { cartActions } from "../../redux/slices/cartSlice";
import { wishlistActions } from "../../redux/slices/wishlistSlice";

const LinkIcon = ({ to }) => {
  return (
    <Link to={to} style={{ display: "block" }}>
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIxQzE2Ljk3MDYgMjEgMjEgMTYuOTcwNiAyMSAxMkMyMSA3LjAyOTQ0IDE2Ljk3MDYgMyAxMiAzQzcuMDI5NDQgMyAzIDcuMDI5NDQgMyAxMkMzIDE2Ljk3MDYgNy4wMjk0NCAyMSAxMiAyMVoiIHN0cm9rZT0iIzMzM0Y0OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMiAxNUMxNC4wNzExIDE1IDE1Ljc1IDEzLjMyMTEgMTUuNzUgMTEuMjVDMTUuNzUgOS4xNzg5MyAxNC4wNzExIDcuNSAxMiA3LjVDOS45Mjg5MyA3LjUgOC4yNSA5LjE3ODkzIDguMjUgMTEuMjVDOC4yNSAxMy4zMjExIDkuOTI4OTMgMTUgMTIgMTVaIiBzdHJva2U9IiMzMzNGNDgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNS45ODEyIDE4LjY5MTNDNi41NDYxNSAxNy41ODA2IDcuNDA3NDQgMTYuNjQ3OCA4LjQ2OTczIDE1Ljk5NjNDOS41MzIwMiAxNS4zNDQ4IDEwLjc1MzkgMTUgMTIgMTVDMTMuMjQ2MiAxNSAxNC40NjggMTUuMzQ0OCAxNS41MzAzIDE1Ljk5NjNDMTYuNTkyNiAxNi42NDc4IDE3LjQ1MzkgMTcuNTgwNiAxOC4wMTg5IDE4LjY5MTMiIHN0cm9rZT0iIzMzM0Y0OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
        alt=""
      />
    </Link>
  );
};

const ProfileIcon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    dispatch(wishlistActions.setWishList({ items: [], count: 0 }));
    dispatch(cartActions.setCart({ items: [] }));
    navigate("/login");
  };
  return user ? (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: <Link to="/profile">Thông tin tài khoản</Link>,
          },
          {
            key: "2",
            label: <Link to="/wish-list">Sản phẩm yêu thích</Link>,
          },
          {
            key: "3",
            label: <Link to="/order">Đơn hàng của tôi</Link>,
          },
          {
            key: "4",
            label: (
              <Link to="/login" onClick={handleLogout}>
                Đăng xuất
              </Link>
            ),
          },
        ],
      }}
      placement="bottomRight"
    >
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <LinkIcon to="/profile" />
      </button>
    </Dropdown>
  ) : (
    <LinkIcon to="/login" />
  );
};

export default ProfileIcon;
