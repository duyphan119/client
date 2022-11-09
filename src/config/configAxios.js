import axios from "axios";
import { URL_API } from "../constants";
import jwtDecode from "jwt-decode";
import { authActions } from "../redux/slices/authSlice";

const instance = axios.create({
	baseURL: URL_API,
	withCredentials: true,
});

export const apiCallerWithToken = (token, dispatch) => {
	const a = axios.create({
		baseURL: URL_API,
		withCredentials: true,
	});
	a.interceptors.request.use(async (config) => {
		try {
			console.log("token: ", token);
			if (token) {
				const ngu = jwtDecode(token);

				if (ngu.exp * 1000 < new Date().getTime()) {
					console.log("Truoc refresh");
					const res = await axios.post(
						"auth/refresh-token",
						{},
						{
							baseURL: URL_API,
							withCredentials: true,
						}
					);
					console.log("sau refresh");
					const { code, message, data } = res.data;
					console.log(data.accessToken);
					if (code === 200 || message === "Success") {
						const { accessToken } = data;
						console.log("new token: ", accessToken);
						config.headers["authorization"] = `Bearer ${accessToken}`;
						dispatch(authActions.refreshToken(accessToken));
					}
				} else {
					config.headers["authorization"] = `Bearer ${token}`;
				}
			}

			// dispatch(authActions.logout());
		} catch (error) {
			console.log(error.message.response.data.code);
			// error.message.response.data.code === 401 && dispatch(authActions.logout());
		}
		return config;
	});

	return a;
};

export default instance;
