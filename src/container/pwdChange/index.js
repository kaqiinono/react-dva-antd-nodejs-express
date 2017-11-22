import React, { Component } from 'react'
import {Form,Input,Button,message} from 'antd'
import style from './index.less'
const FormItem = Form.Item
message.config({
    top: 100,
    left:200
  });
class pwdChange extends Component {
    constructor(prop){
        super(prop)
        this.state={
            confirm:false,
            comfirmstates:'',
            comfirmmessage:'',
            checkP:false,
            checkPstates:'',
            checkPmessage:'',
            isloading:false,
            isvisibal:false,
            tipmes:''
        }
    }
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
        const value = form.getFieldValue('newpwd')
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
    handleChangePwd=()=>{
        this.setState({
            isloading:true
        })
        const form =this.props.form;
        const {confirm,checkP} = this.state
        const pwd = form.getFieldValue('oldpwd')
        const newpwd = form.getFieldValue('newpwd')
        const success = () => {
            message.success('密码修改成功');
          };
          const error = () => {
            message.error('原密码输入错误');
          };
        if(confirm&&checkP){
            fetch('/api/user/pwdchange',{
                method: 'POST',
                body: JSON.stringify({
                  pwd:pwd,
                  newpwd:newpwd
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include'
              })
              .then((res)=>res.json())
              .then((res)=>{
                  if(res.code == 100){
                      //修改成功
                      this.setState({
                          isloading:false
                      })
                      success()
                  }
                  if(res.code == 200){
                      //原密码错误
                      this.setState({
                          isloading:false
                      })
                      error()
                  }
              })
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const  formLayout  = 'horizontal';
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            colon:false
        } : null;
        const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
            } : null;
        return(
            <div className={style.pwdbox}>
                <div>
                    <Form layout={formLayout} className={style.pwdForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('oldpwd')(<Input placeholder='请输入原密码' type='password' className={style.pbBoxOldpwd}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} validateStatus={this.state.checkPstates}  help={this.state.checkPmessage}>
                            {getFieldDecorator('newpwd')(<Input placeholder='请输入不少于六位的新密码' type='password' onBlur={this.CheackP} className={style.pbBoxOldpwd}/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} validateStatus={this.state.comfirmstates}  help={this.state.comfirmmessage} >
                            {getFieldDecorator('confirmpwd')(<Input placeholder='请再次输入新密码' type='password' onChange={this.ConfirmP} className={style.pbBoxOldpwd}  />)}
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <div className={style.checkbox}>
                        <Button type='' onClick={this.handleChangePwd} loading={this.state.loading}>提交修改</Button>
                    </div>
                </div>
            </div>
        )
    }
}
pwdChange = Form.create({})(pwdChange);
export default pwdChange