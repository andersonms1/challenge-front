import React, { FC, useContext, useEffect, useState } from 'react';

import { Spin, Space } from 'antd';
import { Table } from 'antd';

import { DeleteFilled, EditFilled } from '@ant-design/icons';

import AppContext from '../context/AppContext';
import { User } from '../constants/types';
import { UserCreateEdit } from '../components';

const Users: FC = () => {
	const {
		users,
		getUsers,
		delUser,
		units,
		companies,
		updateUser,
		getCompanies,
		getUnits,
	} = useContext(AppContext);
	const [visible, setVisible] = useState(false);
	const [currentUserId, setCurrentUserId] = useState(0);

	const onSave = (values: User) => {
		console.log('Received values of form: ', values);
		updateUser(currentUserId, values);
		setVisible(false);
	};
	const [user, setUser] = useState<User>({
		id: 0,
		name: '',
		email: '',
		unitId: 0,
		companyId: 0,
	});

	const columns = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
			render: function getText(text: string) {
				return <a>{text}</a>;
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Companhia',
			dataIndex: 'companyId',
			key: 'companyId',
			render: function getComany(id: number) {
				const companyName = companies.filter((i) => i.id === id);
				if (companyName[0]) return companyName[0].name;
				else return 'Not found';
			},
		},
		{
			title: 'Unidade',
			dataIndex: 'unitId',
			key: 'unitId',
			render: function getUnity(id: number) {
				const unitName = units.filter((i) => i.id === id);
				return unitName[0] ? unitName[0].name : 'Not found';
			},
		},
		{
			title: 'Ação',
			key: 'action',
			render: function getAction(text: string, record: User) {
				return (
					<Space size="middle">
						<a>
							<EditFilled
								onClick={() => {
									setVisible(true);
									setUser(record);
									setCurrentUserId(record.id);
								}}
							/>
						</a>
						<a>
							<DeleteFilled onClick={() => delUser(record.id)} />
						</a>
					</Space>
				);
			},
		},
	];

	useEffect(() => {
		getCompanies();
		getUnits();
		getUsers();
	}, []);

	const handleLoad = () => {
		return (
			<Space size="large">
				<Spin size="large" />
			</Space>
		);
	};

	const didUsersUnitsLoad = () => {
		if (users?.length && units?.length && companies?.length) {
			return true;
		} else return false;
	};

	return (
		<>
			{didUsersUnitsLoad() ? (
				<>
					<Table columns={columns} dataSource={users} />
					<UserCreateEdit
						visible={visible}
						onCreate={onSave}
						currentUserId={currentUserId}
						defaultValue={user}
						onCancel={() => {
							setVisible(false);
						}}
					/>
				</>
			) : (
				handleLoad()
			)}
		</>
	);
};

export default Users;
