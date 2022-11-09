import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../config/configAxios";
import { useTitle } from "../../hooks/useTitle";
import { authSelector } from "../../redux/slices/authSlice";

const ChangePasswordPage = () => {
  useTitle("Đổi mật khẩu");

  const { accessToken } = useSelector(authSelector);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch).patch(
        "auth/change-password",
        { oldPassword: values.oldPassword, newPassword: values.newPassword }
      );
      const { code, message } = res.data;
      if (code === 200 || message === "Success") {
        notification.success({ message: "Đổi mật khẩu thành công" });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: "Đổi mật khẩu thành công" });
    }
  };

  return (
    <main style={{ width: "100%" }}>
      <div style={{ fontSize: "3rem" }}>
        <h3>Đổi mật khẩu</h3>
        <Form
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 12 }}
          labelWrap={true}
        >
          <Form.Item label="Mật khẩu cũ" name="oldPassword">
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item label="Mật khẩu mới" name="newPassword">
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu mới" name="reNewPassword">
            <Input.Password size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ChangePasswordPage;
