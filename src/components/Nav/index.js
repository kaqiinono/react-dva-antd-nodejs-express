import { Menu, Icon } from 'antd';
import React, { Component } from 'react'
import style from './index.less'
import {  BrowserRouter as Router,
    Route,
    Link } from 'react-router-dom';
import { connect } from 'dva';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state={
            change:false
        }
    }
    renderMenu=()=>{
        const {menu} = this.props.menuoff
        if(!menu){
            return(
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '90%' ,textAlign:'center'}}
            >     
                    <Menu.Item><Link to='/personal'>个人发言</Link></Menu.Item>
                    <Menu.Item><Link to='/find'>获取发言</Link></Menu.Item>
                    <Menu.Item><Link to='/display'>发言记录</Link></Menu.Item>
                    <Menu.Item><Link to='/mood'>MoodTree</Link></Menu.Item>               
                </Menu>
            )
        }else{
            return(
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '90%' ,textAlign:'center'}}
            >     
                    <Menu.Item><Link to='/userset'>个人信息修改</Link></Menu.Item>
                    <Menu.Item><Link to='/pwdchange'>密码修改</Link></Menu.Item>               
                </Menu>
            )
        }
    }
    render(){
        return(
            <div className={style.sideBar}>
                {this.renderMenu()}
            </div>
        )
    }
}
export default connect(({menuoff})=>({menuoff}))(Nav);