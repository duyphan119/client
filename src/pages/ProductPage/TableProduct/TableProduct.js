import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const TableProduct = ({ onOpenModal, data, onSearch, onDelete }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      width: 50,
      render: (text, row) => (
        <Avatar
          src={row.thumbnail}
          alt=""
          style={{ width: 72, height: 72 }}
          shape="square"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    // {
    // 	title: "Slug",
    // 	dataIndex: "slug",
    // },
    {
      title: "Alias",
      dataIndex: "alias",
    },
    {
      title: "Description",
      dataIndex: "description",
      maxwidth: 400,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="common-icon-edit"
              onClick={() => {
                handleEdit(record);
              }}
            />
            <Popconfirm
              placement="topRight"
              title={`Do you want to delete this?`}
              onConfirm={() => {
                confirm(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="common-icon-delete" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onFinish = (values) => {
    onSearch(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function confirm(record) {
    onDelete(record.id);
  }

  const handleAdd = () => {
    // navigate("/admin/product/new");
    onOpenModal(null);
  };

  const handleEdit = (record) => {
    // navigate("/admin/product/edit/" + record.id);
    onOpenModal(record);
  };

  return (
    <React.Fragment>
      <Row className="common-row-cus">
        <Col xl={18} style={{ paddingInline: "5px" }}>
          <Form
            form={form}
            initialValues={{ option: "name", search: "" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="common-form-cus"
          >
            <div style={{ display: "flex" }}>
              <Form.Item
                name="option"
                style={{
                  paddingRight: "10px",
                }}
              >
                <Select style={{ width: 120, borderRadius: "5px" }}>
                  <Select.Option value="name">Name</Select.Option>
                  <Select.Option value="alias">Alias</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="search">
                <Input placeholder="Search" />
              </Form.Item>
              <Form.Item shouldUpdate style={{ marginLeft: 8 }}>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !form.isFieldsTouched(false) ||
                      form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length > 0
                    }
                  >
                    Search
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        </Col>
        <Col
          xl={6}
          style={{
            textAlign: "right",
          }}
        >
          <Button type="primary" onClick={handleAdd}>
            Add new
          </Button>
        </Col>
      </Row>
      <Row className="common-content-table">
        <Col xl={24} md={24} xs={24}>
          <Table
            columns={columns}
            pagination={false}
            dataSource={data.items.map((item) => ({ ...item, key: item.id }))}
            expandable={{ showExpandColumn: false }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TableProduct;
