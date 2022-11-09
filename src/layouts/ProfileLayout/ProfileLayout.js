import { Grid } from "antd";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideBar from "./SideBar";

const { useBreakpoint } = Grid;

const ProfileLayout = ({ children }) => {
  const screens = useBreakpoint();
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div style={{ height: 84 }}></div>
      <div
        style={{
          display: "flex",
          padding: screens.lg ? "20px 100px" : "20px 12px",
          flexDirection: screens.lg ? "row" : "column",
          gap: "40px",
          flex: 1,
        }}
      >
        <SideBar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
