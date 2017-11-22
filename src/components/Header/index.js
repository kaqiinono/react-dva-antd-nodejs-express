import { Menu, Icon } from 'antd';
import React, { Component } from 'react'
import style from './index.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderNav extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    render(){
        return(
            <div className="header">
                <div className="headerContain">
                    <Menu mode='horizontal'>
                        <Menu.Item key='about' className={style.header_about}>登录</Menu.Item>
                        <Menu.Item key='text' className={style.header_login}>关于</Menu.Item>
                    </Menu>
                </div>
            </div>
        )
    }
}
export default HeaderNav;