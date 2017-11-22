import React, { Component } from 'react'
import style from './index.less'
import Login from '../Login/index'
import sign from '../SignUp/index'
import { Layout, Menu, Breadcrumb, Icon,Carousel } from 'antd';
import {  BrowserRouter as Router,
  Route,
  Link } from 'react-router-dom';
class iPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            formLayout:'horizontal',
            isloading:false
        }
    }
    componentDidMount(){  
      
    }  
    render(){
        return(
        // <Layout>
        //     <div className={style.index}>
        //         <div className={style.signBox}>
        //         <Router>
        //             <div className={style.index_func}>
        //                 <div className={style.index_funcHead}>
        //                     <Link to='/login' className={style.login}>登录</Link>
        //                     <Link to='/sign' className={style.sign}>注册</Link>
        //                 </div> 
        //                     <Route path='/login' component={Login}/> 
        //                     <Route path='/sign' component={sign}/>
                        
        //             </div>
        //         </Router>
        //         </div>
        //     </div>
        // </Layout>
        <div className={style.wrap}>
            <div className={style.content}>
                <div className={style.leftside}>
                    <div className={style.banner}>
                    <Carousel vertical autoplay>
    <div><div style={{height:'99vh'}}><div className={style.page1}><span style={{fontSize:'30px'}}>我</span></div></div></div>
    <div><div style={{height:'99vh'}}><span style={{fontSize:'30px'}}>哇</span></div></div>
    <div><div style={{height:'99vh'}}><span style={{fontSize:'30px'}}>啊</span></div></div>
    <div><div style={{height:'99vh'}}><span style={{fontSize:'30px'}}>呀</span></div></div>
  </Carousel>
                    </div>
                </div>
                <Router>
                <div className={style.rightside}>
                        <div className={style.contentLeft}>                     
                            <div className={style.index}>
                            <Router>
                                         <div className={style.index_func}>
                                             <div className={style.index_funcHead}>
                                                 <Link to='/login' className={style.login}>登录</Link>
                                                 <Link to='/sign' className={style.sign}>注册</Link>
                                             </div> 
                                                 <Route path='/login' component={Login}/> 
                                                 <Route path='/sign' component={sign}/>
                                            
                                         </div>
                                     </Router>
                            </div>
                        </div>
                        {/* <div className={style.contentRight}>
                            <Route path='/login' component={Login}/> 
                            <Route path='/sign' component={sign}/>
                        </div> */}
                </div>
                </Router>
            </div>
        </div>
        )
    }
}
export default iPage;

