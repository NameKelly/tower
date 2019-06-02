import React, {Component, Fragment} from 'react';
import { Card,Tabs, Breadcrumb,LocaleProvider  } from 'antd';
import moment from 'moment';
import style from './detail.css';
import Charts from 'ant-design-pro/lib/Charts';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import request from "../../../../helpers/request";
import store from "../../store";

const { TimelineChart } = Charts;
const TabPane = Tabs.TabPane;
const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y: Math.floor(Math.random() * 10),
  });
}

export default class Detail extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let currentUrl=window.location.href+toString();
    let arrayUrl=currentUrl.split('/');
    let currentImei=arrayUrl[arrayUrl.length-1]

    console.log('currentImei',currentImei);
    /*this.getDataList(currentImei)*/
  }
  /*getDataList=(imei)=>{
      request({
          url:'api/show_data_list',
          data:{
              imei,//参数未完整
          },
          success:({
              data
          })=>{
              console.log('alldata',data)
          }
      })
  };*/
  render(){
    return(
        <Fragment>
          <Breadcrumb>
            <Link to='./monitor'><Breadcrumb.Item>监控页</Breadcrumb.Item></Link>
            <Link to='/historyStatus/'><Breadcrumb.Item>历史工作情况</Breadcrumb.Item></Link>
            <Breadcrumb.Item>详情</Breadcrumb.Item>
          </Breadcrumb>
          <Card style={{marginBottom:15}}>
            <div>
              <h2>日期：{store.details.create_time}</h2>
              <div style={{ marginTop: 15 }}>
                <span className={style.contentBody}>状态：<span className={style.content}>{store.details.state}</span></span>
                <span className={style.contentBody}>倾角：<span className={style.content}>{store.details.angle}</span></span>
                <span className={style.contentBody}>X轴倾角：<span className={style.content}>{store.details.angle_x}</span></span>
                <span className={style.contentBody}>Y轴倾角：<span className={style.content}>{store.details.angle_y}</span></span>
                <span className={style.contentBody}>高度：<span className={style.content}>{store.details.height}</span></span>
                <span className={style.contentBody}>偏移距离：<span className={style.content}>{store.details.angle_range}</span></span>
                <span className={style.contentBody}>方差：<span className={style.content}>{store.details.variance}</span></span>
                <span className={style.contentBody}>平均电池电压：<span className={style.content}>{store.details.deviceVoltage}</span></span>
                <span className={style.contentBody}>平均工作温度：<span className={style.content}>{store.details.deviceTemperature}</span></span>
              </div>
            </div>
          </Card>
          <Card>
            <Tabs size='large'>
              <TabPane tab="倾角图" key="1">
                <div style={{ padding: '0 24px', marginTop: -30 }}>
                  {/*<TimelineChart
                  height={300}
                  data={chartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />*/}
                </div>
              </TabPane>
              <TabPane tab="电池电压图" key="2">
                <div style={{ padding: '0 24px', marginTop: -30 }}>
                  {/*<TimelineChart
                  height={300}
                  data={chartData}
                  titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />*/}
                </div></TabPane>
              <TabPane tab="工作温度图" key="3">
                <div style={{ padding: '0 24px', marginTop: -30 }}>
                  {/* <TimelineChart
                    height={300}
                    data={chartData}
                    titleMap={{ y1: '客流量', y2: '支付笔数' }}
                />*/}
                </div></TabPane>

            </Tabs>
          </Card>
          <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
        </Fragment>
    )
  }
}