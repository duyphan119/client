import { Col, Form, Grid, Input, Modal, Row, Select } from "antd";
import { memo } from "react";
const { useBreakpoint } = Grid;
const ModalForm = ({ row, open, onClose, onAdd, onEdit }) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const handleFinish = (values) => {
    console.log(values);
    row ? onEdit({ ...row, ...values }) : onAdd(values);
  };
  return (
    <Modal
      open={open}
      width={screens.lg ? "50vw" : screens.md ? "70vw" : "90vw"}
      onCancel={onClose}
      onOk={() => form.submit()}
      title={row ? "Edit User" : "New User"}
      destroyOnClose={true}
    >
      <Form
        initialValues={{
          name: row ? row.name : "",
          alias: row ? row.alias : "",

          parentId: row ? row.parentId : -1,
        }}
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(ModalForm);
