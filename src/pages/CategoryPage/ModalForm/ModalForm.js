import { Col, Form, Grid, Input, Modal, Row, Select } from "antd";
import { memo, useEffect, useState } from "react";
import instance from "../../../config/configAxios";
const { useBreakpoint } = Grid;
const ModalForm = ({ row, open, onClose, onAdd, onEdit }) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get("category");
        const { code, message, data } = res.data;
        if (code === 200 || message === "Success") {
          setCategories(data.items);
          data.items[0] &&
            form.setFieldValue("productId", row ? row.parentId : -1);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [form, row]);

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
      title={row ? "Edit Category" : "New Category"}
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
          <Col xs={24}>
            <Form.Item name="parentId" label="Parent">
              <Select>
                <Select.Option value={-1}>No Parent</Select.Option>
                {categories.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="alias" label="Alias">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(ModalForm);
