import React,{Component} from 'react'
import {Icon} from 'antd'
import style from './index.less'
import LzEditor from 'react-lz-editor'
class welcomeP extends Component {
    constructor(props) {
        super(props);
        this.state={
            formLayout:'horizontal',
            isloading:false,
            wa:false
        }
    }
    render(){
        return(
        <div>
            {/* <LzEditor></LzEditor>  */}
        </div>
        )
    }
}
export default welcomeP