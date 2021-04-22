import React, { FC, useContext, useEffect, useState } from 'react';

import { Modal } from 'antd';

import { Input, Select, Form } from 'antd';
import AppContext from '../context/AppContext';
import { Asset, User } from '../constants/types';

import { Steps, Divider } from 'antd';

const { Step } = Steps;

const { Option } = Select;
interface AssetrCreateEditFormProps {
	visible: boolean;
	asset: Asset;
	onCreate: (values: Asset) => void;
	onCancel: () => void;
}

const AssetCreateEdit: React.FC<AssetrCreateEditFormProps> = ({
	visible,
	onCreate,
	onCancel,
	asset,
}) => {
	const [form] = Form.useForm();
	const { units, companies } = useContext(AppContext);
	const [current, setCurrent] = useState(0);

	const handleSteps = () => {
		switch (current) {
			case 0:
				return (
					<>
						<Form.Item
							name="name"
							label="Nome"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="type"
							label="Tipo"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="image"
							label="Imagem"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
					</>
				);
			case 1:
				return (
					<>
						<Form.Item
							name="maxTemp"
							label="Temperatura Máxima"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="rpm"
							label="RPM"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="power"
							label="Power"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
					</>
				);
			case 2:
				return (
					<>
						<Form.Item
							name="sensors"
							label="Sensores"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="totalCollectsUptime"
							label="Tempo de vida"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>{' '}
						<Form.Item
							name="totalUptime"
							label="Tempo de trabalho atual"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>{' '}
						<Form.Item
							name="lastUptimeAt"
							label="Ultima coleta"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
					</>
				);

			case 3:
				return (
					<>
						<Form.Item
							name="healthscore"
							label="Confiabilidade"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="status"
							label="Status"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
					</>
				);

			case 4:
				return (
					<>
						<Form.Item
							name="companyId"
							label="Compania"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="unityId"
							label="Unidade"
							rules={[
								{
									required: true,
									message: 'Por favor, digite o nome!',
								},
							]}
							// initialValue={defaultValue.name}
						>
							<Input />
						</Form.Item>
					</>
				);

			default:
				<p>Opção não encontrada</p>;
		}
	};

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
			<Steps progressDot direction="vertical" current={current}>
				<Step title="Identificador" onClick={() => setCurrent(0)} />
				<Step title="Especificações" onClick={() => setCurrent(1)} />
				<Step title="Métricas" onClick={() => setCurrent(2)} />
				<Step title="Status" onClick={() => setCurrent(3)} />
				<Step title="Empresa" onClick={() => setCurrent(4)} />
			</Steps>
			<Divider />
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{ modifier: 'true' }}
			>
				{handleSteps()}
			</Form>
		</Modal>
	);
};

export default AssetCreateEdit;
