/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react';
import {
	User,
	users,
	Asset,
	assets,
	units,
	Unit,
	companies,
	Company,
} from '../constants/types';

const AppContext = createContext({
	users,
	assets,
	units,
	companies,

	getUnits: () => {},
	getUsers: () => {},
	getAssets: () => {},
	getCompanies: () => {},
	updateUser: (id: number, user: User) => {},
	updateAsset: (id: number, user: Asset) => {},
	delUser: (id: number) => {},
	delAsset: (id: number) => {},
});

export default AppContext;
