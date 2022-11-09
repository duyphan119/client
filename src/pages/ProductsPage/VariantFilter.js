import { Select } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../../config/configAxios";

const VariantFilter = ({ onChange }) => {
  const [variantValues, setVariantValues] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await Promise.allSettled([instance.get("variant-value/all")]);

      if (res[0].status === "fulfilled") {
        const { code, message, data } = res[0].value.data;
        if (code === 200 || message === "Success") {
          setVariantValues(data);
        }
      }
    })();
  }, []);
  return (
    <div className="select_option">
      <p className="title_select">Chọn kích cỡ</p>
      <Select
        defaultValue=""
        style={{
          width: "100%",
        }}
        onChange={onChange}
      >
        <Select.Option value="">Tất cả</Select.Option>
        {variantValues.map((item) => (
          <Select.Option value={item.value} key={item.value}>
            {item.variant.name}: {item.value}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default VariantFilter;
