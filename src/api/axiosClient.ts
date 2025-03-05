import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import useAuthStore from "../store/authStore";
import { handleApiRequest } from "@hooks/callAPI";
import { refreshTokenRequestApi } from "./authentication";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const axiosClient = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
		transactionId: new Date().getTime().toString(),
	},
	timeout: 20000,
});

// 🛠️ Thêm interceptor cho request để cập nhật token động
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	const token = useAuthStore.getState().user?.accessToken; // Lấy token mới nhất

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		// Check if this is an invalid token response but we want to handle it as a normal response
		if (response.data?.result?.responseCode === "ERR_001_2003") {
			console.log("Token invalid detected in response");

			// Get the original request and cast it to our extended type
			const originalRequest = response.config as ExtendedAxiosRequestConfig;

			// Now this won't cause TypeScript errors
			if (!originalRequest._retry) {
				originalRequest._retry = true;

				// Rest of your refresh token logic
				const refreshToken = useAuthStore.getState().user?.refreshToken;

				if (refreshToken) {
					return new Promise((resolve, reject) => {
						handleApiRequest(refreshTokenRequestApi, {})
							.then((refreshResponse) => {
								console.log("Refresh token successful");

								const userData = refreshResponse.data;
								useAuthStore
									.getState()
									.setNewToken(userData.accessToken, userData.refreshToken);

								originalRequest.headers = originalRequest.headers || {};
								originalRequest.headers["Authorization"] = `Bearer ${userData.accessToken}`;

								axiosClient(originalRequest).then(resolve).catch(reject);
							})
							.catch((refreshError) => {
								console.log("Refresh token failed - Logging out...", refreshError);
								useAuthStore.getState().logout();
								reject(response.data);
							});
					});
				} else {
					console.log("No refresh token available - Logging out...");
					useAuthStore.getState().logout();
				}
			}
		}

		return response.data;
	},
	async (error) => {
		return Promise.reject(error?.response?.data || error);
	}
);

export default axiosClient;
