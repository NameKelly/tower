import React, {Component, Fragment} from 'react';
import {Table, Input, Breadcrumb, Select, Pagination,Card} from 'antd';
import { Link } from 'react-router-dom';
import request from '../../../helpers/request';
import store from '../store';
import { observer } from 'mobx-react';
import Revise from './Revise/revise';


const Search = Input.Search;
const Option = Select.Option;
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
        dataIndex:'tower_hight',
    },
    {
        title: '站名',
        dataIndex: 'site_name',
    },{
        title: '代维公司',
        dataIndex: 'maintain_company',
    },
    {
        title:'地址',
        dataIndex:'site_address',
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
   state={
       selectValue:'imei'
        };
    render(){
        const selectBefore = (
            <Select defaultValue="IMEI" style={{ width: 90 }} onChange={this.selectChange}>
                <Option value="imei" key='imei'>IMEI</Option>
                <Option value="imsi" key='imsi'>IMSI</Option>
                <Option value="site_name" key='site'>站名</Option>
                <Option value="site_address" key='addr'>地址</Option>
                <Option value="maintain_company	" key='maintain_company'>代维公司</Option>
            </Select>
        );
        return(
            <Fragment>
                {/*<Breadcrumb>
                    <Breadcrumb.Item>管理员审核</Breadcrumb.Item>
                </Breadcrumb>*/}
                <Card>
                    <div style={{width:'100%',textAlign:'center'}}>
                        <Search
                            addonBefore={selectBefore}
                            placeholder="请输入搜索内容"
                            onSearch={(value,event) => this.onSearch(value,event)}
                            enterButton
                            style={{ width: '30%',marginBottom:'10px'}}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={store.review_data}
                        pagination={true}
                        size={'small'}
                        rowKey={record => record.imsi}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    store.reviseMsg=record;
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
    onSearch=(value)=>{
        let key=this.state.selectValue;
        let data={};
        data[key]=value;
        console.log('onSearch',value,data);
        this.getData(data);
    };
    selectChange=(value)=>{
        this.setState({
            selectValue:value
        });
        console.log('selectChange',value);
    };
    getData=(key)=>{
        let data={};
        if(key){
            data=key
        }
        request({
            url: 'api/select_tower',
            method:'GET',
            data,
            success: (res) => {
                store.review_data=res.data;
                console.log('res',res);
            },
            complete: () => {

            }
        })
    };
    componentWillMount(){
        this.getData();
    }
}
