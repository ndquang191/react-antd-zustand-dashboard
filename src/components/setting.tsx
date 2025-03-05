import { Tooltip, Typography, Card } from "antd";
import { useState } from "react";
import Setting from "../assets/svg/setting.svg";

const SettingHeader = () => {
	const [open, setOpen] = useState(false);

	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen);
	};

	return (
		<div>
			<Tooltip
				open={open}
				onOpenChange={handleOpenChange}
				placement="bottom"
				trigger={["hover"]}
				overlayStyle={{ padding: 0 }}
				title={
					<Card style={{ width: 200, padding: 12 }}>
						<Typography.Text style={{ display: "block", padding: 4 }}>Setting 1.</Typography.Text>
						<Typography.Text style={{ display: "block", padding: 4 }}>Setting 2.</Typography.Text>
						<Typography.Text style={{ display: "block", padding: 4 }}>Setting 3.</Typography.Text>
						<Typography.Text style={{ display: "block", padding: 4 }}>Setting 4.</Typography.Text>
					</Card>
				}
			>
				<img width={32} height={32} src={Setting} />
			</Tooltip>
		</div>
	);
};

export default SettingHeader;
