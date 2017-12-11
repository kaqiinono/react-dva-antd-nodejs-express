import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react'
import style from './index.less'
import {  BrowserRouter as Router,
  Route,
  Link } from 'react-router-dom';
import ContentPage from '../ContentPage/index'
import Personal from '../../components/personal/index'
import Nav from '../../components/Nav/index'
import find from '../fun1/index'
import personal from '../Personalmes/index'
import welcomeP from '../WelcomePage/index'
import contentP from '../ContentPage/index'
import display from '../mesdisplay/index'
import mood from '../mood/index'
import userset from '../userSet/index'
import index from '../index/index'
import pwdchange from '../pwdChange/index'
const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;
class layoutPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            formLayout:'horizontal',
            isloading:false
        }  
    }
    handleExit=()=>{
        fetch('/api/user/exit',{
            method:'get',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code==100){
                window.location.href='http://localhost:8000'
            }
        })
    }
    contextaaaa=()=>{
        fetch('/api/user/text',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.code)
        })
    }
    render(){
        return(
            <div className={style.wrap}>
                <Router>
                    <Layout style={{height:'100%',padding: '24px 0'}}>
                        <Header className={style.header}>
                        </Header>
                        <Content style={{ padding: '0 50px',minHeight: 480  }}>
                            <div className={style.leftSide}>
                                <Personal/>
                                <Nav/>
                            </div>
                            <div className={style.rightSide}>
                                <Route path='/layout' exact component={welcomeP}/>
                                <Route path='/personal' exact component={personal}/>
                                <Route path='/find' exact component={find}/>
                                <Route path='/mood' exact component={mood}/>
                                <Route path='/display' exact component={display}/>
                                <Route path='/userset' exact component={userset}/>
                                <Route path='/pwdchange' exact component={pwdchange}/>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center',padding:'0'}}>
                            <p>
                                <span>Santu @2017 Powerder By Santu</span>
                                <a className={style.about}>关于xx</a>
                                <a className={style.thanks} onClick={this.contextaaaa}>三土啊</a>
                                <a className={style.me} onClick={this.handleExit}>退出登录</a>
                            </p>
                        </Footer>
                    </Layout>
                </Router>
            </div>
        )
    }
}

export default layoutPage   