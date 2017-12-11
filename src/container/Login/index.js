import React, { Component } from 'react'
import {Button,Input,Form,Icon} from 'antd'
import style from './index.less'
import {  BrowserRouter as Router,
    Route,
    Link } from 'react-router-dom';

const FormItem = Form.Item
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            formLayout:'horizontal',
            missmes:'',
            isloading:false
        }
    }
    onhandleConfirm=()=>{
        this.setState({
            isloading:true
        })
        const form =this.props.form;
        const name = form.getFieldValue('user')
        const password = form.getFieldValue('password')
        fetch('/api/user/login',{
            method:"POST",
            body: JSON.stringify({
                name: name,
                pwd: password,
              }),
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code==300){
                this.setState({
                    isloading:false
                })
                window.location.href='http://localhost:8000/layout'
            }
            if(res.code==100||res.code==200){
                this.setState({
                    missmes:'账号或用户名错误',
                    isloading:false
                })
            }
        })
    .catch(function(err) { 
        console.log('Fetch Error : %S', err); 
    })
    
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            colon:false
        } : null;
        const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
            } : null;
        return(
            <div className='login'>
                <div className={style.loginBox}>
                    <div className={style.lB_contain}>
                        <Form layout='horizontal'>
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator('user')(<Input 
                                                                placeholder='请输入用户名'
                                                                className={style.ghostinput}
                                                                addonBefore={<Icon type='user'/>}
                                                            />)}
                            </FormItem>
                            <FormItem  {...formItemLayout} help={this.state.missmes}>
                                {getFieldDecorator('password')(<Input 
                                                                placeholder='请输入密码' 
                                                                type='password' 
                                                                addonBefore={<Icon type='lock'/>}
                                                                className={style.ghostinput}/>)}
                            </FormItem>
                        </Form>
                    </div>
                    
                    <div className={style.tooltipbox}>
                        <span style={{color:'#fff'}}>忘记密码?</span>
                    </div>
                    <div className={style.lB_bottom}>
                        <Button  type='' ghost  onClick={this.onhandleConfirm} className={style.lB_buton} loading={this.state.isloading}>确定</Button>
                    </div>
                </div>
            </div>
        )
    }
}
Login = Form.create({})(Login);
export default Login