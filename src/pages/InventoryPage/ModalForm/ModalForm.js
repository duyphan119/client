import {
  Form,
  Modal,
  Input,
  Select,
  Grid,
  Row,
  Col,
  InputNumber,
  Checkbox,
  Radio,
  Button,
  Space,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { memo } from "react";
import instance from "../../../config/configAxios";
const { useBreakpoint } = Grid;
const ModalForm = ({ row, open, onClose, onAdd, onEdit }) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [state, setState] = useState({
    products: [],
    variantValues: [],
    checkedValues: [],
    value: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.allSettled([
          instance.get("product"),
          instance.get("variant-value/all"),
        ]);
        const {
          code: code0,
          message: message0,
          data: data0,
        } = res[0].value.data;
        const {
          code: code1,
          message: message1,
          data: data1,
        } = res[1].value.data;
        let products,
          variantValues,
          checkedValues = [],
          value = 0;
        if (code0 === 200 || message0 === "Success") {
          products = data0.items;
          data0.items[0] &&
            form.setFieldValue(
              "productId",
              row ? row.productId : data0.items[0].id
            );
        }
        if (code1 === 200 || message1 === "Success") {
          variantValues = data1;
          if (row) {
            row.variantValues.forEach((el) => {
              const index = variantValues.findIndex((i) => i.id === el.id);
              if (index !== -1) {
                checkedValues.push(index);
                value = index;
              }
            });
          }
        }

        setState((prev) => ({
          ...prev,
          products,
          variantValues,
          checkedValues,
          value,
        }));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [form, row]);

  const handleFinish = (values) => {
    row
      ? onEdit({
          ...row,
          ...values,
          variantValues: state.checkedValues.map((_) => state.variantValues[_]),
        })
      : onAdd({
          ...values,
          variantValues: state.checkedValues.map((_) => state.variantValues[_]),
        });
  };

  const handleChange = (value) => {
    setState((prev) => ({
      ...prev,
      value,
    }));
  };

  const handleAddVariantValue = () => {
    setState((prev) => ({
      ...prev,
      checkedValues: [
        ...prev.checkedValues.filter(
          (item) =>
            prev.variantValues[item].variant.id !==
            prev.variantValues[prev.value].variant.id
        ),
        prev.value,
      ],
    }));
  };

  console.log(state);

  return (
    <Modal
      open={open}
      width={screens.lg ? "50vw" : screens.md ? "70vw" : "90vw"}
      onCancel={onClose}
      onOk={() => form.submit()}
      title={row ? "Edit Product Variant" : "New Product Variant"}
      destroyOnClose={true}
    >
      <Form
        initialValues={{
          inventory: row ? row.inventory : 0,
          productId: row ? row.productId : state.products[0]?.id,
        }}
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form.Item
              name="productId"
              label="Product"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Select>
                {state.products.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} lg={8}>
            <Form.Item name="inventory" label="Inventory">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={16}>
            <Form.Item label="Variants">
              <Space>
                <Select value={state.value} onChange={handleChange}>
                  {state.variantValues.map((item, index) => (
                    <Select.Option key={item.id} value={index}>
                      {item.variant.name} - {item.value}
                    </Select.Option>
                  ))}
                </Select>
                <Button type="primary" onClick={handleAddVariantValue}>
                  Add
                </Button>
                {state.checkedValues.length > 0 ? (
                  <Space>
                    Result:{" "}
                    {state.checkedValues.map((item) => (
                      <Tag key={item}>
                        {state.variantValues[item].variant.name}:{" "}
                        {state.variantValues[item].value}
                      </Tag>
                    ))}
                  </Space>
                ) : null}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(ModalForm);
