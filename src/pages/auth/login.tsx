import { memo } from "react";
import BG_LOGIN from "@assets/images/bg_login.png";
import BG_Ellipse from "@assets/images/bg_ellipse_login.png";
import { Form, Input, Checkbox, Button, Row, Col, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LogoWithText from "@assets/svg/logo_with_text.svg";
// import PopupNotification from "@helpers/popup-notification";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@route/AppRoutes";
import useLoadingStore from "../../store/loadingStore";
import CryptoJS from "crypto-js";

export const Login = memo(() => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { login } = useAuthStore();
	const { loading, setLoading } = useLoadingStore();

	const handleLogin = async (values: { username: string; password: string; checked: boolean }) => {
		setLoading(true);
		const resStatus = await login({
			deviceId: "iphone",
			typeEmployee: "1",
			password: CryptoJS.MD5(values.password).toString(),
			username: values.username,
		});

		if (resStatus == true) {
			navigate(AppRoutes.dashboard);
		}
		setLoading(false);
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundImage: `url(${BG_Ellipse})`,
				backgroundSize: "50% 100%",
				backgroundPosition: "right",
				backgroundRepeat: "no-repeat",
				gap: "32px",
			}}
		>
			<img src={LogoWithText} alt="Logo" className="select-none" />
			<div
				style={{
					backgroundImage: `url(${BG_LOGIN})`,
					backgroundSize: "60% 95%",
					backgroundPosition: "bottom right",
					backgroundRepeat: "no-repeat",
					backgroundColor: "white",
					width: "60%",
					borderRadius: 24,
					boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
					padding: "32px 32px 60px 32px",
				}}
			>
				<Row>
					<Col xs={24} sm={24} md={10} lg={10} xl={10} style={{ marginLeft: 32 }}>
						<Typography.Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
							ĐĂNG NHẬP
						</Typography.Title>

						<Form
							form={form}
							layout="vertical"
							initialValues={{ username: "", password: "", checked: true }}
							onFinish={handleLogin}
						>
							<Form.Item
								label="Tài khoản"
								name="username"
								required={false} // Ẩn dấu *
								rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
							>
								<Input size="large" />
							</Form.Item>

							<Form.Item
								label="Mật khẩu"
								name="password"
								required={false} // Ẩn dấu *
								rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
							>
								<Input.Password
									size="large"
									iconRender={(visible) =>
										visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
									}
								/>
							</Form.Item>

							<Form.Item name="checked" valuePropName="checked">
								<Checkbox>Lưu mật khẩu</Checkbox>
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									loading={loading}
									style={{
										width: "100%",
										height: 48,
										borderRadius: 8,
										marginTop: 20,
										marginBottom: 24,
										fontWeight: "bold",
										fontSize: 16,
									}}
								>
									ĐĂNG NHẬP
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	);
});
