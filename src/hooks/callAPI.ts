import useLoadingStore from "../store/loadingStore";
import PopupNotification from "@helpers/popup-notification";
const SuccessStatusList = [200, 203, 204];

export const callApiCommon = async (
	api: (payload: any) => Promise<any>,
	payload: any,
	isLoading: boolean,
	onSuccess?: (res: any) => void,
	onError?: (err: any) => void
) => {
	const setLoading = useLoadingStore.getState().setLoading;

	try {
		if (isLoading) setLoading(true);

		const response = await api(payload);

		if (isLoading) setLoading(false);

		if (SuccessStatusList.includes(response?.status)) {
			onSuccess?.(response);
		} else {
			onError?.(response);
		}
	} catch (error) {
		if (isLoading) setLoading(false);
		onError?.(error);
	}
};

export const handleApiRequest = async <T>(
	apiFunction: (params: any) => Promise<T>,
	params: any,
	onSuccess?: (response: T) => void,
	onError?: (error: any) => void
) => {
	try {
		const response: any = await apiFunction(params);

		if (response?.result?.isOK === true) {
			onSuccess ? onSuccess(response) : PopupNotification({ type: "success", message: "Thành công!" });
			return response;
		} else {
			const errorMessage = response?.result?.responseMessage || "Lỗi không xác định!";
			onError ? onError(errorMessage) : PopupNotification({ type: "error", message: errorMessage });
			return null;
		}
	} catch (error) {
		onError
			? onError(error)
			: PopupNotification({ type: "error", message: "Lỗi hệ thống, vui lòng thử lại!" });
		return null;
	}
};
