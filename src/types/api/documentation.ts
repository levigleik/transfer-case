export interface Documentation {
	id: number;
	type: string;
	expiryAt: Date;
	anticipateRenewal: boolean;
	days: string[];
	createdAt: Date;
	updatedAt: Date;
}
