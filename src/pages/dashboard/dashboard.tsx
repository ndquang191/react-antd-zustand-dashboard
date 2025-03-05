import React from "react";
import { Form, Input, Button, DatePicker, Row, Col, Select } from "antd";
import MainCard from "@layout/main-card";
import UploadImage from "@components/upload-image";
const { Option } = Select;
import { handleApiRequest } from "@hooks/callAPI";
import { createEmployeeApi } from "@api/employee";
import { processData } from "@helpers/ultis";

export const DashBoard: React.FC = () => {
	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		const payload = {
			userRequest: {
				isFirstPassword: true,
				typeAccount: values.typeAccount,
				fullName: values.fullName,
				diaChiHienTai: values.diaChiHienTai,
				birth: values.birth,
				idPhongBan: values.idPhongBan,
				idChucVu: values.idChucVu,
				idTrangThai: values.idTrangThai,
				soCCCD: values.soCCCD,
				gender: values.gender,
				workStartDate: values.workStartDate,
				email: values.email,
				phone: values.phone,
			},
			avatar: processData(values.avatar, true),
			file: processData(values.file, true),
		};

		const res = handleApiRequest(createEmployeeApi, payload);

		console.log(res);
	};

	return (
		<MainCard title="Tạo nhân viên">
			<Form
				form={form}
				layout="vertical"
				onFinish={onFinish}
				initialValues={{
					isFirstPassword: true,
				}}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Họ và Tên"
							name="fullName"
							rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Số CCCD"
							name="soCCCD"
							rules={[{ required: true, message: "Vui lòng nhập số CCCD" }]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Địa Chỉ Hiện Tại" name="diaChiHienTai">
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Ngày Sinh"
							name="birth"
							rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
						>
							<DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					{/* Gender */}
					<Col span={12}>
						<Form.Item
							label="Giới Tính"
							name="gender"
							rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
						>
							<Select placeholder="Chọn giới tính">
								<Select.Option value={false}>Nữ</Select.Option>
								<Select.Option value={true}>Nam</Select.Option>
							</Select>
						</Form.Item>
					</Col>

					{/* Work Start Date */}
					<Col span={12}>
						<Form.Item
							label="Ngày Bắt Đầu Làm Việc"
							name="workStartDate"
							rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu làm việc" }]}
						>
							<DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					{/* Phone */}
					<Col span={12}>
						<Form.Item
							label="Số Điện Thoại"
							name="phone"
							rules={[
								{ required: true, message: "Vui lòng nhập số điện thoại" },
								{ pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ" },
							]}
						>
							<Input placeholder="Nhập số điện thoại" />
						</Form.Item>
					</Col>

					{/* Email */}
					<Col span={12}>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: "Vui lòng nhập email" },
								{ type: "email", message: "Email không hợp lệ" },
							]}
						>
							<Input placeholder="Nhập email" />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					{/* Upload Avatar */}
					{/* Chức Vụ */}
					<Col span={12}>
						<Form.Item label="Chức Vụ" name="idChucVu">
							<Select placeholder="Chọn chức vụ">
								<Option value="CV001">Quản lý</Option>
								<Option value="CV002">Nhân viên</Option>
							</Select>
						</Form.Item>
					</Col>

					{/* Phòng Ban */}
					<Col span={12}>
						<Form.Item label="Phòng Ban" name="idPhongBan">
							<Select placeholder="Chọn phòng ban">
								<Option value="PB001">Phòng Kỹ thuật</Option>
								<Option value="PB002">Phòng Nhân sự</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					{/* Trạng Thái */}
					<Col span={12}>
						<Form.Item label="Trạng Thái" name="idTrangThai">
							<Select placeholder="Chọn trạng thái">
								<Option value="TT001">Đang làm</Option>
								<Option value="TT002">Nghỉ việc</Option>
							</Select>
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label="Loại Tài Khoản" name="typeAccount">
							<Select>
								<Option value={0}>Admin</Option>
								<Option value={1}>User</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<UploadImage name="avatar" label="Upload Ảnh" />
					</Col>

					<Col span={12}>
						<UploadImage name="file" label="Upload Hồ Sơ" />
					</Col>
				</Row>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Gửi Dữ Liệu
					</Button>
				</Form.Item>
			</Form>
		</MainCard>
	);
};
