import { Layout, notification, Pagination } from "antd";
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallerWithToken } from "../../config/configAxios";
import { authSelector } from "../../redux/slices/authSlice";
import "./index.scss";
import ModalForm from "./ModalForm";
import TableUser from "./TableUser";

const { Content } = Layout;
const initState = {
  data: {
    items: [],
    count: 0,
  },
  page: 1,
  pageSize: 7,
  option: "",
  search: "",
  openModal: false,
  row: null,
};

const actionTypes = {
  FETCH: "FETCH",
};

const reducers = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    default:
      return {
        ...state,
        ...payload,
      };
  }
};
const UserPage = () => {
  const [{ data, page, pageSize, option, search, openModal, row }, dispatch1] =
    useReducer(reducers, initState);
  const { accessToken } = useSelector(authSelector);
  const dispatch2 = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await apiCallerWithToken(accessToken, dispatch2).get(
          "account",
          { params: { limit: 7, p: 1 } }
        );
        dispatch1({
          type: actionTypes.FETCH,
          payload: { data: res.data.data, page: 1, pageSize: 7 },
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken, dispatch2]);
  const handlePageChange = async (page, pageSize) => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch2).get(
        "account",
        {
          params: {
            limit: pageSize,
            p: page,
            ...(option && search ? { [option]: search } : {}),
          },
        }
      );
      dispatch1({
        type: actionTypes.FETCH,
        payload: { data: res.data.data, page, pageSize },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async ({ option: _option, search: _search }) => {
    try {
      const res = await apiCallerWithToken(accessToken, dispatch2).get(
        "account",
        {
          params: {
            limit: pageSize,
            p: 1,
            ...(_option && _search ? { [_option]: _search } : {}),
          },
        }
      );
      dispatch1({
        type: actionTypes.FETCH,
        payload: {
          data: res.data.data,
          page: 1,
          pageSize,
          ...(_option && _search
            ? { option: _option, search: _search }
            : { search: "" }),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res1 = await apiCallerWithToken(accessToken, dispatch2).delete(
        "account/" + id
      );
      const { code, message } = res1;
      if (code === 200 || message === "Success") {
        const res = await apiCallerWithToken(accessToken, dispatch2).get(
          "account",
          {
            params: {
              limit: pageSize,
              p:
                data.items.length === 1
                  ? data.count > 1
                    ? page - 1
                    : 1
                  : page,
              ...(option && search ? { [option]: search } : {}),
            },
          }
        );
        dispatch1({
          type: actionTypes.FETCH,
          payload: {
            data: res.data.data,
            page:
              data.items.length === 1 ? (data.count > 1 ? page - 1 : 1) : page,
            pageSize,
            ...(option && search ? { option, search } : {}),
          },
        });
        notification.success({ message: `Successfully` });
      }
    } catch (error) {
      console.log(error);
      notification.success({ message: `Something's wrong` });
    }
  };
  const handleCloseModal = () => {
    dispatch1({
      type: "Close Modal",
      payload: { openModal: false, row: null },
    });
  };

  const handleEdit = async (record) => {
    try {
      delete record.key;
      delete record.subCategories;
      delete record.parent;
      const res = await apiCallerWithToken(accessToken, dispatch2).patch(
        "account/" + record.id,
        record
      );
      const { code, message, data: _data } = res.data;
      if (code === 200 || message === "Success") {
        dispatch1({
          type: "Edit Account",
          payload: {
            data: {
              items: data.items.map((item) =>
                item.id === _data.id ? _data : item
              ),
              count: data.count + 1,
            },
          },
        });
        notification.success({ message: `Successfully` });
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: `Something's wrong` });
    }
  };

  const handleAdd = async (record) => {
    try {
      record.parentId = record.parentId === -1 ? null : record.parentId;

      const res = await apiCallerWithToken(accessToken, dispatch2).post(
        "account",
        record
      );
      const { code, message, data: _data } = res.data;
      if (code === 201 || message === "Success") {
        if (page === 1) {
          if (data.count === pageSize) {
            dispatch1({
              type: "Add Account (Count = Page Size)",
              payload: {
                data: {
                  items: [
                    _data,
                    ...data.items.filter((_, index) => index !== pageSize - 1),
                  ],
                  count: data.count + 1,
                },
              },
            });
          } else {
            dispatch1({
              type: "Add Account (Count != Page Size)",
              payload: {
                data: { items: [_data, ...data.items], count: data.count + 1 },
              },
            });
          }
        } else {
          await handlePageChange(1, pageSize);
        }
        notification.success({ message: `Successfully` });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: `Something's wrong` });
    }
  };

  return (
    <>
      <Content className="common-layout-content-cus">
        <div className="common-content-wrap">
          <div className="common-content">
            <TableUser
              onOpenModal={(row) =>
                dispatch1({
                  type: "Open Modal",
                  payload: { openModal: true, row },
                })
              }
              data={data}
              onSearch={handleSearch}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </Content>
      <div className="common-pagination-cus">
        <Pagination
          onChange={(page, pageSize) => handlePageChange(page, pageSize)}
          pageSize={pageSize}
          total={data.count}
          current={page}
          showSizeChanger={true}
          pageSizeOptions={[7, 20, 100, 200]}
        />
      </div>
      {openModal && (
        <ModalForm
          row={row}
          open={openModal}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      )}
    </>
  );
};

export default UserPage;
