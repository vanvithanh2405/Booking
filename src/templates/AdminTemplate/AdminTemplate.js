import React, { useState, Fragment, useEffect } from 'react';
import { Route, Redirect, NavLink, Link } from 'react-router-dom';
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import _ from 'lodash';
import { useSelector } from "react-redux";
import { history } from "../../App";
import logoW from './../../imgRap/LOGO/LogoR22.png'
import { Layout, Menu, Breadcrumb, Avatar, Select } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    InsertRowBelowOutlined
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const { Option } = Select;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {//path, exact, component

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    const getPath = props.location.pathname;
    const path = getPath.split("/");
    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này!!!');
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này!!!');
        return <Redirect to='/' />
    }
    const username = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan : '';
    // const operations = <Fragment>
    //     {!_.isEmpty(userLogin) ? <Fragment>
    //         <button onClick={() => {
    //             history.push(`/profile`);
    //         }}><UserProfile className="ml-5 rounded-full bg-red-200 text-xl">{userLogin.taiKhoan.substr(0, 1)}</UserProfile></button>
    //         <button onClick={() => {
    //             localStorage.removeItem(USER_LOGIN);
    //             localStorage.removeItem(TOKEN);
    //             history.push('/');
    //             window.location.reload();
    //         }} className="text-blue-800 ml-10">Đăng xuất</button>
    //     </Fragment> : ''}
    // </Fragment>;

    const handleChange = async (value) => {
        if (value == 'logout') {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/');
            window.location.reload();

        }
    }
    const ListRouter = (props) => {
        switch (props) {
            case 'admin':
                return `/admin`;
            case 'user':
                return `/admin/user`;
            case 'films':
                return `/admin/films`;
            case 'booked':
                return `/admin/user`;
            case 'showtime':
                return `/admin/films`;
            case 'showtime/':
                return `/admin/films`;
            default:
                return 'other'
        }
    }
    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <NavLink className="navbar-brand" to="/">
                        <div className="p-5">
                            <Link to="/"><img src={logoW} alt="logo" /></Link>
                        </div>
                    </NavLink>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <NavLink to="/admin">Dashboard</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                <NavLink to="/admin/user">Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to="/admin/user/adduser">Add Users</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<DesktopOutlined />} title="Films">
                            <Menu.Item key="4" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addfilm">Add Phim</NavLink>
                            </Menu.Item>
                            <Menu.Item key="7" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/editfilm/:id">Edit Phim</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="" style={{ padding: 0, backgroundColor: '#fff', alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="text-right pr-10 pt-1" style={{ display: 'flex', alignItems: 'center', height: 'auto' }}>
                            <Avatar size="large" style={{ color: '#FFFFFF', backgroundColor: '#40ADFF', marginRight: "10px" }} icon={<UserOutlined onClick={() => {
                                history.push(`/profile`);
                            }} />} />
                            <Select value={username} style={{ width: 120 }} onChange={handleChange}>
                                <Option value="logout" >Logout</Option>
                            </Select>
                        </div>

                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {path.map((v, index) => {
                                console.log('page', v)
                                return <Breadcrumb.Item><NavLink key={index} to={ListRouter(v) === 'other' ? `/${v}` : ListRouter(v)}>{v}</NavLink></Breadcrumb.Item>
                            })
                            }
                        </Breadcrumb>
                        <div className="bg-white h-full" style={{ padding: 24, minHeight: 360 }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Rạp 2021 cyberSoft@gmail.com</Footer>
                </Layout>
            </Layout>
        </Fragment>

    }} />
}
