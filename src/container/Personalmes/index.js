import React, { Component } from 'react';
import {Input,Form,Button,Modal,Icon,message,notification} from 'antd'
import style from './index.less'
import LzEditor from 'react-lz-editor'
const FormItem = Form.Item
const { TextArea } = Input;
class Personal extends Component {
    constructor(props) {
        super(props);
        this.state={
            formLayout:'horizontal',
            visible:false,
            isHappy:false,
            isSad:false,
            bothNot:false,
            happycolor:'',
            mehcolor:'',
            sadcolor:'',
            istitleok:false,
            titletip:'',
            limit:false,
            settings:{
                image:false,
                video:false,
                audio:false,
                fullScreen:true,
                autoSave:false,
                removeStyle:false,
                color:true
            },
            markdownContent:''
        }
    }
    componentWillMount=()=>{
        this.handlecheckthislimit();
    }
    handlecheckthislimit=()=>{
        fetch('api/user/cheack',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            if(res.code==100){
                this.setState({
                    limit:true
                })
            }
        })
    }
    handleSubmit=()=>{
        if(this.state.istitleok){
            const form =this.props.form;
            const tittle = form.getFieldValue('tittle')
            var msg = this.state.markdownContent 
            const success = () =>{
                notification.open({
                message: '消息发送成功！',
                description: '',
                icon: <Icon type="check" style={{ color: '#108ee9' }} />,
                });
            }
            var mood 
            if(this.state.isHappy){
                mood = 1
            }
            if(this.state.bothNot){
                mood=2
            }
            if(this.state.isSad){
                mood=3
            }
            fetch('/api/mes/post',{
                method:'post',
                body:JSON.stringify({
                    tittle:tittle,
                    message:msg,
                    mood:mood
                }),
                headers: {
                    'Content-Type': 'application/json'
                  },
                credentials: 'include'
            })
            .then((res)=>res.json())
            .then((res)=>{
                if(res.code == 200){
                    success()
                }
                if(res.code == 400){
                    alert('上限')
                }
                
            })
            .catch((err)=>console.log(err))
            this.handlecheckthislimit();
        }else{
            this.setState({
                titletip:'请填写标题'
            })
        }
    }
    handleOpenBox=()=>{
        if(!this.state.limit){
            this.setState({
                visible:!this.state.visible
            })
        }else{
            alert('已经发送过一次啦')
        }
    }
    handleCloseBox=()=>{
        this.setState({
            visible:!this.state.visible
        })
    }
    handlecheacktittle=(e)=>{
        const tittle = e.target.value.length
        console.log(tittle)
        if(tittle == 0 ){
            this.setState({
                titletip:'请输入标题'
            })
        }
        if(tittle !=0 ){
            this.setState({
                titletip:'',
                istitleok:true
            })
        }
    }
    handlechooseHappy=()=>{
        this.setState({
            isHappy:true,
            isSad:false,
            bothNot:false,
            happycolor:'red',
            mehcolor:'',
            sadcolor:''
        })
    }
    handlechooseMeh=()=>{
        this.setState({
            isHappy:false,
            isSad:false,
            bothNot:true,
            happycolor:'',
            mehcolor:'green',
            sadcolor:''
        })
    }
    receiveMarkdown=(content)=>{
        this.setState({
            markdownContent:content
        })
    }
    handlechooseSad=()=>{
        this.setState({
            isHappy:false,
            isSad:true,
            bothNot:false,
            happycolor:'',
            mehcolor:'',
            sadcolor:'#007FFF'
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return(
            <div className={style.personal}>
                <div className={style.perHead}>
                    <span>一起来释放你的小情绪吧</span>
                </div>
                <div className={style.perbottom}>
                    <Button onClick={this.handleOpenBox}>分担忧愁，分享快乐！</Button>
                    <Modal
                    title={[
                        <div className={style.mood}>
                            <Icon type="smile-o" style={{color:this.state.happycolor,cursor:'pointer'}} onClick={this.handlechooseHappy}/>
                            <Icon type="meh-o" style={{margin:'0 10px',color:this.state.mehcolor,cursor:'pointer'}} onClick={this.handlechooseMeh}/>
                            <Icon type="frown-o" style={{color:this.state.sadcolor,cursor:'pointer'}} onClick={this.handlechooseSad}/>
                        </div>
                    ]}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCloseBox}
                    >
                        <Form style={{marginBottom:'20px'}}>
                        <FormItem help={this.state.titletip}>
                        {getFieldDecorator('tittle')(<Input key="_input" placeholder='填写简短标题' onBlur={this.handlecheacktittle}/>)}
                        </FormItem>
                        </Form>
                        <div>
                            <LzEditor {...this.state.settings} importContent={this.state.markdownContent} cbReceiver={this.receiveMarkdown}></LzEditor>
                        </div>
                 
                    </Modal>
                </div>
            </div>
        )
    }
}
Personal = Form.create({})(Personal);
export default Personal