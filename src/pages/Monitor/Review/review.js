import React, {Component, Fragment} from 'react';
import {Table, Input, Breadcrumb, Select, Pagination,Card} from 'antd';
import { Link } from 'react-router-dom';
import request from '../../../helpers/request';
import store from '../store';
import { observer } from 'mobx-react';
import Revise from './Revise/revise';


const Search = Input.Search;
const Option = Select.Option;
const selectBefore = (
    <Select defaultValue="IMEI" style={{ width: 90 }}>
        <Option value="IMEI" key='imei'>IMEI</Option>
        <Option value="IMSI" key='imsi'>IMSI</Option>
        <Option value="sensorID" key='id'>sensorID</Option>
        <Option value="站名" key='site'>站名</Option>
        <Option value="地址" key='addr'>地址</Option>
    </Select>
);
const columns = [
    {
        title:'IMEI',
        dataIndex:'imei',
        sorter: (a, b) => a.date - b.date
    },
    {
        title:'IMSI',
        dataIndex:'imsi',
    },
    {
        title:'sensorID',
        dataIndex:'sensorID',
    },
    {
        title:'高度',
        dataIndex:'install_height',
    },
    {
        title: '站名',
        dataIndex: 'site',
    },
    {
        title:'地址',
        dataIndex:'addr',
    },
    {
        title:'操作',
        render: (text, record,index) => {
            return (
                <Fragment>
                    <a>修改</a>
                </Fragment>
            )}
    }
];

@observer
export default class Review extends Component{
    render(){
        return(
            <Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>管理员审核</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <div style={{width:'100%',textAlign:'center'}}>
                        <Search
                            addonBefore={selectBefore}
                            placeholder="请输入搜索内容"
                            onSearch={value => console.log(value)}
                            enterButton
                            style={{ width: '30%',marginBottom:'10px'}}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={store.review_data}
                        pagination={true}
                        size="small"
                        rowKey={record => record.imsi}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    store.reviewChange= {
                                        imei:record.imei,
                                        imsi:record.imsi,
                                        sensorID:record.sensorID,
                                        install_height:record.install_height,
                                        site:record.site,
                                        addr:record.addr
                                    };
                                    store.revise_modal.visible=true;
                                }
                            };
                        }}
                        >

                    </Table>
                    {/*<Pagination
                        style={{margin:'150px 20% 20px'}}
                        total={90} showTotal={total => `总共 ${total} 条`}
                        onChange={this.onPageChange}
                        showSizeChanger showQuickJumper
                        />*/}
                </Card>
                <Revise props={store.revise_modal} initialDatas={store.reviseData} params={store.reviseMsg}/>
                <div style={{height:'50px',lineHeight:'50px',textAlign:'center'}}>copyright© 五邑大学系统工程研究所</div>
            </Fragment>
        );
    }
    /*onPageChange=()=>{
        console.log('onPageChange');
    };*/
    componentWillMount(){
        request({
            url: 'api/select_install_data',
            success: (res) => {
                store.review_data=res.data;
                console.log('res',res);
            },
            complete: () => {

            }
        })
    }
}