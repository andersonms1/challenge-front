import React, {
	FC,
	useContext,
	useEffect,
	useState,
	SetStateAction,
} from 'react';

import { Spin, Space } from 'antd';
import { Table, Tag } from 'antd';

import {
	DeleteOutlined,
	DeleteFilled,
	PlusCircleOutlined,
	PlusCircleFilled,
	EditFilled,
} from '@ant-design/icons';

import AppContext from '../context/AppContext';
import { User, users as TPUSERS } from '../constants/types';
import { Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Modal, Button } from 'antd';

import { Input, Select, Form, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;
const Users: FC = () => {
	const { users, getUsers, delUser, units, companies } = useContext(AppContext);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [user, setUser] = useState<User>({
		id: 0,
		name: '',
		email: '',
		unitId: 0,
		companyId: 0,
	});

	const [form] = Form.useForm();

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
				return companyName[0].name;
			},
		},
		{
			title: 'Unidade',
			dataIndex: 'unitId',
			key: 'unitId',
			render: function getUnity(id: number) {
				const unitName = units.filter((i) => i.id === id);
				return unitName[0].name;
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
									setIsModalVisible(true);
									setUser(record);
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

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const formRef = React.createRef<FormInstance>();

	const handleForm = () => {
		// const user = users[]
		return (
			<Form
				{...layout}
				form={form}
				name="control-hooks"
				// onFinish={onFinish}
				// name="basic"
				initialValues={{ remember: true }}
				onFinish={(values: any) => console.log(values)}
				onFinishFailed={() => alert('failed')}
			>
				<Form.Item
					label="Nome"
					name="nome"
					rules={[
						{ required: true, message: 'Por favor, digite o nome do usuário' },
					]}
				>
					<Input
						value={user?.name}
						defaultValue={user?.name}
						onChange={(e) => {
							console.log(user);
							setUser({ ...user, name: 'test' });
							console.log(user);
						}}
					/>
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Digite o email do usuário' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
					<Select
						placeholder="Select a option and change input text above"
						onChange={(value) => console.log(value)}
						allowClear
					>
						<Option value="male">male</Option>
						<Option value="female">female</Option>
						<Option value="other">other</Option>
					</Select>
				</Form.Item>
			</Form>
		);
	};

	return (
		<>
			{didUsersUnitsLoad() ? (
				<>
					<Table columns={columns} dataSource={users} />
					<Modal
						title="Usuários"
						visible={isModalVisible}
						onOk={() => {
							setIsModalVisible(false);
							form.setFieldsValue({
								note: 'Hello world!',
								gender: 'male',
							});
							console.log(form.getFieldsValue);
						}}
						onCancel={() => {
							setIsModalVisible(false);
							form.resetFields();
						}}
					>
						{handleForm()}
					</Modal>
				</>
			) : (
				handleLoad()
			)}
		</>
	);
};

export default Users;
