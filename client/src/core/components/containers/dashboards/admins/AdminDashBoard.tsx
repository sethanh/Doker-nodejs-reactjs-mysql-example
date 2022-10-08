import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React from 'react'
import HeaderComponent from './header'
import SideBarComponent from './sidebar'

const { Content, Sider } = Layout


const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key:any = String(index + 1)

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1
                return {
                    key: subKey,
                    label: `option${subKey}`,
                }
            }),
        }
    },
)

const DashBoard = (props:any) => {
    const { children, ...rest } = props
    return (
        <Layout>
            <HeaderComponent/>
            <Layout>
               <SideBarComponent/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            height: '100%',
                            backgroundColor:'white'
                        }}
                    >
                       {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default DashBoard