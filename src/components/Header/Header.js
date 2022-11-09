import { Badge, Grid } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import "./index.scss";
import NavCategories from "./NavCategories";
import ProfileIcon from "./ProfileIcon";
import SearchInput from "./SearchInput";
import WishlistIcon from "./WishlistIcon";

const { useBreakpoint } = Grid;
const Header = () => {
  const screens = useBreakpoint();

  return (
    <header
      className="header"
      style={{
        padding: screens.lg ? "0 100px" : "0 12px",
      }}
    >
      <div className="header-logo">
        <Link to="/" title="Home Page">
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <img
              src="https://res.cloudinary.com/dwhjftwvw/image/upload/v1667812984/xshop/running-shoe-symbol-on-white-backdrop_lyeqr9.jpg"
              alt=""
              style={{
                width: 56,
                height: 56,
              }}
            />
            Shoes
          </span>
          {/* <img
            src="https://res.cloudinary.com/diot4imoq/image/upload/v1662692378/osbgjw8tetsfdcpsrs0q.png"
            alt="logo"
          /> */}
        </Link>
      </div>
      <NavCategories />

      <div className="header-group-icon">
        <SearchInput />
        <ProfileIcon />
        <WishlistIcon />
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
