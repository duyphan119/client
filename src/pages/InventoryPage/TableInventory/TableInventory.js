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
import { formatDateTime } from "../../../utils";

const TableInventory = ({ data, onSearch, onDelete, onOpenModal }) => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => (
        <Space>
          <Avatar src={record.product.thumbnail} alt="" type="shape" />
          {record.product.name}
        </Space>
      ),
    },
    {
      title: "Variant",
      dataIndex: "variantValues",
      render: (text, record) => (
        <>
          {record.variantValues.map((variantValue) => (
            <div key={variantValue.id}>
              {variantValue.variant.name}: {variantValue.value}
            </div>
          ))}
        </>
      ),
    },
    // {
    // 	title: "Code",
    // 	dataIndex: "code",
    // },
    // {
    // 	title: "Color",
    // 	dataIndex: "color",
    // },
    // {
    // 	title: "Size",
    // 	dataIndex: "size",
    // },
    {
      title: "Inventory",
      dataIndex: "inventory",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (_, record) => formatDateTime(record.createdAt),
    },
    // {
    //   title: "Price",
    //   dataIndex: "price",
    // },
    // {
    //   title: "Sale Price",
    //   dataIndex: "salePrice",
    // },
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
    // navigate("/admin/inventory/new");
    onOpenModal(null);
  };

  const handleEdit = (record) => {
    // navigate("/admin/inventory/edit/" + record.id);
    onOpenModal(record);
  };

  return (
    <React.Fragment>
      <Row className="common-row-cus">
        <Col xl={18} style={{ paddingInline: "5px" }}>
          <Form
            form={form}
            initialValues={{ option: "inventory", search: "" }}
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
                  <Select.Option value="inventory">Inventory</Select.Option>
                  <Select.Option value="price">Price</Select.Option>
                  <Select.Option value="salePrice">Sale Price</Select.Option>
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

export default TableInventory;
