import React from "react";

import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import "./index.scss";
import { useTitle } from "../../hooks/useTitle";
import { Button, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/slices/authSlice";
import { apiCallerWithToken } from "../../config/configAxios";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, accessToken } = useSelector(authSelector);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).patch(
        "auth/change-profile",
        values
      );
      const { code, message, data } = res.data;
      if (code === 200 || message === "Success") {
        dispatch(authActions.setProfile(data));
        notification.success({
          message: "Successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useTitle("Thông tin tài khoản");
  if (!user) return <Navigate to="/login" />;
  return (
    <main className="profile">
      <div className="content">
        <h3>Thông tin tài khoản</h3>
        <Form
          className="form-account"
          initialValues={{
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 12 }}
          labelWrap={true}
        >
          <Form.Item label="Họ và tên" name="fullName">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="SĐT" name="phone">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="btn-save">
            Save
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ProfilePage;
