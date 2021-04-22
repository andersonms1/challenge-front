import React, {
	useEffect,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import { baseurl } from '../constants';
import {
	User,
	users,
	Asset,
	assets,
	Unit,
	units,
	Company,
	companies,
} from '../constants/types';

import { FormInstance } from 'antd/lib/form';

interface AuxProps {
	children: ReactNode;
	// children: ReactChild | ReactChildren;
}

const AppProvider = ({ children }: AuxProps): JSX.Element => {
	const get = async (url: string) => {
		try {
			const { data } = await axios.get(`${baseurl}/${url}`);
			setAppContext((prevState) => {
				return {
					...prevState,
					[url]: data,
				};
			});
		} catch (e) {
			new Error(e);
		}
	};

	const update = (type: string, id: number, item: User | Asset | any) => {
		setAppContext((prevState) => {
			if (type === 'users') {
				return {
					...prevState,
					[type]: prevState.users.map((u) => (u.id !== id ? u : item)),
				};
			} else if (type === 'assets') {
				return {
					...prevState,
					[type]: prevState.assets.map((u) => (u.id !== id ? u : item)),
				};
			} else {
				console.log(new Error());
				return {
					...prevState,
				};
			}
		});
	};

	const del = (type: string, id: number) => {
		setAppContext((prevState) => {
			if (type === 'users') {
				return {
					...prevState,
					[type]: (prevState.users = prevState.users.filter(
						(item: User) => item.id !== id
					)),
				};
			} else if (type === 'assets') {
				return {
					...prevState,
					[type]: (prevState.assets = prevState.assets.filter(
						(item: Asset) => item.id !== id
					)),
				};
			} else {
				console.log(new Error());
				return {
					...prevState,
				};
			}
		});
	};
	const getUsers = () => {
		get('users');
		// getCompanies();
		// getUnits();
	};

	const getAssets = () => {
		get('assets');
		getCompanies();
		getUnits();
	};

	const getUnits = () => {
		get('units');
	};

	const getCompanies = () => {
		get('companies');
	};

	const updateUser = (id: number, user: User) => {
		update('users', id, user);
	};
	const delUser = (id: number) => {
		del('users', id);
	};

	const delAsset = (id: number) => {
		del('assets', id);
	};

	const updateAsset = (id: number, a: Asset) => {
		update('assets', id, a);
	};

	const appState = {
		users,
		assets,
		units,
		companies,
		getCompanies,
		getUnits,
		getAssets,
		getUsers,
		delUser,
		delAsset,
		updateUser,
		updateAsset,
	};
	const [appContext, setAppContext] = useState(appState);
	return (
		<AppContext.Provider value={appContext}>{children}</AppContext.Provider>
	);
};

export default AppProvider;
