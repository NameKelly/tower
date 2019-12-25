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
var startTime2=moment(new Date()).subtract(30,'days').format('YYYY-MM-DD');
var endTime2 = moment(new Date()).format('YYYY-MM-DD');
console.log('startTime,endTime',endTime,startTime,endTime2,startTime2);

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
    dataIndex: 'site_name',
    width: 90,
    key:'1',
    className: style.siteBox,
    render: (text, record,index) => {
      return <a onClick={(e) => { e.preventDefault(); this.select_site2(record)}}>{text}</a>
    }
  }];
  sensorIDColumns=[ {
    title: '传感器信息',
    colSpan: 2,
    dataIndex: 'sensorID',
    width: 120,
    key:'2',
    className: style.sensorID,
    render: (text, record,index) => {
      return <a onClick={(e) => { e.preventDefault(); this.getDeviceData('rowChoose',text,record)}}>{text}</a>
    }
  },
    {
      width: 70,
      key:'3',
      className: style.sensorID,
      render: (index,record,text)=>{
          return record.sensorID!='全部'?<Button size='small' onClick={() => {store.initialize_modal.visible = true;store.sensorID=record.sensorID}}>初始化</Button>:''
      }
    }];
  workColumns = [{
    title: '状态',
    dataIndex: 'deviceState',
    width: 120,
    key:'01',
  }, {
    title: '倾角',
    dataIndex: 'angle',
    width: 90,
    key:'02',
  }, {
    title: 'X轴倾角',
    dataIndex: 'angle_x',
    width: 90,
    key:'03',

  }, {
    title: 'Y轴倾角',
    dataIndex: 'angle_y',
    width: 90,
    key:'04',

  },{
    title: '高度',
    dataIndex: 'height',
    width: 90,
    key:'05',

  },  {
    title: '偏移距离',
    dataIndex: 'angle_range',
    width: 90,
    key:'06',

  }, {
    title: '日期',
    dataIndex: 'create_time',
    width: 150,
    key:'08',
  }, ];

  getOption2;

  render() {
    this.getOption2=(title, series)=>{
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
        },dataZoom: [{
          show: true,
          start: 10,
          end: 15,
          realtime: true
        }, {
          type: 'slider'
        }],
        series: series
      }
    };
    var arr = [];
    let {
      alarm_modal,
      initialize_modal,
      realtimeData,
      basicMsg,
      initialParams,
      months_data,
      fetchList,
      sensorID_data,
      initialData
    } = store;
    let {
      site_id,
      site_name,
      site_address,
      tower_hight,
      alert_phone,
      alert_distance,
      company_id,
      site_longitude,
      site_latitude
    } = basicMsg;

    return (
        <Fragment>
          <Breadcrumb>
            <Breadcrumb.Item>监控页</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={3} >
            <Col span={5} style={{ height: 1030, zIndex: 5 }}>
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
                <Table dataSource={fetchList} columns={this.columns} rowKey={(record,index) => index} size='small' style={{width:'100%',fontSize:'10px',tableLayout:'fixed',overflow:'hidden' }} />
              </Card>
            </Col>
            <Col>
              <Row gutter={3}>
                <Col span={5} style={{ height: 600 }}>
                  <Card title='基本信息' style={{ height: 360 }}>
                   {/* <h4>IMEI: <span className={style.basicMessage}>{imei}</span></h4>*/}
                    <h4>站名: <span className={style.basicMessage}>{site_name}</span></h4>
                    <h4>站点地址: <span className={style.basicMessage}>{site_address}</span></h4>
                    <h4>经纬度: <span className={style.basicMessage}>({site_longitude},{site_latitude})</span></h4>
                    <h4>铁塔高度: <span className={style.basicMessage}>{tower_hight}</span></h4>
                    <h4>距离警报指数: <span className={style.basicMessage}>{alert_distance}</span></h4>
                    <h4>警报电话: <span className={style.basicMessage}>{alert_phone}</span></h4>
                   {/* <h4>创建时间: <span className={style.basicMessage}>{create_time}</span></h4>*/}
                    <h4>警报功能设置
                      <Button size='small' type='primary' style={{ float: 'right' }} onClick={() => {
                        alarm_modal.visible = true
                      }}>编辑</Button>
                    </h4>
                  </Card>
                  <Card style={{marginTop:10,height:220}}>
                    <Table
                        dataSource={sensorID_data}
                        columns={this.sensorIDColumns}
                        rowKey={(record,index)=>index}
                        size='small'
                        pagination={false}
                        style={{height:'100%',overflow:'hidden'}}
                    />
                  </Card>
                    </Col>
                <Col span={13} style={{ marginBottom: 12 }} style={{ height: 180, marginBottom: 10 }}>
                  <Card title='实时工作状态' style={{ height: "100%" }}
                        extra={<div>最近一次更新：{realtimeData!={}?realtimeData.create_time:''}</div>}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>倾角</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>x轴倾角</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>y轴倾角</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>高度</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>偏移距离</span></div>
                     {/* <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}><span>方差</span></div>*/}
                    </div>
                    <div style={{ display: 'flex', marginTop: 10, alignItems:'center' }}>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData!={}?realtimeData.angle:''}°</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData!={}?realtimeData.angle_x:''}°</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData!={}?realtimeData.angle_y:''}°</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData!={}?realtimeData.height:''}m</span></div>
                      <div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{realtimeData!={}?realtimeData.angle_range:''}cm</span></div>
                      {/*<div style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'green' }}><span>{''}cm</span></div>*/}

                    </div>
                  </Card>
                </Col>
                <Col span={13} style={{ height: 400 }}>

                  <Card title='本月工作情况' style={{ height: "100%" }}
                        extra={<Link to={'/historyStatus'}>历史工作情况</Link>} >
                    <Table columns={this.workColumns} dataSource={months_data} size={"small"} pagination={false} scroll={{ y: 200 }} rowKey={(record,index)=>index} />
                  </Card>
                </Col>
                <Col span={18} style={{ marginTop: 10, height: 420 }}>
                  <Card style={{ height: '100%' }} bordered={false} bodyStyle={{ padding: '0 0 32px 0' }}>
                    {/* <ReactEcharts option={this.getOption()} style={{ width: '100%' }} notMerge={true} lazyUpdate={true} ></ReactEcharts>*/}
                    <Tabs size='large' tabBarExtraContent={<div>日期:{realtimeData!={}?realtimeData.create_time:''}</div>}>
                      <TabPane tab="倾角图" key="1">
                        <div style={{ padding: '0 24px', marginTop: 10 }}>
                          <ReactEcharts option={this.getOption2('倾角图',store.series)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                        </div>
                      </TabPane>
                      {/*<TabPane tab="电池电压图" key="2">
                        <div style={{ padding: '0 24px', marginTop: 10 }}>

                        </div></TabPane>*/}
                      <TabPane tab="工作温度图" key="3">
                        <div style={{ padding: '0 24px', marginTop: 10 }}>
                          <ReactEcharts option={this.getOption2('工作温度图',store.series3)} style={{width: '100%'}} notMerge={true} lazyUpdate={true} />
                        </div></TabPane>
                    </Tabs>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <EditAlarm props={alarm_modal} params={basicMsg} initialDatas={initialData} />
          <IntializeModal
              props={initialize_modal}
              params={basicMsg}
              date={initialParams} />
          <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
        </Fragment>
    )
  }

  componentWillMount() {
    this.getDevicesList();
  }
  componentDidMount(){
    this.getOption2('倾角图',store.series);
    this.getOption2('工作温度图',store.series3)
  };
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
  };
  //传感器信息
  select_tower=(site_id,lineData)=>{
    request({
      url: 'api/select_tower',
      method:'GET',
      data:{
        site_id:site_id,
        page:'1',
        size:'30'
      },
      success: ({
                  data
                }) => {
        console.log('api/select_tower',site_id,data);
        store.sensorID_data=[{sensorID:'全部'}];
        let dataSource=store.sensorID_data.concat(data);
        store.sensorID_data =dataSource;
        console.log('sensorID_data',dataSource,store.sensorID_data);
        this.getDeviceData('sensorID',store.sensorID_data[1].sensorID);//初始传感器历史数据
     }
    });
  };
  onBlur=()=>{
    store.search=[]
  };
  handleSearch = (value) => {
    this.getDevicesList(value);
  };
  onSelect=(value)=> {
    console.log('onSelect', value);
    this.getDevicesList(value);
    store.search=[]
  };

  //站名列表
  getDevicesList = (key) => {
    let data={};
    if(key){
      data={
        site_name:key
      }
    }
    request({
      /*url: 'api/show_sensor_list',*/
      url:'api/select_site',
      method: 'GET',
      data,
      success: ({
                  data
                }) => {

        if(key){
          console.log('模糊搜索数据',key,data);
          let siteValue = data.map(v => v.site_name);
          store.siteValue = siteValue;

          store.search= store.siteValue.filter(function (item) {
            //遍历数组，返回值为true保留并复制到新数组，false则过滤掉
            return item.includes(key);
          });
        }
        store.fetchList = data;//站名列表
        store.site_id=data[0].site_id;
        store.basicMsg = data[0];//站点基本信息
        this.select_tower(store.site_id,'1');//传感器信息(sensorID)
        console.log('show_sensor_list',data);
        //this.getDeviceData('site_id',data[0].site_id);//传感器历史数据
        console.log('获取倾角图数据');
        this.firstLine(store.site_id);
      }
    })
  };

  //获取折线图初始
  firstLine=(site_id)=>{
    request({
      url:'api/show_data_list',
      method:'GET',
      data: {
        site_id,
        startTime:startTime2,
        endTime:endTime2,
      },
      success: ({
                  data
                }) => {

        console.log('获取倾角图数据');
        let arr=this.filterData(data,'machine_site_id','sensorID');
        console.log('arr',arr);
        this.getAngle(arr);
        this.getTemperature(arr);
      }
    })
  };
  //传感器历史数据
  getDeviceData = (type,key,record) => {
    let data={};
    if(type=='site_id'){
      data={
        site_id:key,
        startTime:startTime2,
        endTime:endTime2,
        page:'1',
        size:'30'
      }
    }else if(type=='machine_site_id'){
      data={
        machine_site_id:key,
        startTime:startTime2,
        endTime:endTime2,
        page:'1',
        size:'30'
      }
    }else if(type=='sensorID'){
      data={
        sensorID:key,
        startTime:startTime2,
        endTime:endTime2,
        page:'1',
        size:'30'
      }
    }
    else if(type=='rowChoose'){
      if(key=='全部'){
        data={
          site_id:store.site_id,
          startTime:startTime2,
          endTime:endTime2,
          page:'1',
          size:'30'
        }
      }else{
        data={
          sensorID:key,
          startTime:startTime2,
          endTime:endTime2,
          page:'1',
          size:'30'
        }
      }
    }
      request({
        url:'api/show_data_list',
        method:'GET',
        data: data,
        success: ({
                    data
                  }) => {
          console.log("哈哈哈",key,data);
          if(data.length>0){
            store.realtimeData = data[0];
            store.months_data = data.slice(0,30);
            store.machine_site_id=data[0].machine_site_id;
          }else{
            store.realtimeData ={};
            store.months_data = [];
            store.machine_site_id='';
          }
        //let arr=this.filterData(store.months_data,'machine_site_id','sensorID');
        //   if(type=='site_id' || type=='rowChoose'){
        //     console.log('获取倾角图数据');
        //     let arr=this.filterData(data,'machine_site_id','sensorID');
        //     this.getAngle(arr);
        //     this.getTemperature(arr);
        //   }

        }
      })
  };
  //选择站名
  select_site=(key)=>{
    request({
      url:'api/select_site',
      method:'GET',
      data: {
        site_id:key
      },
      success: ({
                  data
                }) => {
        console.log("选择站名",key,data);
        store.site_id=data[0].site_id;
        store.basicMsg = data[0];
        this.getDeviceData('site_id',data[0].site_id);//初始数据
        this.select_tower(store.site_id);
      }
    })
};
  select_site2=(record)=>{
    console.log('选择站名','record',record,record.site_name);
    store.site_id=record.site_id;
    store.basicMsg = record;
    this.firstLine(store.site_id);
    this.select_tower(store.site_id);
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
    let filterArr=[];
    arr.map((item)=>{
      filterArr.push({
        name:item.sensorID,
        type:'line',
        stack: '总量',
        data:item.data.map(item=>item.angle)
      })
    });
    console.log('store.series',store.series,arr);
    store.series=filterArr;
    store.echartsData=arr.map(item=>item.sensorID);
    store.echartsXData=arr[0].data.map(item=>item.create_time)
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
    store.series3=filterArr;
    store.echartsData=arr.map(item=>item.sensorID);
    store.echartsXData=arr[0].data.map(item=>item.create_time)
  };

   getOption = () => {
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
         start: 10,
         end: 20,
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
   };
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
        start: 10,
        end: 20,
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
  };
}


export default Form.create()(Monitor)
