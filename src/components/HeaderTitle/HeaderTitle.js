import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { memo } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/slices/authSlice";
import { wishlistActions } from "../../redux/slices/wishlistSlice";
import { cartActions } from "../../redux/slices/cartSlice";

const HeaderTitle = ({ collapsed, setCollapsed }) => {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  return (
    <section className="d-header">
      <span>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed((prev) => !prev)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed((prev) => !prev)} />
        )}
      </span>
      <div className="account">
        <h3>
          Hi, <b>{user?.fullName}</b>
        </h3>
        <div className="profile">
          <Link to="/admin/profile">My Account</Link>
          <Link
            to="/login"
            onClick={() => {
              dispatch(authActions.logout());
              dispatch(wishlistActions.setWishList({ items: [], count: 0 }));
              dispatch(cartActions.setCart({ items: [] }));
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(HeaderTitle);
