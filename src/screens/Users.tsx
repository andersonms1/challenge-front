import React, { FC, useContext, useEffect, useState } from 'react';

import { Spin, Space } from 'antd';
import { Table } from 'antd';

import { DeleteFilled, EditFilled } from '@ant-design/icons';

import AppContext from '../context/AppContext';
import { User } from '../constants/types';

import { Modal } from 'antd';

import { Input, Select, Form } from 'antd';

const { Option } = Select;

interface CollectionCreateFormProps {
	visible: boolean;
	currentUserId: number;
	defaultValue: User;
	onCreate: (values: User) => void;
	onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
	visible,
	onCreate,
	onCancel,
	defaultValue,
}) => {
	const [form] = Form.useForm();
	const { units, companies } = useContext(AppContext);

	return (
		<Modal
			visible={visible}
			title="Editar"
			okText="Salvar"
			cancelText="Cancelar"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{ modifier: 'true' }}
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[
						{
							required: true,
							message: 'Por favor, digite o nome!',
						},
					]}
					initialValue={defaultValue.name}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: 'Por favor, digite o email!',
						},
					]}
					initialValue={defaultValue.email}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="companyId"
					label="Compania"
					initialValue={defaultValue.companyId}
					rules={[
						{
							required: true,
							message: 'Por favor, selecione!',
						},
					]}
				>
					<Select placeholder="" allowClear>
						{companies.map((item) => {
							return (
								<Option value={item.id} key={item.id}>
									{item.name}
								</Option>
							);
						})}
					</Select>
				</Form.Item>

				<Form.Item
					name="unitId"
					label="Unidade"
					initialValue={defaultValue.unitId}
					rules={[
						{
							required: true,
							message: 'Por favor, selecione!',
						},
					]}
				>
					<Select placeholder="" allowClear>
						{units.map((item) => {
							return (
								<Option value={item.id} key={item.id}>
									{item.name}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const Users: FC = () => {
	const { users, getUsers, delUser, units, companies, updateUser } = useContext(
		AppContext
	);
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
		getUsers();
	}, []);

	// useEffect(() => {
	// 	console.log(users);
	// 	console.log(units);
	// }, [users, units]);

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
					<CollectionCreateForm
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
