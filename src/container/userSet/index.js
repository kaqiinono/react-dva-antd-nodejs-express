import React,{Component} from 'react'
import { Upload,Icon,Radio,Select,Button } from 'antd'
import style from './index.less'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class userSet extends Component {  
    constructor(prop){
        super(prop)
        this.state={
            radiovalue:'',
            radioOk:false,
            xz:'',
            xzOk:false,
            disabled:false,
            setradiovalue:'',
            setxzvalue:'',
            isloading:'check',
            isdisabled:false

        }
    }
    componentWillMount=()=>{
        fetch('/api/user/loadDetail',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.num == 1){
                this.setState({
                    setradiovalue:res.sex,
                    setxzvalue:res.xz,
                    disabled:true,
                    isdisabled:true
                })
            }

        })
    }
    handleSelctRadio=(e)=>{
        this.setState({
            radiovalue:e.target.value,
            radioOk:true,
            setradiovalue:e.target.value
        })
    }
    handleSubmit=()=>{
        this.setState({
            isloading:'loading'
        })
        const {radioOk,xzOk} = this.state
        if(radioOk&&xzOk){
            fetch('/api/user/saveDetail',{
                    method: 'POST',
                    body: JSON.stringify({
                    sex:this.state.radiovalue,
                    xz:this.state.xz
                    }),
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                .then((res)=>res.json())
                .then((res)=>{
                    if(res.code == 100){
                        this.setState({
                            isloading:'check'
                        })
                    }
                })
        }

    }
    handleSelctXz=(value)=>{
        this.setState({
            xz:value,
            xzOk:true
        })
    }
    render(){
        const {setxzvalue} = this.state
        return(
            <div className={style.WarpBox}>
                <div className={style.contenbox}>
                    <div className={style.avatarBox}>
                        <div>
                            <Upload className={style.avataruploader}>
                                <Icon type="plus" className={style.avataruploadertrigger} />
                            </Upload>
                        </div>
                    </div>
                    <div className={style.sexyBox}>
                        <div>
                            <RadioGroup onChange={this.handleSelctRadio} value={this.state.setradiovalue} disabled={this.state.disabled}>
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className={style.xingzuo}>
                        <div>
                            <Select style={{ width: 120 }}  onChange={this.handleSelctXz} disabled={this.state.disabled} placeholder={setxzvalue}>
                                <Option value="白羊座">白羊座</Option>
                                <Option value="金牛座">金牛座</Option>
                                <Option value="双子座">双子座</Option>
                                <Option value="巨蟹座">巨蟹座</Option>
                                <Option value="狮子座">狮子座</Option>
                                <Option value="处女座">处女座</Option>
                                <Option value="天秤座">天秤座</Option>
                                <Option value="天蝎座">天蝎座</Option>
                                <Option value="射手座">射手座</Option>
                                <Option value="摩羯座">摩羯座</Option>
                                <Option value="水瓶座">水瓶座</Option>
                                <Option value="双鱼座">双鱼座</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={style.submit}>
                        <Button type='' onClick={this.handleSubmit} disabled={this.state.isdisabled}>
                            <Icon type={this.state.isloading} />        
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default userSet