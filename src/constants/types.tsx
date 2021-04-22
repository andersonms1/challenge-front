export type User = {
	id: number;
	email: string;
	name: string;
	unitId: number;
	companyId: number;
};
export const users: User[] = [];

export type Asset = {
	id: number;
	sensors: Array<string>;
	model: string;
	status: string;
	healthscore: number;
	name: string;
	image: string;
	specifications: {
		maxTemp: number;
		rpm: number;
		power: number;
	};
	metrics: {
		totalCollectsUptime: number;
		totalUptime: number;
		lastUptimeAt: string;
	};
	unitId: number;
	companyId: number;
};
export const assets: Asset[] = [];

export type Unit = {
	id: number;
	name: string;
	companyId: number;
};
export const units: Unit[] = [];

export type Company = {
	id: number;
	name: string;
};

export const companies: Company[] = [];
