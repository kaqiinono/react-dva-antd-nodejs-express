import React, { Component } from 'react'
import {Button,Input,Form,message} from 'antd'
import style from './index.less'
const FormItem = Form.Item
message.config({
    top: 200,
    duration: 4,
  })
class SingUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            formLayout:'horizontal',
            confirm:false,
            comfirmstates:'',
            comfirmmessage:'',
            checkP:false,
            checkPstates:'',
            checkPmessage:'',
            comfirmuser:'',
            confirmunseok:false,
            isOk:false
        }
    }
    componentDidMount(){  
      
    }
    //=====================
    //判断用户名和昵称是否存在
    //=====================
    CheackP=(e)=>{
        const value = e.target.value.length
        if(value<6){
            this.setState({
                checkP:false,
                checkPstates:'error',
                checkPmessage:'密码不能少于六位噢'
            })
        }else{
            this.setState({
                checkP:true,
                checkPstates:'',
                checkPmessage:''
            })
        }
    }
    ConfirmP=(e)=>{
        const form = this.props.form;
        const confirmvalue= e.target.value
        const value = form.getFieldValue('password')
        if(confirmvalue == value){
            this.setState({
                confirm:true,
                comfirmmessage:'',
                comfirmstates:''
            })
        }else{
            this.setState({
                comfirmmessage:'请再次确认密码',
                comfirmstates:'error',
                confirm:false
            })
        }
    }
    hendleConfirmUser=()=>{
        const name = this.props.form.getFieldValue('name')
        fetch('/api/user/nameconfirm', {
            method: 'POST',
            body:JSON.stringify({
                name:name
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          .then((res)=>res.json())
          .then((res)=>{
              if(res.code==100){
                  this.setState({
                    comfirmuser:'用户名已存在',
                    confirmunseok:false
                  })
              }
              if(res.code==200){
                  this.setState({
                      confirmunseok:true,
                      comfirmuser:''
                  })
              }
          })
    }
    onhandleConfirm=()=>{
        const form =this.props.form;
        const nickname = form.getFieldValue('nickname')
        const name = form.getFieldValue('name')
        const password = form.getFieldValue('password')
        const confirmP = form.getFieldValue('confirm')
        const {checkP,confirmunseok,confirm} = this.state
        const success = () => {
            message.success('啦啦啦注册成功');
          };
        if(password!==confirmP){
            alert('falied')
            return false;
        }
       if(confirm&&checkP&&confirmunseok){
        fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
              name: name,
              pwd: password,
              nickname:nickname
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }).then(function(res){
              return res.json()
          }).then(function(res){
              if(res.code == 200){
                success();

              }
              if(res.code == 1){
                  alert('已经存在用户名')
              }
              if(res.code == 2){
                  alert('昵称已存在')
              }
          })
            .catch(function(err){
              return console.log(err)
            })
       }
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
            <div className='sign'>
                <div className={style.signBox}>
                    <div className={style.sB_contain}>
                        <Form layout={formLayout}>
                            <FormItem  {...formItemLayout} help={this.state.comfirmuser}>
                                {getFieldDecorator('name')(<Input placeholder='请输入用户名' onBlur={this.hendleConfirmUser} className='ghostinput'/>)}
                            </FormItem>
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator('nickname')(<Input placeholder='请输入用户昵称' className='ghostinput'/>)}
                            </FormItem>
                            <FormItem {...formItemLayout} validateStatus={this.state.checkPstates}  help={this.state.checkPmessage}>
                                {getFieldDecorator('password')(<Input placeholder='请输入不少于六位的密码' type='password' onBlur={this.CheackP} className='ghostinput'/>)}
                            </FormItem>
                            <FormItem {...formItemLayout} validateStatus={this.state.comfirmstates}  help={this.state.comfirmmessage} >
                                {getFieldDecorator('confirm')(<Input placeholder='请再次输入密码' type='password' onChange={this.ConfirmP} className='ghostinput' />)}
                            </FormItem>
                        </Form>
                    </div>
                    <div className={style.sB_bottom}>
                        <Button type='' onClick={this.onhandleConfirm} className={style.sB_buton}>确定</Button>
                    </div>
                </div>
            </div>
        )
    }
}
SingUp = Form.create({})(SingUp);
export default SingUp;