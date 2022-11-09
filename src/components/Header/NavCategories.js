import { Grid } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import instance from "../../config/configAxios";

const { useBreakpoint } = Grid;
const NavCategories = () => {
  const [categories, setCagories] = useState([]);
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.allSettled([
          instance.get("category", {
            params: { parent_id: "null", limit: 6, sort_type: "asc" },
          }),
        ]);
        const { code, message, data } = res[0].value.data;
        if (code === 200 && message === "Success") {
          setCagories(data.items);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  return screens.lg ? (
    <div className="header-menu">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/product/category/${category.alias}`}
              className={({ isActive }) =>
                isActive ? "menu-link header-menu-active active" : "menu-link"
              }
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default NavCategories;
