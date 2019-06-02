import React, {Component, Fragment} from 'react';
import { Card, Table, DatePicker, Pagination , Breadcrumb } from 'antd';
import request from '../../../helpers/request';
import store from '../store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const now = new Date();
now.setDate(1);
var startTime = moment(now).format('YYYY-MM-DD');
now.setMonth(now.getMonth() + 1);
now.setDate(now.getDate() - 1);
var endTime = moment(now).format('YYYY-MM-DD');

const state_type = ['', '正常', '停用'];
const ini_state = ['', '成功', '待处理'];

const { RangePicker} = DatePicker;
const alarm_type = ['正常', '报警'];



/*const url = 'getHistoryDataByInterval.shtml?equipmentId=868744034584411&startTime=2018-07-01&endTime=2018-09-05'*/

/*messageType*/
const columns = [
  {
    title:'日期',
    dataIndex:'create_time',
    key:'create_time',
    sorter: (a, b) => a.date - b.date
  },
  {
    title:'状态',
    dataIndex:'deviceState',
    key:'deviceState'
  },
  {
    title:'倾角',
    dataIndex:'angle',
    key:'angle',
  },
  {
    title:'X轴倾角',
    dataIndex:'angle_x',
    key:'angle_x'
  },
  {
    title: 'Y轴倾角',
    dataIndex: 'angle_y',
    key:'angle_y',
  },
  {
    title:'高度',
    dataIndex:'height',
    key:'height'
  },
  {
    title:'偏移距离',
    dataIndex:'angle_range',
    key:'angle_range'
  },{
    title:'方差',
    dataIndex:'variance',
    key:'variance'
  },
  {
    title:'平均电池电压',
    dataIndex:'deviceVoltage',
    key:'deviceVoltage'
  },
  {
    title:'平均工作温度',
    dataIndex:'deviceTemperature',
    key:'deviceTemperature'
  },
  {
    title:'操作',
    render: (text, record,index) => {
      return (
          <Fragment>
            <Link to='/detail'>详情</Link>
            {/* <Link to={{ pathname: '/detail/'+store.currentImei, state: { status: record.messageType,angle_x:record.angle_x,angle_y:record.angle_y,angle_range:record.angle_range}}}>详情</Link>
     */} </Fragment>
      )}
  }
];

@observer
class HistoryStatus extends Component{
  constructor(props){
    super(props);
    this.state={
      pages:1
    }
  }
  render(){
    let { history_data } = store;
    return(
        <Fragment>
          <Breadcrumb>
            <Breadcrumb.Item> <Link to='/monitor'>监控页</Link> </Breadcrumb.Item>
            <Breadcrumb.Item>历史工作情况</Breadcrumb.Item>
          </Breadcrumb>
          <Card>
            <div style={{marginBottom:10}} >选择日期：<RangePicker /></div>

            <Table columns={columns} dataSource={history_data} pagination={false} rowKey={record=>record.angle_y+record.angle_x}  onRow={(record,index) => {
              return {
                onClick: () => {
                  console.log(record.angle_x,index);
                  store.details= {
                    create_time:record.create_time,
                    deviceState:record.deviceState,
                    angle:record.angle,
                    angle_x:record.angle_x,
                    angle_y:record.angle_y,
                    height:record.height,
                    angle_range:record.angle_range,
                    variance:record.variance,
                    deviceVoltage:record.deviceVoltage,
                    deviceTemperature:record.deviceTemperature
                  };
                  console.log(store.details)
                }
              };
            }}
            />
            <Pagination
                style={{margin:'100px 20% 20px'}}
                total={90} showTotal={total => `总共 ${total} 条`}
                showSizeChanger showQuickJumper
                size='small'
                onChange={this.onPageChange}/>

          </Card>
          <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
        </Fragment>
    )
  }
  getDevicesList = () => {
    request({
      url: 'api/show_sensor_list',
      success: ({
                  data
                }) => {

        let imei = data[0].imei;
        this.getDataList(imei);
        console.log("imei获取成功",imei);
        store.currentImei=imei;
      }
    })
  };

  getDataList = (imei) => {
    store.currentImei=imei;
    request({
      url: 'api/show_data_list',
      data: {
        imei,
        startTime,
        endTime,
        page:this.state.pages,
        size: 31
      },
      success: ({
                  data
                }) => {
        console.log("data成功",data);
        store.history_data = data;

      }
    })
  };
  onPageChange = (page,pagination) => {
    console.log("页数获取成功",page);
    console.log('params', pagination);
    this.setState({
      pages: page,
    },()=>{console.log("page更新成功",this.state.pages)});
    this.getDevicesList();
  };
  /*function onChange(pagination, filters, sorter)  {
    console.log('params', pagination, filters, sorter);
  }*/
  componentWillMount(){
    this.getDevicesList();
    console.log("组件更新了")
  }
}

export default HistoryStatus