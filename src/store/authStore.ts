import { create } from "zustand";
import { persist } from "zustand/middleware";
import { inforUser, dataPostLoginType } from "@utils/types/auth_type";
import { loginRequestApi } from "@api/authentication";
import PopupNotification from "@helpers/popup-notification";

interface AuthState {
	login: (payload: dataPostLoginType) => Promise<boolean | number>;
	logout: () => void;
	user: inforUser | null;
	setNewToken: (aT: string, rT: string) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			login: async (payload: dataPostLoginType) => {
				try {
					const response = await loginRequestApi(payload);
					if (response?.result.isOK === true) {
						set({ user: response.data });
						PopupNotification({ type: "success", message: "Đăng nhập thành công" });
					} else {
						PopupNotification({ type: "error", message: response?.result.responseMessage });
					}
					return response.result.isOK;
				} catch (error) {
					PopupNotification({ type: "error", message: "Lỗi hệ thống, vui lòng thử lại!" });
					return false;
				}
			},
			logout: () => {
				set({ user: null });
				localStorage.removeItem("auth-storage"); // Xóa dữ liệu đăng nhập
			},

			setNewToken: (aT: string, rT: string) => {
				set({ user: { accessToken: aT, refreshToken: rT } });
			},
		}),
		{
			name: "auth-storage", // Lưu trữ vào localStorage
		}
	)
);

export default useAuthStore;
