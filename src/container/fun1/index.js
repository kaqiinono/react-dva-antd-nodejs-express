import React, { Component } from 'react';
import { Modal, Button,Icon,Input,notification,Form,message,Spin } from 'antd';
import style from './index.less'
import LzEditor from 'react-lz-editor'
class funcCheck extends Component {
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            message:[],
            mes:'',
            mood:'',
            sex:'',
            xz:'',
            tittle:'',
            loading:false,
            isloading:false,
            tipmes:'',
            settings:{
                active:false,
                undoRedo:false,
                removeStyle:false,
                pasteNoStyle:false,
                blockStyle:false,
                alignment:false,
                inlineStyle:false,
                color:false,
                image:false,
                video:false,
                urls:false,
                autoSave:false,
                fullScreen:false,
                audio:false,
            }
        }
    }
    getMessages=()=>{
        

        this.setState({
            isloading:true
        })
        const error = () => {
            message.error('请登陆后尝试')
        }
        const error1 = () =>{
            message.error('每天十次')
        }
        fetch('/api/mes/get',{
            method:'get',
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code==100){
                error();
                return;
            }
            else if(res.code==200){
                error1();
                return
            }
            else{
                this.setState({
                    mes:res.d1[0].mes,
                    tittle:res.d1[0].tittle,
                    xz:res.d.xz,
                    visible:true,
                    isloading:false
                })
                var wa = document.getElementsByClassName('notranslate')[0]
                wa.setAttribute('contenteditable','false')
                const {mood} = res.d1[0]
                const {sex} = res.d
                console.log(mood)
                if(mood==1){
                    this.setState({
                        mood:"smile-o"
                    })
                }
                if(mood==2){
                    this.setState({
                        mood:"meh-o"
                    })
                }
                if(mood==3){
                    this.setState({
                        mood:"frown-o"
                    })
                }
                if(sex == '男'){
                    this.setState({
                        sex:'man'
                    })
                }
                if(sex == '女'){
                    this.setState({
                        sex:'woman'
                    })
                }
            }
            console.log(res.d1[0].mes)
            console.log(res.d)
        })
        .catch((err)=>console.log(err))
    }
    handleLimit=()=>{
        const form =this.props.form;
        const replay = form.getFieldValue('replay')
        console.log(replay)
    }
    handleOk=(e)=>{
        this.setState({
            visible:false
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    openNotification = () => {
        const form =this.props.form;
        const replay = form.getFieldValue('replay')
        const mes = this.state.mes
        const success = () =>{
            notification.open({
            message: '消息发送成功！',
            description: '',
            icon: <Icon type="check" style={{ color: '#108ee9' }} />,
            });
        }
        if(replay.length<10){
            alert('啊')
            //弹窗形式提示10个字
        }else{
            this.setState({
                loading:true
            })
            fetch('/api/mes/replay',{
                method:'POST',
                body:JSON.stringify({
                    replaymes:replay,
                    mes:mes
                }),
                headers: {
                    'Content-Type': 'application/json'
                  },
                credentials: 'include'
            })
            .then((res)=>res.json())
            .then((res)=>{
                if(res.code==200){
                    success()
                    this.setState({
                        loading:false
                    })
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
      };
      
    render(){
        const { getFieldDecorator } = this.props.form
        return(
            <div className={style.Evevtbox}>
                <div className={style.Et_head}>
                        <span>看看今天有多少小天使难过了</span>
                        
                </div>
                <div className={style.Et_contain}>
                
                    <Button onClick={this.getMessages} loading={this.state.isloading}>快去找寻坠落凡间的小天使吧！</Button>
                    
                    <Modal title={[
                        <div className={style.mood}>
                            <div>
                                <span>{this.state.tittle}</span>
                            </div>
                            <div>
                                <Icon type={this.state.mood}/>
                                <Icon type={this.state.sex} />
                                <span>{this.state.xz}</span>
                            </div>
                        </div>
                    ]} 
                    visible={this.state.visible} 
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={[
                        <Form>
                            {getFieldDecorator('replay')(<Input key="_input" placeholder='想要说点什么吗' />)}
                            <Button type='' key='_submit' onClick={this.openNotification} className={style.inbutton} loading={this.state.loading}>提交</Button>
                            <Button type='' key='_cancel' onClick={this.handleCancel}>关闭</Button>
                        </Form>
                    ]}   >
                   
                    
                <LzEditor {...this.state.settings} importContent={this.state.mes} contenteditable='false'></LzEditor>
                        
                    </Modal>
                   
                </div>
            </div>
        )
    }
}
funcCheck = Form.create({})(funcCheck)
export default funcCheck