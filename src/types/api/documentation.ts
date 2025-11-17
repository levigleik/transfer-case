export interface DocumentationType {
	id: number;
	type: string;
	expiryAt: Date;
	anticipateRenewal: boolean;
	days: string[];
	createdAt: Date;
	updatedAt: Date;
}
