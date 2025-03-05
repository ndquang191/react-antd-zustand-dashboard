export const processData = (fieldValue: any, singeFile = false) => {
	if (fieldValue?.fileList) {
		if (singeFile) {
			return fieldValue.fileList[0].originFileObj;
		}
		return fieldValue.fileList.map((item: any) => item.originFileObj);
	}
	return fieldValue; // Nếu không phải file upload, giữ nguyên dữ liệu
};
