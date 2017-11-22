import React, { Component } from 'react'
import { Collapse,Modal,Icon,Spin } from 'antd'
import style from './index.less'
import LzEditor from 'react-lz-editor'
class mesDisplay extends Component {
    constructor(prop){
        super(prop)
        this.state={
            JanArray:[],
            FebArray:[],
            MarArray:[],
            AprArray:[],
            MayArray:[],
            JunArray:[],
            JulyArray:[],
            AugArray:[],
            SepArray:[],
            OctArray:[],
            NovArray:[],
            DecArray:[],
            //
            favorite:'',
            cheaktime:'',
            //
            havaMes:false,
            isloading:true,
            //
            visibleModal:false,
            displayMes:'',
            displayArray:[],
            displayMonth:'',
            displayDay:'',
            displayDate:'',
            displayMood:'',
            //月数据
            Jan:'none',
            Feb:'none',
            Mar:'none',
            Apr:'none',
            May:'none',
            Jun:'none',
            July:'none',
            Aug:'none',
            Sep:'none',
            Oct:'none',
            Nov:'none',
            Dec:'none',
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
    componentWillMount=()=>{
        this.handleReciveMes();
    }
    showModal=()=>{
        this.setState({
            visibleModal:false
        })
    }
    handleReciveMes=()=>{
        fetch('/api/user/getmes',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.Oct[0])
            console.log(res.Jan[0].length)
            if(res.Jan[0].length >= 1){
                var len = res.Jan[0].length
                var Janmes = new Array
                for(let i =0;i<len;i++){
                    Janmes.push(res.Jan[0][i])
                }                
                this.setState({
                    Jan:'',
                    JanArray:Janmes,
                    havaMes:true
                })
            }
            if(res.Feb[0].length >= 1){
                var len = res.Feb[0].length
                var Febmes = new Array
                for(let i =0;i<len;i++){
                    Febmes.push(res.Feb[0][i])
                }                
                this.setState({
                    Feb:'',
                    FebArray:Febmes,
                    havaMes:true
                })
            }
            if(res.Mar[0].length >= 1){
                var len = res.Mar[0].length
                var Marmes = new Array
                for(let i =0;i<len;i++){
                    Marmes.push(res.Mar[0][i])
                }                
                this.setState({
                    Mar:'',
                    MarArray:Octmes,
                    havaMes:true
                })
            }
            if(res.Apr[0].length >= 1){
                var len = res.Apr[0].length
                var Aprmes = new Array
                for(let i =0;i<len;i++){
                    Aprmes.push(res.Apr[0][i])
                }                
                this.setState({
                    Apr:'',
                    AprArray:Aprmes,
                    havaMes:true
                })
            }
            if(res.May[0].length >= 1){
                var len = res.May[0].length
                var Maymes = new Array
                for(let i =0;i<len;i++){
                    Maymes.push(res.May[0][i])
                }                
                this.setState({
                    May:'',
                    MayArray:Maymes,
                    havaMes:true
                })
            }
            if(res.Jun[0].length >= 1){
                var len = res.Jun[0].length
                var Junmes = new Array
                for(let i =0;i<len;i++){
                    Junmes.push(res.Jun[0][i])
                }                
                this.setState({
                    Jun:'',
                    JunArray:Junmes,
                    havaMes:true
                })
            }
            if(res.July[0].length >= 1){
                var len = res.July[0].length
                var Julymes = new Array
                for(let i =0;i<len;i++){
                    Julymes.push(res.July[0][i])
                }                
                this.setState({
                    July:'',
                    JulyArray:Julymes,
                    havaMes:true
                })
            }
            if(res.Aug[0].length >= 1){
                var len = res.Aug[0].length
                var Augmes = new Array
                for(let i =0;i<len;i++){
                    Augmes.push(res.Aug[0][i])
                }                
                this.setState({
                    Aug:'',
                    AuArray:Augmes,
                    havaMes:true
                })
            }
            if(res.Sep[0].length >= 1){
                var len = res.Sep[0].length
                var Sepmes = new Array
                for(let i =0;i<len;i++){
                    Sepmes.push(res.Sep[0][i])
                }                
                this.setState({
                    Sep:'',
                    SepArray:Sepmes,
                    havaMes:true
                })
            }
            if(res.Oct[0].length >= 1){
                var len = res.Oct[0].length
                var Octmes = new Array
                for(let i =0;i<len;i++){
                    Octmes.push(res.Oct[0][i])
                }                
                this.setState({
                    Oct:'',
                    OctArray:Octmes,
                    havaMes:true
                })
                console.log(this.state.OctArray)
            }
            if(res.Nov[0].length >= 1){
                var len = res.Nov[0].length
                var Novmes = new Array
                for(let i =0;i<len;i++){
                    Novmes.push(res.Nov[0][i])
                }                
                this.setState({
                    Nov:'',
                    NovArray:Novmes,
                    havaMes:true
                })
            }
            if(res.Dec[0].length >= 1){
                var len = res.Dec[0].length
                var Octmes = new Array
                for(let i =0;i<len;i++){
                    Decmes.push(res.Dec[0][i])
                }                
                this.setState({
                    Dec:'',
                    DecArray:Decmes,
                    havaMes:true
                })
                
            }
        })
    }
    handleCheckDetais=(e)=>{
        fetch('/api/mes/dispay/',{
            method:'post',
            body:JSON.stringify({
            //    name:name,
               tittle:e.target.textContent,
               time:e.target.id
            }),
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.mood==1){
                this.setState({
                    displayMood:"smile-o"
                })
            }
            if(res.mood==2){
                this.setState({
                    displayMood:"meh-o"
                })
            }
            if(res.mood==3){
                this.setState({
                    displayMood:"frown-o"
                })
            }
            const mesArray = new Array
            const len = res.replay.length
            for(let i=0;i<len;i++){
                mesArray.push(res.replay[i])
            }
            const time = new Date(res.time)
            const nowTime = time.getMonth()+1
            const nowDate = time.getDate()
            const nowDay = time.getDay()
            this.setState({
                // cheakmes:e.target.textContent,
                cheaktime:res.time,
                displayMonth:nowTime,
                displayDate:nowDate,
                displayDay:nowDay,
                displayMes:res.mes,
                displayArray:mesArray,
                visibleModal:true
            })
        })
    }
    handleFavorite=(e)=>{
        console.log(e.target.className)
        fetch('/api/user/point',{
            method:'post',
            body:JSON.stringify({
            //    name:name,
               replaymes:e.target.getAttribute('data'),
               replaytime:e.target.id,
               mes:this.state.displayMes,
               time:this.state.cheaktime
            }),
            headers: {
                'Content-Type': 'application/json'
              },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.code==200){
                this.setState({
                    favorite:'heartaaa'
                })
            }
            if(res.code==100){
                alert('已经点过赞了')
            }
        })
    }
    render(){
        const {Panel} = Collapse
        const {havaMes} = this.state
        if(!havaMes){
            return(
                
                <div className={style.nomes}>
                    <span>找不到任何记录哟</span>
                </div>

            )
        }else{
            return(
                <div className={style.mesWrap}>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Jan}}>
                        <Panel header="一月" key='1'>
                            {this.state.JanArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Feb}}>
                        <Panel header="二月" key='1'>
                            {this.state.FebArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Mar}}>
                        <Panel header="三月" key='1'>
                            {this.state.MarArray.map(function(item,index){
                                return(               
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Apr}}>
                        <Panel header="四月" key='1'>
                            {this.state.AprArray.map(function(item,index){
                                return(                
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                    </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.May}}>
                        <Panel header="五月" key='1'>
                            {this.state.MayArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Jun}}>
                        <Panel header="六月" key='1'>
                            {this.state.JunArray.map((item,index)=>{
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                            )
                        })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.July}}>
                        <Panel header="七月" key='1'>
                            {this.state.JulyArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Aug}}>
                        <Panel header="八月" key='1'>
                            {this.state.AugArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Sep}}>
                        <Panel header="九月" key='1'>
                            {this.state.SepArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Oct}}>
                        <Panel header="十月" key='1'>
                            {this.state.OctArray.map((item,index)=>{
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Nov}}>
                        <Panel header="十一月" key='1'>
                            {this.state.NovArray.map((item,index)=>{
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                
                                )
                            })}

                        </Panel>
                    </Collapse>
                    <Collapse bordered={false} defaultActiveKey={['1']} style={{display:this.state.Dec}}>
                        <Panel header="十二月" key='1'>
                            {this.state.DecArray.map(function(item,index){
                                return(
                                    <p key={index} onClick={this.handleCheckDetais} id={item.time}>{item.tittle}</p>
                                )
                            })}
                        </Panel>
                    </Collapse>
                    <Modal
                        title={[
                            <div>
                                <span>{this.state.displayMonth}</span><span>月</span><span>{this.state.displayDate}</span><span>日</span><span>星期</span><span>{this.state.displayDay}</span><Icon type={this.state.displayMood}/>
                            </div>
                        ]}
                        wrapClassName='displayModal'
                        visible={this.state.visibleModal}
                        onCancel={this.showModal}
                        footer={[
                                <div className={style.diplaymes}>
                                    {this.state.displayArray.map((item,index)=>{
                                        var time = new Date(item.time)
                                        var nowmonth = time.getMonth()+1;
                                        var date = time.getDate();
                                        return(
                                            <div className={style.repbox}>
                                                <div className={style.repboxbotom}>
                                                    <p><span>{nowmonth}月{date}日</span><span><Icon type={item.replaythx} id={item.time} data={item.replaymes} onClick={this.handleFavorite} className={this.state.favorite}/></span></p>
                                                </div>
                                                <div className={style.repboxtop}>
                                                    <p key={index} id={item.time} >{item.replaymes}</p>
                                                </div>
                                            </div>
                                            )
                                        }
                                    )}
                                </div>
                        ]}
                        >
                        <LzEditor {...this.state.settings} importContent={this.state.displayMes} contenteditable='false'></LzEditor>
                    </Modal>
            </div>
        )
    }

}
}
export default mesDisplay 