import React, { FC, useContext, useEffect, useState } from 'react';

import { Modal } from 'antd';

import { Input, Select, Form } from 'antd';
import AppContext from '../context/AppContext';

const { Option } = Select;

import { Asset, User } from '../constants/types';

interface UserCreateEditFormProps {
	visible: boolean;
	currentUserId: number;
	defaultValue: User;
	onCreate: (values: User) => void;
	onCancel: () => void;
}

const UserCreateEdit: React.FC<UserCreateEditFormProps> = ({
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

export default UserCreateEdit;
