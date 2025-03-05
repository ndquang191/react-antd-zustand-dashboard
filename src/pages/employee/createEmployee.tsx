import React from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { handleApiRequest } from "@hooks/callAPI";
import { createEmployeeApi } from "@api/employee";
const { Option } = Select;

const EmployeeForm: React.FC = () => {
	const [form] = Form.useForm();

	// Hàm gửi dữ liệu lên API
	const onFinish = async (values: any) => {
		const payload = {
			isFirstPassword: true,
			...values,
		};

		const res = handleApiRequest(createEmployeeApi, payload);

		console.log(res);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			initialValues={{
				isFirstPassword: true,
				typeAccount: 1,
			}}
		>
			<Form.Item
				label="Họ và Tên"
				name="fullName"
				rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item label="Địa Chỉ Hiện Tại" name="diaChiHienTai">
				<Input />
			</Form.Item>

			<Form.Item
				label="Ngày Sinh"
				name="birth"
				rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
			>
				<DatePicker format="YYYY-MM-DD" />
			</Form.Item>

			<Form.Item label="Avatar URL" name="avatarUrl">
				<Input />
			</Form.Item>

			<Form.Item label="Phòng Ban" name="idPhongBan">
				<Input />
			</Form.Item>

			<Form.Item label="Chức Vụ" name="idChucVu">
				<Input />
			</Form.Item>

			<Form.Item label="Trạng Thái" name="idTrangThai">
				<Input />
			</Form.Item>

			{/* <Form.Item label="Hồ Sơ" name="idHoSo">
				<Input />
			</Form.Item> */}

			<Form.Item
				label="Số CCCD"
				name="soCCCD"
				rules={[{ required: true, message: "Vui lòng nhập số CCCD" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item label="Loại Tài Khoản" name="typeAccount">
				<Select>
					<Option value={0}>Admin</Option>
					<Option value={1}>User</Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Gửi Dữ Liệu
				</Button>
			</Form.Item>
		</Form>
	);
};

export default EmployeeForm;
