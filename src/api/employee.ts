// import { DataPostEmployeeType } from "@utils/types/employee_type";
import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
const createEmployeeApi = (params: any) => {
	const formData = new FormData();
	formData.append("userRequest", JSON.stringify(params.userRequest));
	if (params.avatar) {
		formData.append("avatar", params.avatar);
	}
	if (params.file) {
		formData.append("file", params.file);
	}
	return axiosClient.post(endpoint.employee.create, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export { createEmployeeApi };
