import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const DefaultLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <div style={{ height: 84 }}></div>
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
