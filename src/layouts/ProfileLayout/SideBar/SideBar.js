import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Grid, Space } from "antd";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../../redux/slices/authSlice";
import { cartActions } from "../../../redux/slices/cartSlice";
import { wishlistActions } from "../../../redux/slices/wishlistSlice";
import "./index.scss";

const items = [
  {
    type: "link",
    key: "/profile",
    icon: <UserOutlined />,
    label: "Tài khoản",
  },
  {
    type: "link",
    key: "/wish-list",
    icon: <VideoCameraOutlined />,
    label: "Yêu thích",
  },
  {
    type: "link",
    key: "/order",
    icon: <UploadOutlined />,
    label: "Đơn hàng của tôi",
  },
  {
    type: "link",
    key: "/change-password",
    icon: <RiLockPasswordLine />,
    label: "Đổi mật khẩu",
  },
  {
    type: "text",
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Đăng xuất",
  },
];
const { useBreakpoint } = Grid;

const SideBar = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(wishlistActions.setWishList({ items: [], count: 0 }));
    dispatch(cartActions.setCart({ items: [] }));
    navigate("/login");
  };
  return (
    <Space direction="vertical" style={{ width: screens.lg ? 240 : "100%" }}>
      {items.map((item) => {
        const { type, key, label, icon } = item;

        return type === "link" ? (
          <NavLink
            key={key}
            to={key}
            className={({ isActive }) =>
              isActive
                ? `profile-sidebar__item active`
                : `profile-sidebar__item`
            }
          >
            <Space>
              {icon}
              <span>{label}</span>
            </Space>
          </NavLink>
        ) : (
          <button
            key={key}
            className="profile-sidebar__item"
            onClick={handleLogout}
          >
            <Space>
              {icon}
              <span>{label}</span>
            </Space>
          </button>
        );
      })}
    </Space>
  );
};

export default SideBar;
