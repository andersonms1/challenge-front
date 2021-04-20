import React, { FC } from 'react';
import { Layout, Menu, PageHeader, Avatar, Typography, Row, Col } from 'antd';
import {
	HomeOutlined,
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
	CaretDownOutlined,
	ScheduleOutlined,
	RobotOutlined,
	AreaChartOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.css';
import './index.css';
import avatar from './assets/avatar.jpg';
import logo from './assets/Logo-Tractian.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { Users, Pie3d, Home, Bubble, Scatter, Assets } from './screens';

import AppProvider from './context/AppProvider';

const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App: FC = () => {
	return (
		<AppProvider>
			<Router>
				<Layout>
					<PageHeader
						className="site-page-header"
						title="Title"
						subTitle="This is a subtitle"
						avatar={{ size: 34, icon: logo, src: logo }}
						extra={
							<>
								<Row>
									<Col className="gutter-row" span={3}>
										<Avatar icon={avatar} src={avatar} />
									</Col>
									<Col className="gutter-row" span={12}>
										<>
											<Title level={4}>Usuário da Silva </Title>
										</>
									</Col>
								</Row>
							</>
						}
					/>
					{/* <Header className="header">
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
				<Menu.Item key="1">nav 1</Menu.Item>
				<Menu.Item key="2">nav 2</Menu.Item>
				<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>
			</Header> */}
					<Layout>
						<Sider width={200} className="site-layout-background">
							<Menu
								mode="inline"
								// defaultSelectedKeys={['1']}
								// defaultOpenKeys={['sub1']}
								style={{ height: '100%', borderRight: 0 }}
							>
								<Menu.Item key="menu1" icon={<HomeOutlined />}>
									<Link key="100" to="/">
										Home
									</Link>
								</Menu.Item>

								<SubMenu key="sub1" icon={<UserOutlined />} title="Usuários">
									<Menu.Item key="1">
										<Link to="/usuários">Users</Link>
									</Menu.Item>
									<Menu.Item key="2">option2</Menu.Item>
									<Menu.Item key="3">option3</Menu.Item>
									<Menu.Item key="4">option4</Menu.Item>
								</SubMenu>
								<SubMenu
									key="sub2"
									icon={<AreaChartOutlined />}
									title="Gráficos"
								>
									<Menu.Item key="5">
										<Link to="/gráficos/pizza">Pizza</Link>
									</Menu.Item>
									<Menu.Item key="6">
										<Link to="/gráficos/bolhas">Bolhas</Link>
									</Menu.Item>
									<Menu.Item key="7">
										<Link to="/gráficos/espalhamento">Espalhamento</Link>
									</Menu.Item>
								</SubMenu>
								<SubMenu key="sub3" icon={<RobotOutlined />} title="Assets">
									<Menu.Item key="9">
										<Link to="/assets">Assets</Link>
									</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Layout style={{ padding: '0 24px 24px' }}>
							{/* <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb> */}
							<Content
								className="site-layout-background"
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
								}}
							>
								<Switch>
									<Route exact path={'/'} component={Home} />
									<Route exact path={'/usuários'} component={Users} />
									<Route exact path={'/assets'} component={Assets} />
									<Route exact path={'/gráficos/pizza'} component={Pie3d} />
									<Route exact path={'/gráficos/bolhas'} component={Bubble} />
									<Route
										exact
										path={'/gráficos/espalhamento'}
										component={Scatter}
									/>
								</Switch>
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</Router>
		</AppProvider>
	);
};

export default App;
