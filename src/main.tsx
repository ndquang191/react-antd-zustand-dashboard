import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { StyleProvider, legacyLogicalPropertiesTransformer } from "@ant-design/cssinjs";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#1E6091", // Xanh nước biển ấm
					colorError: "#D72638", // Đỏ nguy hiểm ấm hơn
					colorWarning: "#FFAA00", // Vàng cam
					colorSuccess: "#4CAF50", // Xanh lá ấm
					colorInfo: "#FF6F61", // Đỏ san hô
				},
				components: {
					Menu: {
						// darkItemSelectedBg: "white",
						// itemActiveBg: "red",
						itemSelectedBg: "#1E6091",
						itemSelectedColor: "white",
						itemColor: "#A6ADB4",
						// subMenuItemBg: "white",
						// itemSelectedColor: "#ED2F1D",
						itemHoverColor: "gray",
					},
				},
			}}
		>
			<StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
				<App />
			</StyleProvider>
			<ToastContainer />
		</ConfigProvider>
	</React.StrictMode>
);
