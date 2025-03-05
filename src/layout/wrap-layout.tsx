import { Avatar, Button, Spin } from "antd";
import { PropsWithChildren, Suspense, memo } from "react";
import NavigationScroll from "@layout/scroll.tsx";
import { LogoutOutlined } from "@ant-design/icons";
import SideBar from "./side_bar";
import useAuthStore from "../store/authStore";

type Props = PropsWithChildren<{ customStyle?: React.CSSProperties }>;

export const WrapLayout = memo(({ children }: Props) => {
	const { logout } = useAuthStore();

	return (
		<NavigationScroll>
			<Suspense fallback={<Spin />}>
				<div className="flex h-screen">
					<SideBar />
					<div className="w-full h-screen overflow-auto">
						<div className="flex justify-between items-center px-5 py-2.5 bg-white">
							<div></div>
							<div className="flex gap-2 justify-center items-center">
								<Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
								<Button
									className="!border-4"
									size="large"
									type="default"
									onClick={logout}
									danger
									icon={<LogoutOutlined />}
								/>
							</div>
						</div>
						<div className="bg-[#f0f2f5] p-2 min-h-[calc(100vh-64px)]">{children}</div>
					</div>
				</div>
			</Suspense>
		</NavigationScroll>
	);
});
