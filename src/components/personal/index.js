import React, { Component,PropTypes  } from 'react'
import { Avatar,Icon,Badge,Tooltip } from 'antd'
import style from './index.less'
import {  BrowserRouter as Router,
    Route,
    Link } from 'react-router-dom';
import { connect } from 'dva';


class Personal extends Component{
    constructor(prop){
        super(prop)
        this.state={
             name:'',
             point:'',
             pnum:'',
             visibletool:false,
        }
    }
    componentWillMount=()=>{
        this.handleGetPersonal();
        fetch('/api/user/cheackPoint',{
            method:'get',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code == 200){
                this.setState({
                    pnum:res.num2
                })
            }
        })
    }
    handleGetPersonal=()=>{
        fetch('/api/user/getUserDetails',{
            method:'get',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code==100){
                alert('未登录')
                return;
            }
            else{
                this.setState({
                    name:res.name,
                    point:res.point
                })
            }
        })
        .catch((err)=>console.log(err))
    }
    handleCheackPoint=()=>{
        console.log('点击')
        fetch('/api/user/cheackPoint',{
            method:'get',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code == 200){
                this.setState({
                    pnum:res.num2
                })
            }
        })
    }
    handleCheackMessage=(visible)=>{  
        fetch('/api/user/cheackmessage',{
            method:'get',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code == 100){
                if(!visible){
                    this.setState({
                        pnum:0
                    })
                 }
            }
        })
    }
    handlemenuOff=()=>{
        const { dispatch} = this.props;
        dispatch({
            type:'menuoff/menu'
        })
    }
    render(){
        return(
            <div className={style.Personalbox}>
                <div className={style.refresh}>
                    <Tooltip trigger='click' title={[
                            <span>
                            <span>一共有</span><span>{this.state.pnum}</span><span>个陌生人表示感谢</span>
                            </span>
                        ]}
                        onVisibleChange={this.handleCheackMessage}
                        >
                   
                        <Badge count={this.state.pnum}></Badge>
                </Tooltip>
                    
                        <Icon type="reload" onClick={this.handleCheackPoint} style={{cursor:'pointer'}} />
                    
                </div>
                <div className={style.top}>
                    <div className={style.pngBox}>
                        <Link to='/display'>
                       
                        
                       
                            <Avatar style={{height:'60px',width:'60px',borderRadius:'50%',color:'orange',fontSize:'16px'}}>S</Avatar>
                        
                        
                        </Link>
                    </div>
                    <div className={style.useInfo}>
                        <span>昵称</span><span className={style.usernick}>{this.state.name}</span>
                        <br/>
                        <span>积分</span><span className={style.userpoint}>{this.state.point}</span>
                    </div>
                </div>
                <div style={{clear:'both'}}></div>
                <div className={style.bottom}><Icon type="tool" style={{fontSize:'16px',color:'#444',cursor:'point'}} onClick={this.handlemenuOff}/></div>
            </div>
        )
    }
}

export default connect(({menuoff})=>({menuoff}))(Personal)