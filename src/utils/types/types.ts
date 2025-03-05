export interface resultsType {
	limit: number;
	page: number;
	results: Array<any>;
	totalPages: number;
	totalResults: number;
}

/// common type
interface AccessToken {
	token: string;
	expires: string;
}
interface RefreshToken {
	token: string;
	expires: string;
}
// interface inforUser {
// 	active: boolean;
// 	address: string;
// 	avatar: string;
// 	devicedId: string;
// 	email: string;
// 	id: string;
// 	name: string;
// 	phoneNumber: string;
// 	role: string;
// 	favouriteList: Array<object>;
// 	isEmailVerified: boolean;
// }

export interface refreshTokensResultType {
	access: AccessToken;
	refresh: RefreshToken;
}
export interface paginationType {
	page: number | 1;
	limit: number | 10;
	sortBy?: string;
}

export interface DataForDate {
	// id: string;
	date: string;
	count: number;
}
