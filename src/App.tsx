import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import {
	UserOutlined,
	RobotOutlined,
	AreaChartOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Users, Pie3d, Bubble, Scatter, Assets, Line } from './screens';
import AppProvider from './context/AppProvider';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const App: FC = () => {
	return (
		<AppProvider>
			<Router>
				<Layout>
					<Layout>
						<Sider width={200} className="site-layout-background">
							<Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
								<Menu.Item key="9" icon={<RobotOutlined />}>
									<Link to="/assets">Assets</Link>
								</Menu.Item>

								<Menu.Item key="1" icon={<UserOutlined />}>
									<Link to="/usuários">Users</Link>
								</Menu.Item>

								<SubMenu
									key="sub2"
									icon={<AreaChartOutlined />}
									title="Gráficos"
								>
									{/* TO DO */}
									{/* <Menu.Item key="5">
										<Link to="/gráficos/pizza">Pizza</Link>
									</Menu.Item> */}
									<Menu.Item key="6">
										<Link to="/gráficos/bolhas">Bolhas</Link>
									</Menu.Item>
									<Menu.Item key="7">
										<Link to="/gráficos/espalhamento">Espalhamento</Link>
									</Menu.Item>
									{/* TO DO */}
									{/* <Menu.Item key="8">
										<Link to="/gráficos/linha">Linha</Link>
									</Menu.Item> */}
								</SubMenu>
							</Menu>
						</Sider>
						<Layout style={{ padding: '0 24px 24px' }}>
							<Content
								className="site-layout-background"
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
								}}
							>
								<Switch>
									<Route exact path={'/'} component={Assets} />
									<Route exact path={'/usuários'} component={Users} />
									<Route exact path={'/assets'} component={Assets} />
									<Route exact path={'/gráficos/pizza'} component={Pie3d} />
									<Route exact path={'/gráficos/bolhas'} component={Bubble} />
									<Route exact path={'/gráficos/linha'} component={Line} />
									<Route
										exact
										path={'/gráficos/espalhamento'}
										component={Scatter}
									/>
									<Route
										path={'/'}
										component={() => <div>Erro 404: Página não encontrada</div>}
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
