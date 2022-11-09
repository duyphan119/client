import React, { useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import Sidebar from "./Sidebar";

const DashBoardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="section-common"
        style={{ width: "100%", overflowX: "hidden" }}
      >
        <HeaderTitle collapsed={collapsed} setCollapsed={setCollapsed} />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
