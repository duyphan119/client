import instance from "../config/configAxios";
import { URL_API } from "../constants";

// ví dụ mẫu 1 cái gọi api thế

const register = (user) => {
  return instance.post(`${URL_API}/auth/register`, user);
};

export const authApi = {
  register,
};
