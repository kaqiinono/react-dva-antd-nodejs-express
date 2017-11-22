import React, { Component } from 'react';
// import moment from 'moment';
import { Calendar } from 'antd'
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');


class Mood extends Component {
    constructor(props) {
        super(props);
        this.state={
        }  
    }
    componentDidMount(){
        var canvas=document.getElementById('tree');
        var ctx=canvas.getContext('2d');
    }
    render(){
        return(
            <div>
                <canvas id='tree' style={{}}></canvas>
            </div>
        )
    }
}

export default Mood; 