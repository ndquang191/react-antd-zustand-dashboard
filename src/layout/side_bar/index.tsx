import { memo } from "react";

import React from "react";
import { Menu, MenuProps, Layout } from "antd";
import { AppRoutes } from "@route/AppRoutes";
// import LogoWithText from "../../assets/svg/logo_with_text.svg";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;
function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		label,
		key,
		icon,
		children,
		type,
	} as MenuItem;
}

const items: MenuProps["items"] = [
	getItem(`DashBoard`, AppRoutes.dashboard, <DashboardOutlined />),
	{ type: "divider" },
	getItem("Quản lý nhân viên", "1", <UserOutlined />, [
		getItem("Danh sách nhân viên", AppRoutes.auth.root),
		getItem("Giao việc", "Option 2"),
	]),
	//   getItem(
	//     "Users",
	//     "Users",
	//     <img src={Dashboard} width={20} height={"auto"} />,
	//     [
	//       getItem("User Management", "User Management"),
	//       getItem("Option 6", "6"),
	//       getItem("Submenu", "sub3", null, [
	//         getItem("Option 7", "7"),
	//         getItem("Option 8", "8"),
	//       ]),
	//     ]
	//   ),

	//   getItem("Catalog", "3", <img src={Dashboard} width={20} height={"auto"} />, [
	//     getItem("Option 9", "9"),
	//   ]),
	//   getItem("Dishes", "4", <img src={Dashboard} width={20} height={"auto"} />, [
	//     getItem("Dishes Managament", "10"),
	//   ]),
	//   getItem("ShipFree", "5", <img src={Dashboard} width={20} height={"auto"} />, [
	//     getItem("ShipFree Managament", "11"),
	//   ]),
];

const SideBar = memo(() => {
	const [collapsed, setCollapsed] = React.useState(false);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={setCollapsed}
			width={220} // Độ rộng tối đa khi mở
			collapsedWidth={80} // Độ rộng khi thu gọn
			style={{ background: "#001529" }}
		>
			<div className="flex justify-center py-4">
				{!collapsed && <span className="text-white font-extrabold text-6xl">HRM</span>}
				{collapsed && <span className="text-white font-extrabold text-6xl">H</span>}
			</div>

			<Menu
				onClick={(e) => console.log(e)}
				style={{ width: "100%", backgroundColor: "#001529", border: "none", color: "white" }}
				defaultSelectedKeys={[AppRoutes.dashboard]}
				defaultOpenKeys={[AppRoutes.dashboard]}
				mode="inline"
				items={items}
			/>
		</Sider>
	);
});
export default SideBar;
