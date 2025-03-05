export interface inforUser {
	accessToken: string;
	refreshToken: string;
	isFirstPassword?: boolean;
	device?: string;
}

export interface dataPostLoginType {
	username: string;
	password: string;
	deviceId: string;
	typeEmployee: string;
}
