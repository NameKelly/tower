import React, {
  Fragment
} from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  Tooltip,
  Breadcrumb,
  AutoComplete,
  Form, Tabs,Icon
} from 'antd';
import EditAlarm from './editAlarm/editAlarm';
import IntializeModal from './initializeDevice/initializeDevice'
import store from './store';
import {
  observer
} from "mobx-react";
import style from './monitor.css';
import {
  Link
} from 'react-router-dom';
import request from '../../helpers/request';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
const TabPane = Tabs.TabPane;
const Search = Input.Search;

const now = new Date();
now.setDate(1);
var startTime = moment(now).format('YYYY-MM-DD');
now.setMonth(now.getMonth() + 1);
now.setDate(now.getDate() - 1);
var endTime = moment(now).format('YYYY-MM-DD');
console.log('startTime,endTime',endTime,startTime);

const state_type = ['', '正常', '停用'];
const ini_state = ['', '成功', '待处理'];



@observer
class Monitor extends React.Component {
  constructor(props) {
    super(props);

  }
  data = [{
    "params": {
      "angleX": 200
    }
  }];
  columns = [ {
    title: '站名',
    dataIndex: 'site',
    width: 90,
    className: style.siteBox,
    render: (text, record,index) => {
      return <a onClick={(e) => { e.preventDefault(); this.getDataList(index,text)}}>{text}</a>
    }
  }];
  workColumns = [{
    title: '状态',
    dataIndex: 'deviceState',
    width: 120,
  }, {
    title: '倾角',
    dataIndex: 'angle',
    width: 90,
  }, {
    title: 'X轴倾角',
    dataIndex: 'angle_x',
    width: 90

  }, {
    title: 'Y轴倾角',
    dataIndex: 'angle_y',
    width: 90

  },{
    title: '高度',
    dataIndex: 'height',
    width: 90

  },  {
    title: '偏移距离',
    dataIndex: 'angle_range',
    width: 90

  }, {
    title: '方差',
    dataIndex: 'variance',
    width: 90

  }, {
    title: '日期',
    dataIndex: 'create_time',
    width: 150
  }, ];

  componentDidMount() {
    this.getDevicesList();
  }
  calAngle = (x, y) => {
    let cosX = Math.cos(x / 180);
    let cosY = Math.cos(y / 180);
    let sinX = Math.sin(x / 180);
    let sinY = Math.sin(y / 180);
    let num_1 = Math.pow(cosX, 2) - Math.pow(sinY, 2);
    let num_2 = Math.pow(cosY, 2) - Math.pow(sinX, 2);
    let sqrt_1 = Math.sqrt(num_1);
    let sqrt_2 = Math.sqrt(num_2);
    let angle;
    if (num_1 > 0) {
      angle = Math.acos(sqrt_1) * Math.PI;
      angle = angle.toFixed(5);
      return angle
    } else {
      angle = Math.acos(sqrt_2) * Math.PI;
      angle = angle.toFixed(5);
      return angle
    }
  }

  render() {
    var arr = [];
    let {
      alarm_modal,
      initialize_modal,
      realtimeData,
      basicMsg,
      initialParams,
      months_data,
      fetchList,
      initialData
    } = store;
    let {
      imei,
      title,
      site,
      X0,
      Y0,
      X1,
      Y1,
      create_time,
      angle,
      state,
      update_time,
      angle_range
    } = basicMsg;
    let {
      x,
      y,
      height,
      variance,
    } = realtimeData;
    angle = parseFloat(angle).toFixed(3);
    return (
        <Fragment>
          <Breadcrumb>
            <Breadcrumb.Item>监控页</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={3} >
            <Col span={5} style={{ height: 800, zIndex: 5 }}>
              <Card title='工作铁塔' style={{ height: "100%",width:"100%"}}>
                <AutoComplete
                    dataSource={store.search}
                    onSelect={(value)=>this.onSelect(value)}
                    onSearch={this.handleSearch}
                    allowClear={true}
                    onBlur={this.onBlur}
                    style={{ marginBottom: 5 ,width:'100%'}}
                >
                  <Input
                      prefix={(
                          <Icon type="search" />
                      )}
                  />
                </AutoComplete>
                {/*,tableLayout:'fixed',overflow:'hidden'    style={{width:'100%',fontSize:'10px'}}*/}
                <Table dataSource={fetchList} columns={this.columns} rowKey={record => record.index} size='small' style={{width:'100%',fontSize:'10px',tableLayout:'fixed',overflow:'hidden' }} />
              </Card>
            </Col>
            <Col>
              <Row gutter={3}>
                <Col span={5} style={{ height: 450 }}>
                  <Card title='基本信息' style={{ height: "100%" }} extra={<Button size='small' onClick={() => initialize_modal.visible = true}>初始化</Button>}>
                    <h4>IMEI: <span className={style.basicMessage}>{imei}</span></h4>
                    <h4>站名: <span className={style.basicMessage}>{site}</span></h4>
                    <h4>创建时间: <span className={style.basicMessage}>{create_time}</span></h4>
                    <h4>警报功能设置
                      <Button size='small' type='primary' style={{ float: 'right' }} onClick={() => {
                        alarm_modal.visible = true
                      }}>编辑</Button>
                    </h4>
                    <h4 style={{ margin: '0 auto', fontSize: 16, whiteSpace: 'pre' }}>
                      <br />X轴初始角度:  {X0}°
                      <br />Y轴初始角度:  {Y0}°
                      <br />X轴报警指数:  {X1}°
                      <br />Y轴报警指数:  {Y1}°
                      <br />距离报警指数：{angle_range}
                      <br />初始倾斜角度:  {angle}°
                      <br />初始化时间:  {update_time}
                      <br />初始化结果:  {ini_state[state]}
                    </h4>
                  </Card>
                </Col>
                <Col span={13} style={{ marginBottom: 12 }} style={{ height: 180, marginBottom: 10 }}>
                  <Card title='实时工作状态' style={{ height: "100%" }}
                        extra={<div>最近一次更新：{realtimeData.create_time}</div>}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>倾角</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>x轴倾角</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>y轴倾角</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>高度</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>偏移距离</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>方差</span></div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 10, alignItems:'center' }}>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData.angle}°</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{x}°</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{y}°</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{height}m</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData.angle_range}cm</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{variance}cm</span></div>

                    </div>
                  </Card>
                </Col>
                <Col span={13} style={{ height: 260 }}>

                  <Card title='本月工作情况' style={{ height: "100%" }}
                        extra={<Link to={'/historyStatus'}>历史工作情况</Link>} >
                    <Table columns={this.workColumns} dataSource={months_data} size={"small"} pagination={false} scroll={{ y: 120 }} rowKey={record => record.index} />
                  </Card>
                </Col>
                <Col span={18} style={{ marginTop: 10, height: 340 }}>
                  <Card style={{ height: '100%' }} bordered={false} bodyStyle={{ padding: '0 0 32px 0' }}>
                    {/* <ReactEcharts option={this.getOption()} style={{ width: '100%' }} notMerge={true} lazyUpdate={true} ></ReactEcharts>*/}
                    <Tabs size='large' tabBarExtraContent={<div>日期:{realtimeData.create_time}</div>}>
                      <TabPane tab="倾角图" key="1">
                        <div style={{ padding: '0 24px', marginTop: -30 }}>
                          <ReactEcharts option={this.getOption1()} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                        </div>
                      </TabPane>
                      <TabPane tab="电池电压图" key="2">
                        <div style={{ padding: '0 24px', marginTop: -30 }}>
                        </div></TabPane>
                      <TabPane tab="工作温度图" key="3">
                        <div style={{ padding: '0 24px', marginTop: -30 }}>
                        </div></TabPane>
                    </Tabs>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <EditAlarm props={alarm_modal} params={basicMsg} initialDatas={initialData} />
          <IntializeModal props={initialize_modal} params={basicMsg} date={initialParams} />
          <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
        </Fragment>
    )
  }
  onBlur=()=>{
    store.search=[]
  };
  handleSearch = (value) => {
    let inputValue=value;
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
          return item.includes(inputValue);
        });

        store.fetchList=data;

      }
    });

  };
  onSelect=(value)=> {
    console.log('onSelect', value);
    store.search=[]
  };
  getDevicesList = () => {
    request({
      url: 'api/show_sensor_list',
      success: ({
                  data
                }) => {
        store.fetchList = data;
        let imei = store.fetchList[0].imei;
        store.currentImei=imei;
        this.getDataList(0);
        console.log('show_sensor_list',data)
      }
    })
  };
  getDeviceData = (imei) => {
    request({
      url: 'api/show_adjust_angle',
      data: {
        imei
      },
      success: ({
                  data
                }) => {
        store.basicMsg = data[0];
        this.getCurrentData(imei);
        console.log('show_adjust_angle',data)
      }
    })
  };
  getDataList = (index,site) => {
    store.currentImei=store.fetchList[index].imei;
    request({
      url: 'api/show_data_list',
      data: {
        imei:store.currentImei,
        startTime,
        endTime,
        page: 1,
        size: 31
      },
      success: ({
                  data
                }) => {
        store.months_data = data;
        console.log("api/show_data_list:months_data",data);
        this.getDeviceData(store.currentImei);
        this.getAngle(store.currentImei);
      }
    })
  };
  getCurrentData = (imei) => {
    request({
      url: 'api/Lately_data',
      data: {
        imei
      },
      success: ({
                  data
                }) => {
        store.realtimeData = data[0];
        console.log('api/Lately_data',data)
      }
    })
  };
  getAngle = (imei) => {
    request({
      url: 'api/show_angle',
      data: {
        imei,
      },
      success: ({
                  data
                }) => {
        console.log('api/show_angle',data);
        let angleValue = data.map(v => v.angle);
        let dateValue = data.map(v => v.create_time);
        let xValue = data.map(v => v.angle_x);
        let yValue = data.map(v => v.angle_y);
        let rangeValue = data.map(v => v.angle_range);
        // store.dateValue = dateValue;
        let mydateValue = dateValue.filter(i => (i >= startTime && i <= endTime));
        //选出本月的数据
        store.dateValue = mydateValue;

        store.angleValue = angleValue;
        store.xValue = xValue;
        store.yValue = yValue;
        store.rangeValue = rangeValue;
        /* console.log('mydateValue', mydateValue);
         console.log(startTime);
         console.log(endTime);*/
      }
    })
  };
  /* getOption = () => {
     return {
       title: [{
         left: '3%',
         text: '倾角变化图'
       }],
       grid: {
         left: '3%',
         right: '4%',
         bottom: '3%',
         containLabel: true
       },
       tooltip: {
         trigger: 'axis'
       },
       legend: {
         data: ['总倾角', 'x轴倾角', 'y轴倾角', '距离']
       },
       xAxis: [{
         type: 'category',
         data: store.dateValue
       }],
       yAxis: [{
         splitLine: {
           show: false
         }
       }],
       dataZoom: [{
         show: true,
         start: 1,
         end: 100,
         realtime: true
       }, {
         type: 'slider'
       }],
       series: [{
         name: '总倾角',
         type: 'line',
         showSymbol: true,
         data: store.angleValue
       }, {
         name: 'x轴倾角',
         type: 'line',
         showSymbol: true,
         data: store.xValue
       }, {
         name: 'y轴倾角',
         type: 'line',
         showSymbol: true,
         data: store.yValue
       }, {
         name: '距离',
         type: 'line',
         showSymbol: true,
         data: store.rangeValue
       }]
     }
   };*/
  getOption1 = () => {
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
        data: store.dateValue,
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
        start: 90,
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
        data: store.angleValue,
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
            yAxis: 2300           // 警戒线的标注值，可以有多个yAxis,多条警示线
          }]
        }
      }]
    }
  }
}


export default Form.create()(Monitor)