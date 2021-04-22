import { Company, Unit } from '../constants/types';

export function getCompany(id: number, companies: Array<Company>): string {
	const companyName = companies.filter((i) => i.id === id);
	return companyName[0] ? companyName[0].name : 'Not found';
}

export function getUnity(id: number, units: Array<Unit>): string {
	const unitName = units.filter((i) => i.id === id);
	return unitName[0] ? unitName[0].name : 'Not found';
}
