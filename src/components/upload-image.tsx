import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

interface UploadImageProps {
	name: string;
	label: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ name, label = "Upload" }) => {
	const [fileList, setFileList] = useState<any[]>([]);

	const handleChange = ({ fileList }: { fileList: any[] }) => {
		setFileList(fileList);
	};

	const handleRemove = () => {
		setFileList([]);
	};

	return (
		<Form.Item label={label} name={name}>
			<Upload
				name={name}
				listType="picture"
				fileList={fileList}
				beforeUpload={() => false} // Không upload lên server
				onChange={handleChange}
				onRemove={handleRemove}
			>
				{fileList.length === 0 && <Button icon={<UploadOutlined />}>Chọn ảnh</Button>}
			</Upload>
		</Form.Item>
	);
};

export default UploadImage;
