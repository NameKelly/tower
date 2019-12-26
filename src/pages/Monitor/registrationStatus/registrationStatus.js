import React ,{Component,Fragment} from 'react';
import {Input, Button, Table, Pagination,Card,Select} from 'antd';
import AddDevice from './addDevice'
import store from "../store";
import { observer } from 'mobx-react';
import request from "../../../helpers/request";

const Option = Select.Option;
const Search = Input.Search;


@observer
export default class RegistrationStatus extends Component{
    state={
        selectValue:'imei'
    };
    render(){
        const columns = [{
            title: 'IMEI',
            dataIndex: 'imei',
        }, {
            title: 'IMSI',
            dataIndex: 'imsi',
        }, {
            title: 'sensorID',
            dataIndex: 'sensorID',
        },
            {
                title:'公司名称',
                dataIndex:'company_name'
            },{
                title: '注册时间',
                dataIndex: 'create_date',
            },{
                title: '更新时间',
                dataIndex: 'update_date',
            },{
                title: '操作',
                render:(record,index)=>{
                    return(
                        <Fragment>
                           {/* <a onClick={()=>this.handleChange(record)}>修改</a>
                            <span style={{margin:'0 2px'}}> | </span>*/}
                            <a style={{color:'red'}} onClick={()=>this.handleDelete(record)}>删除</a>
                        </Fragment>
                    )
                }
            }
        ];
        const selectBefore = (
            <Select defaultValue='IMEI' style={{ width: 90 }} onChange={this.selectChange}>
                <Option value='imei'>IMEI</Option>
                <Option value='sensorID'>sensorID</Option>
                {/*<Option value='id'>ID</Option>*/}
                <Option value='company_name'>公司名</Option>
            </Select>
        );
        return(
            <Fragment>
                <Card
                    title="传感器管理"
                    extra={
                        <Button
                            type='primary'
                            style={{}}
                            onClick={()=>store.addDevice_modal.visible=true}>
                            添加设备
                        </Button>
                    }
                >
                    <div style={{padding:'0 0 10px 0'}}>
                       {/* <Select defaultValue='注册状态（全部）' onChange={this.handleChange1}>
                            <Option value='注册状态（全部）'>注册状态（全部）</Option>
                            <Option value='注册成功'>注册成功</Option>
                            <Option value='注册失败'>注册失败</Option>
                        </Select>*/}
                        <Search
                            addonBefore={selectBefore}
                            placeholder="请输入搜索内容"
                            onSearch={value => this.onSearch(value)}
                            enterButton
                            style={{width:'40%',marginLeft:'20px'}}
                        />
                    </div>
                    <Table dataSource={store.reStatus_data.reverse()} columns={columns} rowKey={(record,index)=>index} />

                   {/* <Pagination
                        size='small'
                        style={{margin:'150px 20% 20px'}}
                        total={90} showTotal={total => `总共 ${total} 条`}
                        onChange={this.onPageChange}
                        showSizeChanger showQuickJumper
                        />*/}
                </Card>
                <AddDevice props={store.addDevice_modal} gotoFather={this.getData}/>
            </Fragment>
        );
    }
    handleDelete=(record)=>{
        console.log('record.machine_id',record.machine_id);
        request({
            url: 'api/delete_machine',
            data:{
                id:record.machine_id
            },
            success: ({
                          data
                      }) => {
                console.log('api/delete_machine',data);
                this.getData();
            }
        });
    };
    selectChange=(value)=>{
        this.setState({
            selectValue:value
        });
        console.log('selectChange',value);
    };
    onSearch=(value)=>{
        let key=this.state.selectValue;
        let data={};
        data[key]=value;
        console.log('onSearch',value,data);
        this.getData(data);
    };
    getData=(key)=>{
        let data={};
        if(key){
            data=key
        }
        request({
            url: 'api/select_machine',
            method:'GET',
            data,
            success: ({
                          data
                      }) => {
                console.log('api/select_machine',data);
                store.reStatus_data=data;
            }
        });
    };
    componentDidMount(){
        this.getData();
    };

}
