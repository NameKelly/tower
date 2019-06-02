import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import style from './SideMenu.css';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderMenu extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className={style.logo} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to='/monitor'>
                            <Icon type="home" />
                            <span>
                            首页
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/monitor'>
                            <Icon type="table" />
                            <span>
                            铁塔监控
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/gps'>
                            <Icon type="global" />
                            <span>GPS</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to='/error'>
                            <Icon type="info-circle" theme="outlined" />
                            <span>故障记录</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/registrationStatus'>
                            <Icon type="border" />
                            <span>
                            注册状态
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to='/review'>
                            <Icon type="user" />
                            <span>管理员审核</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to='/addSite'>
                            <Icon type="desktop" />
                            <span>站名设置</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to='/warn'>
                            <Icon type="line-chart" />
                            <span>预警模型</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>

        );
    }
}

