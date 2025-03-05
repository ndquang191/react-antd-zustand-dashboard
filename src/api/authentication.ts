import { dataPostLoginType } from "@utils/types/auth_type";
import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
import useAuthStore from "../store/authStore";
const loginRequestApi = (params: dataPostLoginType) => {
	return axiosClient.post(endpoint.auth.login, params);
};

const refreshTokenRequestApi = () => {
	const user = useAuthStore.getState().user;
	return axiosClient.get(endpoint.auth.refreshToken, {
		headers: {
			"Content-Type": "application/json",
			transactionId: new Date().getTime().toString(),
			accessToken: user?.accessToken,
			refreshToken: user?.refreshToken,
		},
	});
};

export { loginRequestApi, refreshTokenRequestApi };
