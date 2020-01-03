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
var startTime2=moment(new Date()).subtract(30,'days').format('YYYY-MM-DD');
var endTime2 = moment(new Date()).format('YYYY-MM-DD');

const state_type = ['', '正常', '停用'];
const ini_state = ['', '成功', '待处理'];

const { RangePicker} = DatePicker;
const alarm_type = ['正常', '报警'];


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
            <div style={{marginBottom:10}} >
              选择日期：<RangePicker
                placeholder={[startTime2, endTime2]}
                onChange={this.DateChange}
            />
            </div>

            <Table
                columns={columns}
                dataSource={history_data}
                pagination={false}
                rowKey={(record,index)=>index}
                onRow={(record,index) => {
                  return {
                    onClick: () => {
                      console.log('record',record);
                      store.details= record;
                      console.log(store.details)
                    }
                  };
                }}
            />
            <Pagination
                style={{margin:'100px 20% 20px'}}
                total={store.total_num} showTotal={total => `总共 ${total} 条`}
                showSizeChanger showQuickJumper
                size='small'
                onChange={this.onPageChange}/>

          </Card>
          <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
        </Fragment>
    )
  }


  getDataList = () => {
    request({
      url: 'api/show_data_list',
      method:'GET',
      data: {
        machine_site_id:store.machine_site_id,
        startDate:startTime2,
        endDate:endTime2,
        page:this.state.pages,
        size: 10
      },
      success: (res) => {
        store.history_data = res.data;
        store.total_num=res.number;
        console.log("分页数据",res,typeof res,store.history_data,store.total_num);
      }
    })
  };
  onPageChange = (page,pagination) => {
    console.log("页数获取成功",page,pagination);
    this.setState({
      pages: page,
    },()=>{
      console.log("page改变",this.state.pages)});
    this.getDataList();
  };
  DateChange=(value, dateString)=>{
    startTime2=dateString[0];
    endTime2=dateString[1];
    this.getDataList();
    console.log('日期改变',value, dateString)
  };
  componentWillMount(){
    this.getDataList();
    console.log("组件更新了")
  }
}

export default HistoryStatus
