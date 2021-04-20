import React, { FC, useContext, useEffect, useState } from 'react';
import { Spin, Space } from 'antd';
import AppContext from '../context/AppContext';
import { Asset, User } from '../constants/types';
import { Table, Tag } from 'antd';

const columns = [
	// {
	// 	title: 'Imagens',
	// 	dataIndex: 'image',
	// 	key: 'image',
	// 	render: function getText(text: string) {
	// 		return (
	// 			<img
	// 				style={{ width: 'auto', height: 100 }}
	// 				src={text}
	// 				alt="Imagen asset"
	// 			/>
	// 		);
	// 	},
	// },
	{
		title: 'Identificador',
		dataIndex: 'id',
		key: 'id',
		render: function getInfo(text: string, record: Asset) {
			return (
				<div>
					Identificador: <Tag>{text}</Tag>
					<br />
					Tipo: <Tag>{record.model}</Tag>
				</div>
			);
		},
	},
	{
		title: 'Sensores',
		dataIndex: 'sensors',
		key: 'sensors',
	},
	{
		title: 'Info',
		dataIndex: 'metrics',
		key: 'metrics',
	},

	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: function getTag(tag: string) {
			if (tag === 'inAlert') return <Tag color="red">{tag}</Tag>;
			if (tag === 'inDowntime') return <Tag color="green">{tag}</Tag>;
			if (tag === 'inOperation') return <Tag color="yellow">{tag}</Tag>;
			else return 'Not found';
		},
	},
];

const Assets: FC = () => {
	const { assets, getAssets } = useContext(AppContext);
	// const [isModalVisible, setIsModalVisible] = useState(false);

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
	return (
		<div>
			{assets?.length ? (
				<>
					<Table columns={columns} dataSource={assets} />
				</>
			) : (
				handleLoad()
			)}
		</div>
	);
};

export default Assets;
