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

type NumToStr<T> = {
	[K in keyof T]: T[K] extends number ? string : T[K]; // mantém os outros tipos iguais
};
type BaseFormSchema<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type FormSchema<T, TRelations extends keyof T = never> = NumToStr<
	Omit<BaseFormSchema<T>, TRelations>
>;

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
