import React, { FC, useContext, useEffect, useState } from 'react';
import { Spin, Space, Typography } from 'antd';
import AppContext from '../context/AppContext';
import { Asset, User } from '../constants/types';
import { Table, Tag } from 'antd';
import {
	DeleteTwoTone,
	EditTwoTone,
	InteractionTwoTone,
	FileImageTwoTone,
	QuestionCircleFilled,
	RobotOutlined,
} from '@ant-design/icons';

import {
	getCompany as getCompanyName,
	getUnity as getUnityName,
	DelegateTask,
	AssetCreateEdit,
} from '../components';

const { Title, Paragraph, Text } = Typography;
const Assets: FC = () => {
	const { assets, getAssets, units, companies } = useContext(AppContext);
	const [openDelgateTask, setOpenDelegateState] = useState(false);
	const [openAsset, setOpenAsset] = useState(false);
	const [delegateTask, setDelegateTask] = useState<Asset>({
		id: 0,
		companyId: 0,
		healthscore: 0,
		image: '',
		model: '',
		metrics: {
			lastUptimeAt: '',
			totalCollectsUptime: 0,
			totalUptime: 0,
		},
		name: '',
		specifications: {
			maxTemp: 0,
			power: 0,
			rpm: 0,
		},
		status: '',
		unitId: 1,
		sensors: [''],
	});
	useEffect(() => {
		getAssets();
	}, []);

	const handleLoad = () => {
		return (
			<Space size="large">
				<Spin size="large" />
			</Space>
		);
	};

	const columns = [
		{
			title: 'Identificador',
			dataIndex: 'id',
			key: 'id',
			render: function getInfo(text: string, record: Asset) {
				return (
					<div>
						Identificador: <Tag>{text}</Tag>
						<br />
						Nome: {record.name}
						<br />
						Tipo: <Tag>{record.model}</Tag>
						<br />
						Imagem:
						<FileImageTwoTone
							size={30}
							onClick={() => {
								const win = window.open(record.image, '_blank');
								win?.focus();
							}}
						/>
					</div>
				);
			},
		},
		{
			title: 'Especificações',
			dataIndex: 'specifications',
			key: 'specifications',
			render: function getSpecs(crr: string, record: Asset) {
				const { maxTemp, rpm, power } = record.specifications;
				return (
					<div>
						<span>
							Temp. max: {maxTemp ? maxTemp : <QuestionCircleFilled />}
						</span>
						<br />
						<span>RPM: {rpm ? rpm : <QuestionCircleFilled color="red" />}</span>
						<br />
						<span>
							Power: {power ? power : <QuestionCircleFilled color="red" />}
						</span>
					</div>
				);
			},
		},
		{
			title: 'Metricas',
			dataIndex: 'metrics',
			key: 'metrics',
			render: function getMetrics(metrics: string, record: Asset) {
				const {
					lastUptimeAt,
					totalUptime,
					totalCollectsUptime,
				} = record.metrics;

				const unformated = new Date(lastUptimeAt);
				const d = new Intl.DateTimeFormat('pt-br').format(unformated);
				return (
					<div>
						Sensores: <RobotOutlined /> {record.sensors}
						<br />
						Tempo total de vida: <Tag>{`${totalCollectsUptime} Hrs`}</Tag>
						<br />
						Tempo em execução: <Tag>{`${totalUptime.toFixed()} Hrs`}</Tag>
						<br />
						Ultima atualização:
						<Tag>{d}</Tag>
					</div>
				);
			},
		},

		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: function getTag(tag: string, record: Asset) {
				if (tag === 'inAlert')
					return (
						<>
							<Title level={4}>{record.healthscore}%</Title>
							<Tag color="red">{tag}</Tag>
						</>
					);
				if (tag === 'inDowntime')
					return (
						<>
							<Title level={4}>{record.healthscore}%</Title>
							<Tag color="green">{tag}</Tag>
						</>
					);
				if (tag === 'inOperation')
					return (
						<>
							<Title level={4}>{record.healthscore}%</Title>
							<Tag color="yellow">{tag}</Tag>
						</>
					);
				else return 'Not found';
			},
		},
		{
			title: 'Empresa',
			dataIndex: 'id',
			key: 'id',
			render: function getCompany(crr: string, record: Asset) {
				return (
					<div>
						<Text>{getCompanyName(record.companyId, companies)}</Text>
						<br />
						<Text strong>{getCompanyName(record.unitId, units)}</Text>
					</div>
				);
			},
		},
		{
			title: 'Ações',
			dataIndex: 'id',
			key: 'id',
			render: function getActions(current: number, record: Asset) {
				return (
					<div>
						<DeleteTwoTone />
						<EditTwoTone
							onClick={() => {
								setDelegateTask(record);
								setOpenAsset(true);
							}}
						/>
						<InteractionTwoTone
							onClick={() => {
								setDelegateTask(record);
								setOpenDelegateState(true);
							}}
						/>
					</div>
				);
			},
		},
	];

	const didRequestResolved = () => {
		if (assets.length && companies.length && units.length) {
			return true;
		} else {
			return false;
		}
	};

	const onCreate = (values: Asset) => {
		console.log(values);
		setOpenDelegateState(false);
		alert('Abstraido logica de delegar usuários. ');
		// return void
	};

	const onEditAsset = (values: Asset) => {
		console.log(values);
		setOpenAsset(false);
		alert('Abstraido logica de delegar usuários. ');
		// return void
	};

	return (
		<div>
			{didRequestResolved() ? (
				<>
					<Table columns={columns} dataSource={assets} />
					<DelegateTask
						visible={openDelgateTask}
						asset={delegateTask}
						onCreate={onCreate}
						onCancel={() => setOpenDelegateState(false)}
					/>

					<AssetCreateEdit
						visible={openAsset}
						asset={delegateTask}
						onCreate={onEditAsset}
						onCancel={() => setOpenAsset(false)}
					/>
				</>
			) : (
				handleLoad()
			)}
		</div>
	);
};

export default Assets;
