/*
import React ,{ Component ,Fragment} from 'react';
import {Card, Row, Col, Breadcrumb, Input, Icon, AutoComplete, Table, Tabs, Tooltip, Form} from 'antd';
import store from "../store";
import ReactEcharts from 'echarts-for-react';
import request from "../../../helpers/request";
import moment from 'moment';
import {observer} from "mobx-react";
const { TabPane } = Tabs;

var startTime2=moment(new Date()).subtract(30,'days').format('YYYY-MM-DD');
var endTime2 = moment(new Date()).format('YYYY-MM-DD');
console.log('startTime,endTime',endTime2,startTime2);

@observer
class Warn extends React.Component{
    columns=[{
        title: '站名',
        dataIndex: 'site_name',
        render: (text, record,index) => {
            return <a onClick={(e) => {
                console.log('record',record);
                e.preventDefault();
                store.warn_name=text;
                //store.warn_imei=record.imei;
                this.getData(record,'1','1');
                this.getData(record,'1','30','1');
            }}>{text}</a>
        }
    }];


    render(){
        return(
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>预警模型</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col span={5} style={{ height: 630, zIndex: 5 }}>
                        <Card title='工作铁塔' style={{height:'100%'}} size='small'>
                            <AutoComplete
                                dataSource={store.search}
                                onSelect={(value)=>this.onSelect(value)}
                                onSearch={(value)=>this.select_site('site_name',value)}
                                allowClear={true}
                                optionLabelProp='value'
                                style={{ marginBottom: 5 ,width:'100%'}}
                            >
                                <Input
                                    prefix={(
                                        <Icon type="search" />
                                    )}
                                />
                            </AutoComplete>
                            <Table
                                dataSource={store.fetchList}
                                columns={this.columns}
                                size='small'
                                rowKey={(record,index) =>index}
                                style={{fontSize:'10px'}}
                            />
                        </Card>
                    </Col >
                    <Col span={19} style={{ height:600, zIndex: 5 }} >
                        <Card title='基本信息'  size='small' style={{height:'40%'}}>
                            <Tabs  defaultActiveKey="3" onChange={(activeKey)=>{this.getWarn(activeKey);this.onChange1(activeKey)}}>
                                <TabPane tab="三天" key="3">
                                        <Row>
                                            <Col span={10}><span>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span></Col>
                                            <Col span={6}><span>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x3:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y3:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x3:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y3:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span></Col>
                                        </Row>
                                </TabPane>
                                <TabPane tab="五天" key="5">
                                        <Row>
                                            <Col span={10}><span>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span></Col>
                                            <Col span={6}><span>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x5:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y5:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x5:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y5:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span></Col>
                                        </Row>
                                </TabPane>
                                <TabPane tab="七天" key="7">
                                        <Row>
                                            <Col span={10}><span>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span></Col>
                                            <Col span={6}><span>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x7:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y7:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x7:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y7:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span></Col>
                                        </Row>
                                </TabPane>
                                <TabPane tab="十天" key="10">
                                        <Row>
                                            <Col span={10}><span>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span></Col>
                                            <Col span={6}><span>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x10:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y10:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x10:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y10:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span></Col>
                                        </Row>
                                </TabPane>
                                <TabPane tab="十五天" key="15">
                                        <Row>
                                            <Col span={10}><span>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:''}</span></Col>
                                            <Col span={6}><span>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:''}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x15:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y15:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span></Col>
                                            <Col span={10}><span>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x15:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y15:''}</span></Col>

                                        </Row>
                                        <Row>
                                            <Col span={10}><span>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span></Col>
                                            <Col span={10}><span>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span></Col>
                                        </Row>
                                </TabPane>
                            </Tabs>
                        </Card>
                        <Card size='small' style={{marginTop:'15px',height:'65%'}}>
                            <Tabs defaultActiveKey="01"
                                  activeKey={store.activeKey2}
                                  tabBarExtraContent={<span>天数：{store.activeKey1}</span>}
                                  onChange={(activeKey)=>this.onChange2(activeKey)}
                            >
                                <TabPane tab="X轴倾角累计图" key="01">
                                    <div style={{  marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('X轴倾角累计图',store.warn_x,store.angle_add_x)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Y轴倾角累计图" key="02">
                                    <div style={{ marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('Y轴倾角累计图',store.warn_x,store.angle_add_y)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="X轴最大倾角累计图" key="03">
                                    <div style={{  marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('X轴最大倾角累计图',store.warn_x,store.angle_big_x)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Y轴最大倾角累计图" key="04">
                                    <div style={ {marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('Y轴最大倾角累计图',store.warn_x,store.angle_big_y)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }

    componentDidMount() {
        this.select_site('');
    }
    //选择站名
    select_site=(type,key)=>{
        let data={};
        if(type=='site_id'){
            data={
                site_id:key
            }
        }else if(type=='site_name'){
            data={
                site_name:key
            }
        }
        request({
            url:'api/select_site',
            method:'GET',
            data,
            success: ({
                          data
                      }) => {
                console.log("选择站名",key,data);
                store.fetchList=data;
                this.getData(data[0],'1','1');
                this.getData(data[0],'1','30','1');
            }
        })
    };
    //获取累加值
    getData=(obj,page,size,OptionData)=>{
        let Arr=[];
        let data={};
        Arr.push(obj);
        console.log('传参',Arr,data,typeof Arr);
        Arr.map((item)=>{
            data.site_name=item.site_name;
            data.site_id=item.site_id;
            data.site_address=item.site_address;
            data.tower_type=item.tower_type;
            data.page=page;
            data.size=size;
            data.endDate=endTime2;
            data.startDate=startTime2;
        });
        console.log('传参',Arr,data);
        request({
            url: 'api/select_sensor_lj',
            method:'GET',
            data,
            success: ({
                          data
                      }) => {
                console.log('累加值',data);

                if(OptionData=='1'){
                    console.log('折线图数据',data);
                    if(data.length!=0){
                        console.log('折线图数据get',data);
                        store.warn_x=data.map(item=>item.create_date);
                        store.angle_add_x3=data.map(item=>item.angle_add_x3);
                        store.angle_add_y3=data.map(item=>item.angle_add_y3);
                        store.angle_big_x3=data.map(item=>item.angle_big_x3);
                        store.angle_big_y3=data.map(item=>item.angle_big_y3);

                        store.angle_add_x=store.angle_add_x3;
                        store.angle_add_y=store.angle_add_y3;
                        store.angle_big_x=store.angle_big_x3;
                        store.angle_big_y=store.angle_big_y3;

                        store.angle_add_x5=data.map(item=>item.angle_add_x5);
                        store.angle_add_y5=data.map(item=>item.angle_add_y5);
                        store.angle_big_x5=data.map(item=>item.angle_big_x5);
                        store.angle_big_y5=data.map(item=>item.angle_big_y5);

                        store.angle_add_x7=data.map(item=>item.angle_add_x7);
                        store.angle_add_y7=data.map(item=>item.angle_add_y7);
                        store.angle_big_x7=data.map(item=>item.angle_big_x7);
                        store.angle_big_y7=data.map(item=>item.angle_big_y7);

                        store.angle_add_x10=data.map(item=>item.angle_add_x10);
                        store.angle_add_y10=data.map(item=>item.angle_add_y10);
                        store.angle_big_x10=data.map(item=>item.angle_big_x10);
                        store.angle_big_y10=data.map(item=>item.angle_big_y10);

                        store.angle_add_x15=data.map(item=>item.angle_add_x15);
                        store.angle_add_y15=data.map(item=>item.angle_add_y15);
                        store.angle_big_x15=data.map(item=>item.angle_big_x15);
                        store.angle_big_y15=data.map(item=>item.angle_big_y15);

                        console.log('1111',store.warn_x,store.angle_add_x3);
                    }else{
                        console.log('折线图数据为空',data);
                        store.angle_add_x=[];
                        store.angle_add_y=[];
                        store.angle_big_x=[];
                        store.angle_big_y=[];

                        store.angle_add_x5=[];
                        store.angle_add_y5=[];
                        store.angle_big_x5=[];
                        store.angle_big_y5=[];

                        store.angle_add_x7=[];
                        store.angle_add_y7=[];
                        store.angle_big_x7=[];
                        store.angle_big_y7=[];

                        store.angle_add_x10=[];
                        store.angle_add_y10=[];
                        store.angle_big_x10=[];
                        store.angle_big_y10=[];

                        store.angle_add_x15=[];
                        store.angle_add_y15=[];
                        store.angle_big_x15=[];
                        store.angle_big_y15=[];
                    }
                }else{
                    store.warnCurrent=data;
                    this.getWarn(3);
                }
            }
        })
    };
    //获取警报值
    getWarn=(daynum)=>{
        store.activeKey1=daynum;
        request({
            url:'api/select_lj_alert',
            method:'GET',
            data:{
                daynum:daynum
            },
            success:({data})=>{
                console.log('警报值',data);
                store.warnValue=data;
            }
        })
    };

    //根据天数，改变折线图数据
    onChange1=(key)=>{
        if(key=='3'){
            store.angle_add_x=store.angle_add_x3;
            store.angle_add_y=store.angle_add_y3;
            store.angle_big_x=store.angle_big_x3;
            store.angle_big_y=store.angle_big_y3;
        }else if(key=='5'){
            store.angle_add_x=store.angle_add_x5;
            store.angle_add_y=store.angle_add_y5;
            store.angle_big_x=store.angle_big_x5;
            store.angle_big_y=store.angle_big_y5;
        }else if(key=='7'){
            store.angle_add_x=store.angle_add_x7;
            store.angle_add_y=store.angle_add_y7;
            store.angle_big_x=store.angle_big_x7;
            store.angle_big_y=store.angle_big_y7;
        }else if(key=='10'){
            store.angle_add_x=store.angle_add_x10;
            store.angle_add_y=store.angle_add_y10;
            store.angle_big_x=store.angle_big_x10;
            store.angle_big_y=store.angle_big_y10;
        }else if(key=='15'){
            store.angle_add_x=store.angle_add_x15;
            store.angle_add_y=store.angle_add_y15;
            store.angle_big_x=store.angle_big_x15;
            store.angle_big_y=store.angle_big_y15;
        }
    };
    onChange2=(key)=>{
        store.activeKey2=key;
        console.log('store.activeKey2',store.activeKey2)
    };

    getOption2=(title,xAxis, series)=>{
        return{
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:store.echartsData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },dataZoom: [{
                show: true,
                start: 10,
                end: 90,
                realtime: true
            }, {
                type: 'slider'
            }],
            series: [{
                data: series,
                type: 'line'
            }]
        }
    };
    getOption2_hou = (title,xAxis, series) => {
        return{
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:store.warn_name
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },dataZoom: [{
                show: true,
                start: 10,
                end: 90,
                realtime: true
            }, {
                type: 'slider'
            }],
            series: [
                {
                    name:store.warn_name,
                    stack: '总量',
                    data: series,
                    type: 'line'
                }
            ]
        }
    };

    onSelect=(value)=> {
        console.log('onSelect', value);
        store.search=[];
    };

    filter=(arr, value)=> {
        return arr.filter(v => Object.values(v).some(v => new RegExp(value + '').test(v))
        )
    }
}
//export default Warn;
export default Form.create()(Warn)


*/
import React ,{ Component ,Fragment} from 'react';
import {Card, Row, Col, Breadcrumb, Input, Icon, AutoComplete, Table, Tabs, Tooltip, Form} from 'antd';
import store from "../store";
import ReactEcharts from 'echarts-for-react';
import request from "../../../helpers/request";
import moment from 'moment';
import {observer} from "mobx-react";
const { TabPane } = Tabs;

var startTime2=moment(new Date()).subtract(30,'days').format('YYYY-MM-DD');
var endTime2 = moment(new Date()).format('YYYY-MM-DD');
console.log('startTime,endTime',endTime2,startTime2);

@observer
export default class Warn extends React.Component{
    columns=[{
        title: '站名',
        dataIndex: 'site_name',
        render: (text, record,index) => {
            return <a onClick={(e) => {
                console.log('record',record);
                e.preventDefault();
                store.warn_name=text;
                //store.warn_imei=record.imei;
                this.getData(record,'1','1');
                this.getData(record,'1','30','1');
            }}>{text}</a>
        }
    }];

    render(){
        return(
            <Fragment>
                <div style={{width:'100%'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>预警模型</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{width:'100%',height: 630}}>
                    <div style={{ height: 630,width:'20%', zIndex: 5,display:'inline-block',float:'left' }}>
                        <Card title='工作铁塔' style={{height:'100%'}} size='small'>
                            <AutoComplete
                                dataSource={store.search}
                                onSelect={(value)=>this.onSelect(value)}
                                onSearch={(value)=>this.select_site('site_name',value)}
                                allowClear={true}
                                optionLabelProp='value'
                                style={{ marginBottom: 5 ,width:'100%'}}
                            >
                                <Input
                                    prefix={(
                                        <Icon type="search" />
                                    )}
                                />
                            </AutoComplete>
                            <Table
                                dataSource={store.fetchList}
                                columns={this.columns}
                                size='small'
                                rowKey={(record,index) =>index}
                                style={{fontSize:'10px'}}
                            />
                        </Card>
                    </div>
                    <div style={{ height:600, zIndex: 5 ,display:'inline-block',width:'80%',float:'left'}}>
                        <Card title='基本信息'  size='small' style={{height:'40%'}}>
                            <Tabs  defaultActiveKey="3" onChange={(activeKey)=>{this.getWarn(activeKey);this.onChange1(activeKey)}}>
                                <TabPane tab="三天" key="3">
                                        <span style={{display:'inline-block',width:'50%'}}>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span>
                                        <span style={{display:'inline-block',width:'50%'}}>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span>

                                        <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x3:''}</span>
                                        <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y3:''}</span>

                                        <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span>
                                        <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span>

                                        <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x3:''}</span>
                                        <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y3:''}</span>

                                        <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span>
                                        <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span>
                                </TabPane>
                                <TabPane tab="五天" key="5">
                                    <span style={{display:'inline-block',width:'50%'}}>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x5:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y5:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x5:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y5:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span>

                                </TabPane>
                                <TabPane tab="七天" key="7">
                                    <span style={{display:'inline-block',width:'50%'}}>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x7:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y7:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span>
                                     <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x7:''}</span>
                                     <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y7:''}</span>

                                   <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span>

                                </TabPane>
                                <TabPane tab="十天" key="10">
                                   <span style={{display:'inline-block',width:'50%'}}>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:store.warn_imei}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:store.warn_name}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x10:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y10:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x10:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y10:''}</span>

                                   <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span>

                                </TabPane>
                                <TabPane tab="十五天" key="15">
                                   <span style={{display:'inline-block',width:'50%'}}>IMEI：{store.warnCurrent.length>0?store.warnCurrent[0].imei:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>站名：{store.warnCurrent.length>0?store.warnCurrent[0].site_name:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_x15:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_add_y15:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_add_y:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_x15:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计：{store.warnCurrent.length>0?store.warnCurrent[0].angle_big_y15:''}</span>

                                    <span style={{display:'inline-block',width:'50%'}}>X轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_x:''}</span>
                                    <span style={{display:'inline-block',width:'50%'}}>Y轴最大倾角累计预警值：{store.warnValue.length>0?store.warnValue[0].angle_big_y:''}</span>

                                </TabPane>
                            </Tabs>
                        </Card>
                        <Card size='small' style={{marginTop:'15px',height:'65%'}}>
                            <Tabs defaultActiveKey="01"
                                  activeKey={store.activeKey2}
                                  tabBarExtraContent={<span>天数：{store.activeKey1}</span>}
                                  onChange={(activeKey)=>this.onChange2(activeKey)}
                            >
                                <TabPane tab="X轴倾角累计图" key="01">
                                    <div style={{  marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('X轴倾角累计图',store.warn_x,store.angle_add_x)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Y轴倾角累计图" key="02">
                                    <div style={{ marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('Y轴倾角累计图',store.warn_x,store.angle_add_y)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="X轴最大倾角累计图" key="03">
                                    <div style={{  marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('X轴最大倾角累计图',store.warn_x,store.angle_big_x)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Y轴最大倾角累计图" key="04">
                                    <div style={ {marginTop: 0 }}>
                                        <ReactEcharts option={this.getOption2('Y轴最大倾角累计图',store.warn_x,store.angle_big_y)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        this.select_site('');
    }
    //选择站名
    select_site=(type,key)=>{
        let data={};
        if(type=='site_id'){
            data={
                site_id:key
            }
        }else if(type=='site_name'){
            data={
                site_name:key
            }
        }
        request({
            url:'api/select_site',
            method:'GET',
            data,
            success: ({
                          data
                      }) => {
                console.log("选择站名",key,data);
                store.fetchList=data;
                this.getData(data[0],'1','1');
                this.getData(data[0],'1','30','1');
            }
        })
    };
    //获取累加值
    getData=(obj,page,size,OptionData)=>{
        let Arr=[];
        let data={};
        Arr.push(obj);
        console.log('传参',Arr,data,typeof Arr);
        Arr.map((item)=>{
            data.site_name=item.site_name;
            data.site_id=item.site_id;
            data.site_address=item.site_address;
            data.tower_type=item.tower_type;
            data.page=page;
            data.size=size;
            data.endDate=endTime2;
            data.startDate=startTime2;
        });
        console.log('传参',Arr,data);
        request({
            url: 'api/select_sensor_lj',
            method:'GET',
            data,
            success: ({
                          data
                      }) => {
                console.log('累加值',data);

                if(OptionData=='1'){
                    console.log('折线图数据',data);
                    if(data.length!=0){
                        console.log('折线图数据get',data);
                        store.warn_x=data.map(item=>item.create_date);
                        store.angle_add_x3=data.map(item=>item.angle_add_x3);
                        store.angle_add_y3=data.map(item=>item.angle_add_y3);
                        store.angle_big_x3=data.map(item=>item.angle_big_x3);
                        store.angle_big_y3=data.map(item=>item.angle_big_y3);

                        store.angle_add_x=store.angle_add_x3;
                        store.angle_add_y=store.angle_add_y3;
                        store.angle_big_x=store.angle_big_x3;
                        store.angle_big_y=store.angle_big_y3;

                        store.angle_add_x5=data.map(item=>item.angle_add_x5);
                        store.angle_add_y5=data.map(item=>item.angle_add_y5);
                        store.angle_big_x5=data.map(item=>item.angle_big_x5);
                        store.angle_big_y5=data.map(item=>item.angle_big_y5);

                        store.angle_add_x7=data.map(item=>item.angle_add_x7);
                        store.angle_add_y7=data.map(item=>item.angle_add_y7);
                        store.angle_big_x7=data.map(item=>item.angle_big_x7);
                        store.angle_big_y7=data.map(item=>item.angle_big_y7);

                        store.angle_add_x10=data.map(item=>item.angle_add_x10);
                        store.angle_add_y10=data.map(item=>item.angle_add_y10);
                        store.angle_big_x10=data.map(item=>item.angle_big_x10);
                        store.angle_big_y10=data.map(item=>item.angle_big_y10);

                        store.angle_add_x15=data.map(item=>item.angle_add_x15);
                        store.angle_add_y15=data.map(item=>item.angle_add_y15);
                        store.angle_big_x15=data.map(item=>item.angle_big_x15);
                        store.angle_big_y15=data.map(item=>item.angle_big_y15);

                        console.log('1111',store.warn_x,store.angle_add_x3);
                    }else{
                        console.log('折线图数据为空',data);
                        store.angle_add_x=[];
                        store.angle_add_y=[];
                        store.angle_big_x=[];
                        store.angle_big_y=[];

                        store.angle_add_x5=[];
                        store.angle_add_y5=[];
                        store.angle_big_x5=[];
                        store.angle_big_y5=[];

                        store.angle_add_x7=[];
                        store.angle_add_y7=[];
                        store.angle_big_x7=[];
                        store.angle_big_y7=[];

                        store.angle_add_x10=[];
                        store.angle_add_y10=[];
                        store.angle_big_x10=[];
                        store.angle_big_y10=[];

                        store.angle_add_x15=[];
                        store.angle_add_y15=[];
                        store.angle_big_x15=[];
                        store.angle_big_y15=[];
                    }
                }else{
                    store.warnCurrent=data;
                    this.getWarn(3);
                }
            }
        })
    };
    //获取警报值
    getWarn=(daynum)=>{
        store.activeKey1=daynum;
        request({
            url:'api/select_lj_alert',
            method:'GET',
            data:{
                daynum:daynum
            },
            success:({data})=>{
                console.log('警报值',data);
                store.warnValue=data;
            }
        })
    };

    //根据天数，改变折线图数据
    onChange1=(key)=>{
        if(key=='3'){
            store.angle_add_x=store.angle_add_x3;
            store.angle_add_y=store.angle_add_y3;
            store.angle_big_x=store.angle_big_x3;
            store.angle_big_y=store.angle_big_y3;
        }else if(key=='5'){
            store.angle_add_x=store.angle_add_x5;
            store.angle_add_y=store.angle_add_y5;
            store.angle_big_x=store.angle_big_x5;
            store.angle_big_y=store.angle_big_y5;
        }else if(key=='7'){
            store.angle_add_x=store.angle_add_x7;
            store.angle_add_y=store.angle_add_y7;
            store.angle_big_x=store.angle_big_x7;
            store.angle_big_y=store.angle_big_y7;
        }else if(key=='10'){
            store.angle_add_x=store.angle_add_x10;
            store.angle_add_y=store.angle_add_y10;
            store.angle_big_x=store.angle_big_x10;
            store.angle_big_y=store.angle_big_y10;
        }else if(key=='15'){
            store.angle_add_x=store.angle_add_x15;
            store.angle_add_y=store.angle_add_y15;
            store.angle_big_x=store.angle_big_x15;
            store.angle_big_y=store.angle_big_y15;
        }
    };
    onChange2=(key)=>{
        store.activeKey2=key;
        console.log('store.activeKey2',store.activeKey2)
    };

    getOption2=(title,xAxis, series)=>{
        return{
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:store.echartsData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },dataZoom: [{
                show: true,
                start: 10,
                end: 90,
                realtime: true
            }, {
                type: 'slider'
            }],
            series: [{
                data: series,
                type: 'line'
            }]
        }
    };

    onSelect=(value)=> {
        console.log('onSelect', value);
        store.search=[];
    };

    filter=(arr, value)=> {
        return arr.filter(v => Object.values(v).some(v => new RegExp(value + '').test(v))
        )
    }
}
