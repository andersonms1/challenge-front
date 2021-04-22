import React, { FC, useContext, useEffect, useState } from 'react';

import { Modal } from 'antd';

import { Input, Select, Form } from 'antd';
import AppContext from '../context/AppContext';

const { Option } = Select;

import { Asset, User } from '../constants/types';
import users from '../constants/users';

interface DelegateTaskFormProps {
	visible: boolean;
	asset: Asset;
	onCreate: (values: Asset) => void;
	onCancel: () => void;
}

const DelegateTask: React.FC<DelegateTaskFormProps> = ({
	visible,
	onCreate,
	onCancel,
	asset,
}) => {
	const [form] = Form.useForm();
	const { units, companies } = useContext(AppContext);

	return (
		<Modal
			visible={visible}
			title="Editar"
			okText="Salvar"
			cancelText="Cancelar"
			onCancel={() => {
				// TO DO
				// It did not cleam fields,

				// form.validateFields().then(() => form.resetFields());
				// form.resetFields();
				// (async () => {
				// 	console.log(await form.resetFields());
				// })();
				onCancel();
			}}
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
					name="companyId"
					label={`Compania: ${asset.companyId}`}
					initialValue={asset.companyId}
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
					label={`Unidade: ${asset.unitId}`}
					initialValue={asset.unitId}
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

				<Form.Item
					name="user"
					label={`Delegar reponsável`}
					// initialValue={asset.unitId}
					rules={[
						{
							required: true,
							message: 'Por favor, selecione!',
						},
					]}
				>
					<Select placeholder="" allowClear>
						{users.map((item) => {
							if (
								item.companyId === asset.companyId &&
								item.unitId === asset.unitId
							) {
								return (
									<Option value={item.id} key={item.id}>
										{item.name}
									</Option>
								);
							}
						})}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default DelegateTask;
