export * from "./brand";
export * from "./category";
export * from "./classification";
export * from "./company";
export * from "./documentation";
export * from "./gas";
export * from "./gas-station";
export * from "./gas-supply";
export * from "./occurrence";
export * from "./seriousness";
export * from "./status";
export * from "./vehicle";

export interface ContextApiProps {
	params?: { id?: string };
}
export interface GetData {
	url: string;
	query?: string;
	id?: number;
	signal?: AbortSignal;
}

export interface PostData<TForm> {
	url: string;
	data: TForm;
	signal?: AbortSignal;
}
export interface PutData<TForm> {
	url: string;
	data: TForm;
	id: any;
	signal?: AbortSignal;
}
export interface DeleteData {
	id: number;
	url: string;
	signal?: AbortSignal;
}

export interface DefaultAPIRequest {
	googleId?: string;
}

export interface DefaultAPI {
	id: number;
	createdAt: string;
	updateAt: string;
}
