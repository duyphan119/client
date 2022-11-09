import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Row,
  Upload,
} from "antd";
import { memo, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
const { useBreakpoint } = Grid;
const ModalForm = ({ row, open, onClose, onAdd, onEdit }) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [thumbnail, setThumbnail] = useState("");

  const handleFinish = (values) => {
    row
      ? onEdit({
          ...row,
          ...values,
          ...(thumbnail === "" ? {} : { thumbnail }),
        })
      : onAdd({ ...values, thumbnail });
  };
  const props = {
    name: "image",
    action: "http://localhost:8080/api/upload/image/single",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY0Njk3OTUzLCJleHAiOjE2NjQ3MTU5NTN9.nkek8VbImz-8JOSpvmIlPqnIcAhn2rwuuKhtr_M4XjM",
    },
    onChange(info) {
      console.log("info uploaded file: ", info);
      if (info?.file?.response) {
        const { code, message, data: url } = info.file.response;
        if (code === 200 || message === "Success") {
          setThumbnail(url);
        }
      }
    },
  };
  return (
    <Modal
      open={open}
      width={screens.md ? "70vw" : "90vw"}
      onCancel={onClose}
      onOk={() => form.submit()}
      title={row ? "Edit Product" : "New Product"}
      destroyOnClose={true}
    >
      <Form
        initialValues={{
          name: row ? row.name : "",
          alias: row ? row.alias : "",
          description: row ? row.description : "",
          price: row ? row.price : "",
          salePrice: row ? row.salePrice : "",
        }}
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="alias" label="Alias">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="price" label="Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="salePrice" label="Sale Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="thumbnail">
              <Upload {...props}>
                <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(ModalForm);
