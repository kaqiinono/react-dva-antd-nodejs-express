import React, { Component } from 'react'
import {Button,Input,Form} from 'antd'
import style from './index.less'
import { HashRouter as Router  } from 'react-router-dom'
import {connect} from 'dva'
import Protypes from 'prop-types'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form:{
    getFieldDecorator,
  }
}) => {

  const {loginLoading} = loading


 function onhandleConfirm(){
    console.log(this.state.isloading)
    const form =this.props.form;
    const user = form.getFieldValue('user')
    const ps = form.getFieldValue('password')
    dispatch({type:'loading/login'})
    fetch('http://localhost:3000/user')
    .then(function(res){
        return res.json()

      })
      .then(function(res){
            var p =new Array()
            var u = new Array()
            for(var key in res){
                p.push(res[key].user)
                u.push(res[key].password)  
            }
            Array.prototype.in_array = function (element) {  
                for (var i = 0; i < this.length; i++) {  
                    if (this[i] == element) { 
                        return true; 
                    }  
                } return false;  
            }
            setTimeout(function(){
                if(p.in_array(user)&&u.in_array(ps)){
                    sessionStorage.setItem('name',user)
                    sessionStorage.setItem('num','0')
                    console.log('yes')
                    location.replace('/')
                    }
                else {
                    alert('登录失败')
                }
            },2000) 
            
      })
.catch(function(err) { 
    console.log('Fetch Error : %S', err); 
})
console.log('wa')

}

  return (
    <div className='login'>
                <div className={style.loginBox}>
                    <div className={style.lB_contain}>
                        <Form layout={formLayout}>
                            <FormItem label='用户名' {...formItemLayout}>
                                {getFieldDecorator('user')(<Input placeholder='请输入用户名' />)}
                            </FormItem>
                            <FormItem label='密码' {...formItemLayout}>
                                {getFieldDecorator('password')(<Input placeholder='请输入密码' type='password' />)}
                            </FormItem>
                        </Form>
                    </div>
                    <div className={style.lB_bottom}>
                        <Button type='primary'  onClick={this.onhandleConfirm} className={style.lB_buton}>确定</Button>
                    </div>
                </div>
            </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
