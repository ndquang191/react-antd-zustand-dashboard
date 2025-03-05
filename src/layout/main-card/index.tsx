import { memo, ReactNode } from "react";
import { Card, Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface MainCardProps {
	title?: ReactNode;
	children: ReactNode;
	canGoBack?: boolean;
}

const MainCard = ({ title, children, canGoBack }: MainCardProps) => {
	const navigate = useNavigate();

	return (
		<Card
			// className="overflow-y-scroll h-[] "
			style={{
				padding: "5px",
			}}
			className="overflow-y-scroll h-[calc(100vh-76px)] "
			title={
				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					{canGoBack && <Button type="text" onClick={() => navigate(-1)} icon={<LeftOutlined />} />}
					<Typography.Text strong>{title}</Typography.Text>
				</div>
			}
			// style={{ width: "100%", height: "100%" }}
		>
			{children}
		</Card>
	);
};

export default memo(MainCard);
