import React, {Component, Fragment} from 'react';
import { Card, Table, DatePicker, Breadcrumb } from 'antd';
import request from '../../../helpers/request';
import store from '../store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const { RangePicker} = DatePicker;
const columns=[
    {
        title:'操作类型',
        dataIndex:'type',
        key:'type'
    },{
        title:'详情',
        dataIndex:'detail',
        key:'detail'
    },{
        title:'操作时间',
        dataIndex:'time',
        key:'time'
    }

];


@observer
export default class AdministratorDetails extends Component{
    render(){
        return(
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>管理员详情</Breadcrumb.Item>
                </Breadcrumb>
                <Card style={{marginBottom:15}} title='本月工作情况'>
                    <span>管理员姓名：测试</span>
                    <span style={{marginLeft:50}}>所属部门：测试</span>
                </Card>
                <Card title='操作日志'>
                    <div style={{marginBottom:10}} >选择日期：<RangePicker /></div>
                    <Table columns={columns} dataSource={store.admin_data} pagination={false} rowKey=''/>

                </Card>
                <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
            </Fragment>

        );//render
    }
   /* getAdminList = () => {
        request({
            url: '',
            success: ({
                          data
                      }) => {
                store.admin_data = data;

            }
        })
    };
    componentWillMount(){
        this.getAdminList();
    }    */
}