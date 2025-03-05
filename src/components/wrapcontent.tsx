import { HomeOutlined } from "@ant-design/icons";
import { AppRoutes } from "@route/AppRoutes";
import { Breadcrumb, Divider, Row, Col, Card } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { PropsWithChildren, ReactElement, ReactNode } from "react";

type WrapContentType = PropsWithChildren<{
	rightHeaderNode: ReactNode | ReactElement;
	rightContentNode: ReactNode | ReactElement;
	breadCrumb: BreadcrumbItemType[];
	label: string;
}>;

export const WrapContent = (props: WrapContentType) => {
	return (
		<div style={{ padding: 24 }}>
			<Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
				<Col>
					<Breadcrumb
						items={[
							{
								href: AppRoutes.dashboard,
								title: (
									<>
										<HomeOutlined style={{ color: "black" }} />
										<span className="text-black">Trang chủ</span>
									</>
								),
							},
							...props.breadCrumb,
						]}
						separator={<span className="text-black">{`>`}</span>}
					/>
				</Col>
				<Col>{props.rightHeaderNode}</Col>
			</Row>

			<Card style={{ padding: 24, borderRadius: 16 }}>
				<Row justify="space-between" align="middle" style={{ padding: "8px 0" }}>
					<Col>
						<h2 style={{ fontSize: 24, fontWeight: 500 }}>{props.label}</h2>
					</Col>
					<Col>{props.rightContentNode}</Col>
				</Row>
				<Divider style={{ backgroundColor: "#999999" }} />
				{props.children}
			</Card>
		</div>
	);
};
