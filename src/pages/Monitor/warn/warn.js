import React ,{ Component ,Fragment}from 'react';
import {Card, Row, Col, Breadcrumb, Input, Icon, AutoComplete, Table, Tabs, Tooltip} from 'antd';
import store from "../store";
import ReactEcharts from 'echarts-for-react';
import request from "../../../helpers/request";
import moment from 'moment';
import {observer} from "mobx-react";
const { TabPane } = Tabs;
let {
    x_add_arr,
    y_add_arr,
    x_big_arr,
    y_big_arr
} =store;
const {
    currentImei2,
    currentSite2,
    x_add_all,
    y_add_all,
    x_big_all,
    y_big_all,
    date_time2,
} =store.warnCurrent;
let {
    startTime,
    endTime
}=store.warnParams;

@observer
class Warn extends Component{
    columns=[{
        title: '站名',
        dataIndex: 'site',
        render: (text, record,index) => {
            return <a onClick={(e) => { e.preventDefault(); this.getCurrent(index,text);}}>{text}</a>
        }
    }];


    render(){
        return(
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>预警模型</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={3}>
                    <Col span={5} style={{ height: 600, zIndex: 5 }}>
                        <Card title='工作铁塔' style={{height:'100%'}} size='small'>
                            <AutoComplete
                                dataSource={store.search}
                                onSelect={(value)=>this.onSelect(value)}
                                onSearch={(value)=>this.handleSearch(value)}
                                allowClear={true}
                                onBlur={this.onBlur}
                                optionLabelProp='value'
                                style={{ marginBottom: 5 ,width:'100%'}}
                            >
                                <Input
                                    prefix={(
                                        <Icon type="search" />
                                    )}
                                />
                            </AutoComplete>
                            <Table dataSource={store.fetchList} columns={this.columns} size='small' rowKey={record => record.index}
                                   style={{fontSize:'10px'}}
                            />
                        </Card>
                    </Col >
                    <Col span={19} style={{ height:600, zIndex: 5 }} >
                       <Card title='基本信息'  size='small' style={{height:'40%'}}>
                           <Tabs  defaultActiveKey="1" activeKey={store.activeKey1} onChange={(activeKey)=>this.onChange1(activeKey)}>
                               <TabPane tab="三天" key="1">
                                   <Row>
                                   <Row>
                                       <Col span={10}><span>IMEI：{store.warnCurrent.currentImei2}</span></Col>
                                       <Col span={6}><span>站名：{store.warnCurrent.currentSite2}</span></Col>
                                   </Row>
                                   <Row>
                                       <Col span={10}><span>X轴倾角累计：{store.warnCurrent.x_add_all}</span></Col>
                                       <Col span={10}><span>Y轴倾角累计：{store.warnCurrent.y_add_all}</span></Col>

                                   </Row>
                                       <Row>
                                           <Col span={10}><span>X轴倾角累计预警值：{store.warnValue.warn_addX}</span></Col>
                                           <Col span={10}><span>Y轴倾角累计预警值：{store.warnValue.warn_addY}</span></Col>
                                       </Row>
                                   <Row>
                                       <Col span={10}><span>X轴最大倾角累计：{store.warnCurrent.x_big_all}</span></Col>
                                       <Col span={10}><span>Y轴最大倾角累计：{store.warnCurrent.y_big_all}</span></Col>

                                   </Row>
                                       <Row>
                                           <Col span={10}><span>X轴最大倾角累计预警值：{store.warnValue.warn_bigX}</span></Col>
                                           <Col span={10}><span>Y轴最大倾角累计预警值：{store.warnValue.warn_bigY}</span></Col>
                                       </Row>
                               </Row>
                               </TabPane>
                               <TabPane tab="五天" key="2">
                                   <Row>
                                       <Row>
                                           <Col span={6}><span>IMEI：{store.warnCurrent.currentImei2}</span></Col>
                                           <Col span={6}><span>站名：{store.warnCurrent.currentSite2}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴倾角累计：{store.warnCurrent.x_add_all}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计：{store.warnCurrent.y_add_all}</span></Col>
                                           <Col span={6}><span>X轴倾角累计预警值：{store.warnValue.warn_addX}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计预警值：{store.warnValue.warn_addY}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴最大倾角累计：{store.warnCurrent.x_big_all}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计：{store.warnCurrent.y_big_all}</span></Col>
                                           <Col span={6}><span>X轴最大倾角累计预警值：{store.warnValue.warn_bigX}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计预警值：{store.warnValue.warn_bigY}</span></Col>
                                       </Row>
                                   </Row>
                               </TabPane>
                               <TabPane tab="七天" key="3">
                                   <Row>
                                       <Row>
                                           <Col span={6}><span>IMEI：{store.warnCurrent.currentImei2}</span></Col>
                                           <Col span={6}><span>站名：{store.warnCurrent.currentSite2}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴倾角累计：{store.warnCurrent.x_add_all}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计：{store.warnCurrent.y_add_all}</span></Col>
                                           <Col span={6}><span>X轴倾角累计预警值：{store.warnValue.warn_addX}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计预警值：{store.warnValue.warn_addY}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴最大倾角累计：{store.warnCurrent.x_big_all}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计：{store.warnCurrent.y_big_all}</span></Col>
                                           <Col span={6}><span>X轴最大倾角累计预警值：{store.warnValue.warn_bigX}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计预警值：{store.warnValue.warn_bigY}</span></Col>
                                       </Row>
                                   </Row>
                               </TabPane>
                               <TabPane tab="十天" key="4">
                                   <Row>
                                       <Row>
                                           <Col span={6}><span>IMEI：{store.warnCurrent.currentImei2}</span></Col>
                                           <Col span={6}><span>站名：{store.warnCurrent.currentSite2}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴倾角累计：{store.warnCurrent.x_add_all}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计：{store.warnCurrent.y_add_all}</span></Col>
                                           <Col span={6}><span>X轴倾角累计预警值：{store.warnValue.warn_addX}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计预警值：{store.warnValue.warn_addY}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴最大倾角累计：{store.warnCurrent.x_big_all}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计：{store.warnCurrent.y_big_all}</span></Col>
                                           <Col span={6}><span>X轴最大倾角累计预警值：{store.warnValue.warn_bigX}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计预警值：{store.warnValue.warn_bigY}</span></Col>
                                       </Row>
                                   </Row>
                               </TabPane>
                               <TabPane tab="十五天" key="5">
                                   <Row>
                                       <Row>
                                           <Col span={6}><span>IMEI：{store.warnCurrent.currentImei2}</span></Col>
                                           <Col span={6}><span>站名：{store.warnCurrent.currentSite2}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴倾角累计：{store.warnCurrent.x_add_all}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计：{store.warnCurrent.y_add_all}</span></Col>
                                           <Col span={6}><span>X轴倾角累计预警值：{store.warnValue.warn_addX}</span></Col>
                                           <Col span={6}><span>Y轴倾角累计预警值：{store.warnValue.warn_addY}</span></Col>
                                       </Row>
                                       <Row>
                                           <Col span={6}><span>X轴最大倾角累计：{store.warnCurrent.x_big_all}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计：{store.warnCurrent.y_big_all}</span></Col>
                                           <Col span={6}><span>X轴最大倾角累计预警值：{store.warnValue.warn_bigX}</span></Col>
                                           <Col span={6}><span>Y轴最大倾角累计预警值：{store.warnValue.warn_bigY}</span></Col>
                                       </Row>
                                   </Row>
                               </TabPane>
                           </Tabs>
                       </Card>
                        <Card size='small' style={{marginTop:'15px',height:'60%'}}>
                            <Tabs defaultActiveKey="01"
                                  activeKey={store.activeKey2}
                                  tabBarExtraContent={<span>日期：</span>}
                                  onChange={(activeKey)=>this.onChange2(activeKey)}
                            >
                                <TabPane tab="X轴倾角累计图" key="01">
                                    <div style={{  marginTop: -30 }}>
                                        <ReactEcharts option={this.getOption1(store.warnCurrent.date_time2,store.x_add_arr,store.warnValue.warn_addX)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Y轴倾角累计图" key="02">
                                    <div style={{ marginTop: -30 }}>
                                        <ReactEcharts option={this.getOption1(store.warnCurrent.date_time2,store.y_add_arr,store.warnValue.warn_addY)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="X轴最大倾角累计图" key="03">
                                    <div style={{  marginTop: -30 }}>
                                        <ReactEcharts option={this.getOption1(store.warnCurrent.date_time2,store.x_big_arr,store.warnValue.warn_bigX)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Y最大轴倾角累计图" key="04">
                                    <div style={ {marginTop: -30 }}>
                                        <ReactEcharts option={this.getOption1(store.warnCurrent.date_time2,store.y_big_arr,store.warnValue.warn_bigX)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
    componentWillMount() {
        this.getWarnValue(store.day_number);
        this.getCurrent(0,store.fetchList[0].site,1);
        console.log(store.fetchList);
        store.fetchListFilter=Array.from(store.fetchList);
    }

    onChange1=(key)=>{
        if(key==2){
            store.day_number=5
        }else if(key==3){
            store.day_number=7
        }else if(key==4){
            store.day_number=10
        }else{
            store.day_number=15
        }
        store.activeKey1=key;
        console.log('key',key,'store.activeKey1',store.activeKey1);
        this.getWarnValue(store.day_number);
        this.getCurrent(store.fetchList[0].imei,store.fetchList[0].site,store.activeKey1);
    };
    onChange2=(key)=>{
                store.activeKey2=key;
                console.log('key',key,'store.activeKey',store.activeKey2)
    };
    getCurrent=(index,site,key) => {
        store.warnCurrent.currentImei2=store.fetchList[index].imei;
        store.warnCurrent.currentSite2=site;
        let time;
        if(key==1){
            time=store.warnParams.startTime=moment().subtract('days',2).format('YYYY-MM-DD')
        }
        if(key==2){
            time=store.warnParams.startTime=moment().subtract('days',4).format('YYYY-MM-DD')
        }else if(key==3){
            time=store.warnParams.startTime=moment().subtract('days',6).format('YYYY-MM-DD')
        }else if(key==4){
            time=store.warnParams.startTime=moment().subtract('days',9).format('YYYY-MM-DD')
        }else{
            time=store.warnParams.startTime=moment().subtract('days',14).format('YYYY-MM-DD')
        }

        console.log('currentImei2','currentSite2',store.warnCurrent.currentImei2,store.warnCurrent.currentSite2);
        request({
            url: 'api/warning',
            data: {
                imei:store.warnCurrent.currentImei2,
                startTime:time,
                endTime:store.warnParams.endTime,
                page: 1,
                size: 10000
            },
            success: ({
                          data
                      }) => {
                console.log("api/warning_data",data);
                console.log('startTime',store.warnParams.startTime,'endTime',store.warnParams.endTime);
                    let xAdd=data.map(v=>v.x_add);
                    let yAdd = data.map(v =>v.y_add);
                    let xBig = data.map(v =>v.x_big);
                    let yBig = data.map(v =>v.y_big);
                    let time=data.map(v=>v.date);

                store.x_add_arr=xAdd;
                store.y_add_arr=yAdd;
                store.x_big_arr=xBig;
                store.y_big_arr=yBig;
                store.warnCurrent.date_time2=time;
                console.log(store.x_add_arr,store.y_add_arr,store.x_big_arr,store.y_big_arr,store.warnCurrent.date_time2);

                    store.warnCurrent.x_add_all=this.sum(store.x_add_arr);
                    store.warnCurrent.y_add_all=this.sum(store.y_add_arr);
                    store.warnCurrent.x_big_all=this.sum(store.x_big_arr);
                    store.warnCurrent.y_big_all=this.sum(store.y_big_arr);
                    console.log('x_add_all',store.warnCurrent.x_add_all,'y_add_all',store.warnCurrent.x_add_all,'x_big_all',store.warnCurrent.x_big_all,'y_big_all',store.warnCurrent.y_big_all)
            }
        })
    };
    getWarnValue=(day_number) => {
        request({
            url: 'api/warn_angle',
            data: {
                day_number
            },
            success: ({
                          data
                      }) => {
                console.log('warn_angle',data);
                    store.warnValue.warn_addX=data[0].warn_addX;
                    store.warnValue.warn_addY=data[0].warn_addY;
                    store.warnValue.warn_bigX=data[0].warn_bigX;
                    store.warnValue.warn_bigY=data[0].warn_bigY;
                console.log('store.warnValue.warn_addX',data)
            }
        })
    };
    getOption1 = (x,y,warnValue) => {
        let warnValue2=warnValue*1;
        return {
            title:{
                text:'倾角值',
                right:'3px',
                top:'5%',
                textStyle:{
                    fontSize:'14px',
                    fontWeight:'normal'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                data:x,
                axisLabel:{
                    interval: 0
                }
            }],
            yAxis: [{
                splitLine: {
                    show: false
                }
            }],
            dataZoom: [{
                show: true,
                start: 10,
                end: 100,
                realtime: true
            }, {
                type: 'slider'
            }],
            series: [{
                name: '总倾角',
                type: 'line',
                color:'#5DADE2  ',
                showSymbol: true,
                data: y,
                markLine : {
                    symbol:"none",               //去掉警戒线最后面的箭头
                    label:{
                        formatter:'警报值',   //警戒线名称
                        position:"start"
                    },
                    data : [{
                        silent:false,             //鼠标悬停事件  true没有，false有
                        lineStyle:{               //警戒线的样式  ，虚实  颜色
                            type:"dashed",
                            color:"#FA3934",
                        },
                        yAxis:warnValue2           // 警戒线的标注值，可以有多个yAxis,多条警示线
                    }]
                }
            }]
        }
    };
    sum = (arr) => {
        var s = 0;
        for (var i=arr.length-1; i>=0; i--) {
            s += arr[i];
        }
        return s;
    };
    onSelect=(value)=> {
        console.log('onSelect', value);
        this.handleSearch(value);
        store.search=[];
    };
    onBlur=()=>{

    };
    handleSearch = (value) => {
        request({
            url: 'api/select_site',
            data:{
                keyword:value
            },
            success: ({
                          data
                      }) => {
                console.log('api/select_site',data);

                let siteValue = data.map(v => v.site);
                store.siteValue = siteValue;
                store.search= store.siteValue.filter(function (item) {
                    //遍历数组，返回值为true保留并复制到新数组，false则过滤掉
                    return item.includes(value);
                });
                store.fetchList=data;
                /*store.fetchList=this.filter(store.fetchListFilter,value);
                console.log('filter:store.fetchList',store.fetchList);*/
            }
        });
    };
    /*filter=(arr, value)=> {
        let result = [];
        arr.forEach(function (item, index) {
            if (item.site.includes(value)) {
                result.push(item);
            }
        });
        return result;
    };*/
    filter=(arr, value)=> {
        return arr.filter(v => Object.values(v).some(v => new RegExp(value + '').test(v))
        )
    }
}
export default Warn;