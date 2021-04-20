import React, { FC } from 'react';
import { Typography } from 'antd';
import { Statistic, Row, Col, Button } from 'antd';
import { Alert, Space } from 'antd';

const { Title } = Typography;

const Home: FC = () => {
	return (
		<div>
			<p>Home</p>
			<Alert message="Warning" type="warning" showIcon closable />
		</div>
	);
};

export default Home;
