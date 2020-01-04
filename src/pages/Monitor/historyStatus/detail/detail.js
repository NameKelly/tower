import React, {Component, Fragment} from 'react';
import { Card,Tabs, Breadcrumb,LocaleProvider,Row,Col  } from 'antd';
import moment from 'moment';
import style from './detail.css';
import Charts from 'ant-design-pro/lib/Charts';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import request from "../../../../helpers/request";
import store from "../../store";
import ReactEcharts from 'echarts-for-react';

var startTime2=moment(new Date()).subtract(30,'days').format('YYYY-MM-DD');
var endTime2 = moment(new Date()).format('YYYY-MM-DD');

const { TimelineChart } = Charts;
const TabPane = Tabs.TabPane;
const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y: Math.floor(Math.random() * 10),
  });
}

@observer
export default class Detail extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
   this.getData();
  }

  componentDidMount() {
      //this.getData();
      this.getOption2('倾角图',store.details_series);
      this.getOption2('工作温度图',store.details_series3)
  }

    getData=()=>{
      request({
          url:'api/show_data_list',
          method:'GET',
          data:{
              machine_site_id:store.details.machine_site_id,
              startTime:startTime2,
              endTime:endTime2,
          },
          success:({data})=>{
              console.log(store.details.machine_site_id,data);
              let showData=data.slice(0,30);
              let arr=this.filterData(data,'machine_site_id','sensorID');
              this.getAngle(arr);
              this.getTemperature(arr);
              this.getXY(arr);
              /*this.getVoltage(arr);*/

          }
      })
  };
    //重组数组，筛选数据
    filterData=(arr,key,key2)=>{
        let map = {},
            dest = [];
        for(let i = 0; i < arr.length; i++){
            let ai = arr[i];
            if(!map[ai[key]]){
                dest.push({
                    [key]: ai[key],
                    [key2]:ai[key2],
                    data: [ai]
                });
                map[ai[key]] = ai;
            }else{
                for(let j = 0; j < dest.length; j++){
                    let dj = dest[j];
                    if(dj[key] == ai[key]){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        console.log('重组数组',dest);
        return dest;
        /*this.getAngle(dest);*/
    };
//获取倾角图数据
    getAngle=(arr)=>{
        console.log('getAngle');
        let filterArr=[];
        arr.map((item)=>{
            filterArr.push({
                name:item.sensorID,
                type:'line',
                stack: '总量',
                data:item.data.map(item=>item.angle)
            })
        });
        store.details_series=filterArr;
        this.setState({
            series:filterArr
        });
        store.details_echartsData=arr.map(item=>item.sensorID);
        store.details_echartsXData=arr[0].data.map(item=>item.create_time)
        console.log('store.details_series',store.details_series,filterArr)
    };
    //获取温度图数据
    getTemperature=(arr)=>{
        let filterArr=[];
        arr.map((item)=>{
            filterArr.push({
                name:item.sensorID,
                type:'line',
                stack: '总量',
                data:item.data.map(item=>item.deviceTemperature)
            })
        });
        store.details_series3=filterArr;
        this.setState({
            series3:filterArr
        });
        store.details_echartsData=arr.map(item=>item.sensorID);
        store.details_echartsXData=arr[0].data.map(item=>item.create_time);
        console.log('store.details_series3',typeof store.details_series3,filterArr,this.state.series3)
    };
    //获取电池电压图
    getVoltage=(arr)=>{
        let filterArr=[];
        arr.map((item)=>{
            filterArr.push({
                name:item.sensorID,
                type:'line',
                stack: '总量',
                data:[]
                /*data:item.data.map(item=>item.Voltage)*/
            })
        });
        store.details_series2=filterArr;
        store.details_echartsData=arr.map(item=>item.sensorID);
        store.details_echartsXData=arr[0].data.map(item=>item.create_time)
    };
    //获取散点图
    getXY=(arr)=>{
        let filterArr=[];
        console.log('获取XY轴坐标',arr);
        if(arr.length!=0){
            arr.map((item)=>{
                filterArr.push({
                    name:item.sensorID,
                    type:'scatter',
                    stack: '总量',
                    data:item.data.map(v=>
                        [v.sdt_x*1,v.sdt_y*1]
                    )
                })
            });
            store.details_echartsData=arr.map(item=>item.sensorID);
            store.details_series4=filterArr;
            console.log(filterArr,'series4');
        }
    };
    getOption2=(title, series)=>{
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
                data: store.echartsXData
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [{
                show: true,
                start: 10,
                end: 20,
                realtime: true
            }, {
                type: 'slider'
            }],
            series: series
        }
    };
    getOption3=()=>{
        return {
            title: {
                text: '散点图',
                left: 'left',
                top: 0
            },
            xAxis: {
                name:'X',
                type: 'value'
            },
            yAxis: {
                name:'Y',
                type: 'value'
            },
            legend: {
                data: store.details_echartsData
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>({b}{c})'
            },
            series: store.details_series4
        }
    };
    state={
        series:[],
        series3:[]
    };

  render(){
    return(
        <Fragment>
          <Breadcrumb>
              <Breadcrumb.Item><Link to='./monitor'>监控页</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to='/historyStatus/'>历史工作情况</Link></Breadcrumb.Item>
            <Breadcrumb.Item>详情</Breadcrumb.Item>
          </Breadcrumb>
          <Card style={{marginBottom:15}}>
            <div>
              <h2>日期：{store.details.create_time}</h2>
              <Row style={{ marginTop: 15 }}>
                <Col span={4}>状态：{store.details.state}</Col>
                <Col span={4}>倾角：{store.details.angle}</Col>
                <Col span={4}>X轴倾角：{store.details.angle_x}</Col>
                <Col span={4}>Y轴倾角：{store.details.angle_y}</Col>
                <Col span={4}>高度：{store.details.height}</Col>
                <Col span={4}>偏移距离：{store.details.angle_range}</Col>
                <Col span={4}>方差：{store.details.variance}</Col>
                <Col span={4}>平均电池电压：{store.details.deviceVoltage}</Col>
                <Col span={4}>平均工作温度：{store.details.deviceTemperature}</Col>
              </Row>
            </div>
          </Card>
          <Card>
            <Tabs size='large'>
              <TabPane tab="倾角图" key="1">
                <div style={{ padding: '0 24px', marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2('倾角图',store.details_series)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                 {/* <TimelineChart
                  height={300}
                  data={chartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />*/}
                </div>
              </TabPane>
              <TabPane tab="工作温度图" key="3">
                <div style={{ padding: '0 24px', marginTop: 10 }}>
                    <ReactEcharts option={this.getOption2('工作温度图',store.details_series3)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                  {/* <TimelineChart
                    height={300}
                    data={chartData}
                    titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />*/}
                </div></TabPane>
                <TabPane tab="散点图" key="2">
                <div style={{ padding: '0 24px', marginTop: 10 }}>
                    <ReactEcharts option={this.getOption3(store.details_series4)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                </div></TabPane>
            </Tabs>
          </Card>
          <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
        </Fragment>
    )
  }
}
