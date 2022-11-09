import { Avatar, Grid, Modal, Select, Space } from "antd";
import { memo, useState } from "react";
import { formatDateTime } from "../../../utils";
const { useBreakpoint } = Grid;
const ModalForm = ({ row, open, onClose, onAdd, onEdit }) => {
  const screens = useBreakpoint();
  const [values, setValues] = useState({
    status: row ? row.status : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOk();
  };
  const handleChange = (value) => {
    setValues((prev) => ({ ...prev, status: value }));
  };
  const handleOk = () => {
    row ? onEdit({ ...row, ...values }) : onAdd(values);
  };
  return (
    <Modal
      open={open}
      width={screens.md ? "70vw" : "90vw"}
      onCancel={onClose}
      onOk={handleOk}
      title={row ? "Edit Order" : "New Order"}
      destroyOnClose={true}
    >
      <form onSubmit={handleSubmit}>
        {row ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td style={{ padding: 4 }}>Mã đơn hàng</td>
                  <td style={{ padding: 4 }}>: {row.id}</td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>Ngày đặt</td>
                  <td style={{ padding: 4 }}>
                    : {formatDateTime(row.createdAt)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>Họ tên</td>
                  <td style={{ padding: 4 }}>: {row.fullName}</td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>Điện thoại</td>
                  <td style={{ padding: 4 }}>: {row.phone}</td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>Địa chỉ</td>
                  <td style={{ padding: 4 }}>: {row.address}</td>
                </tr>
                <tr>
                  <td style={{ padding: 4 }}>Trạng thái</td>
                  <td style={{ padding: 4 }}>
                    :{" "}
                    <Select
                      value={values.status}
                      onChange={handleChange}
                      style={{ width: 200 }}
                    >
                      <Select.Option value="Đang xử lý">
                        Đang xử lý
                      </Select.Option>
                      <Select.Option value="Đang vận chuyển">
                        Đang vận chuyển
                      </Select.Option>
                      <Select.Option value="Vận chuyển thành công">
                        Vận chuyển thành công
                      </Select.Option>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              style={{
                width: "100%",
                boxShadow: "0 0 2px 0 #000",
                marginTop: 4,
              }}
            >
              <thead>
                <tr style={{ boxShadow: "0 0 1px 0 #000" }}>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    Sản phẩm
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    Đơn giá
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    Số lượng
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    Thành tiền
                  </td>
                </tr>
              </thead>
              <tbody>
                {row.items.map((item) => (
                  <tr
                    style={{ boxShadow: "0 0 1px 0 #000" }}
                    key={item.productVariant.id}
                  >
                    <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                      <Space align="center">
                        <Avatar
                          src={item.productVariant.product.thumbnail}
                          alt=""
                          shape="square"
                        />
                        <div>
                          <div>{item.productVariant.product.name}</div>
                          {item.productVariant.variantValues.map(
                            (variantValue) => (
                              <div key={variantValue.id}>
                                {variantValue.variant.name}:{" "}
                                {variantValue.value}
                              </div>
                            )
                          )}
                        </div>
                      </Space>
                    </td>
                    <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                      {item.price}
                    </td>
                    <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                      {item.quantity}
                    </td>
                    <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                      {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
                <tr style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                  <td
                    colSpan={3}
                    style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}
                  >
                    Tổng
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    {row.items.reduce((p, c) => p + c.quantity * c.price, 0)}
                  </td>
                </tr>
                <tr style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                  <td
                    colSpan={3}
                    style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}
                  >
                    Giảm giá
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    {0}
                  </td>
                </tr>
                <tr style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                  <td
                    colSpan={3}
                    style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}
                  >
                    Vận chuyển
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    {0}
                  </td>
                </tr>
                <tr style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                  <td
                    colSpan={3}
                    style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}
                  >
                    Tổng cộng
                  </td>
                  <td style={{ boxShadow: "0 0 1px 0 #000", padding: 4 }}>
                    {row.items.reduce((p, c) => p + c.quantity * c.price, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : null}
      </form>
    </Modal>
  );
};

export default memo(ModalForm);
