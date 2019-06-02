import React ,{Component,Fragment} from 'react';
import {Input, Button, Table, Pagination,Card,Select} from 'antd';
import AddDevice from './addDevice'
import store from "../store";
import { observer } from 'mobx-react';

const Option = Select.Option;
const Search = Input.Search;
const selectBefore = (
    <Select defaultValue='IMEI' style={{ width: 90 }}>
        <Option value='IMEI'>IMEI</Option>
        <Option value='IMSI'>IMSI</Option>
        <Option value='ID'>ID</Option>
    </Select>
);

const columns = [{
    title: 'IMEI',
    dataIndex: 'imei',
}, {
    title: 'IMSI',
    dataIndex: 'imsi',
}, {
    title: '公司名',
    dataIndex: 'company',
},{
    title: 'ID',
    dataIndex: 'id',
},{
    title: '注册时间',
    dataIndex: 'time',
},{
    title: '注册状态',
    dataIndex: 'status',
}
];
@observer
export default class RegistrationStatus extends Component{
    render(){
        return(
            <Fragment>
                {/*<span style={{display:'relative',height:'30px'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>显示传感器注册状态</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button
                        type='primary'
                        style={{}}
                        onClick={()=>store.addDevice_modal.visible=true}
                    >添加设备
                    </Button>
                </span>*/}
                <Card
                    title="显示传感器注册状态"
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
                        <Select defaultValue='注册状态（全部）' onChange={this.handleChange1}>
                            <Option value='注册状态（全部）'>注册状态（全部）</Option>
                            <Option value='注册成功'>注册成功</Option>
                            <Option value='注册失败'>注册失败</Option>
                        </Select>

                        <Search
                            addonBefore={selectBefore}
                            placeholder="请输入搜索内容"
                            onSearch={value => console.log(value)}
                            enterButton
                            style={{width:'40%',marginLeft:'20px'}}
                        />
                    </div>
                    <Table dataSource={store.reStatus_data} columns={columns} rowKey={record=>record.id} />

                    <Pagination
                        size='small'
                        style={{margin:'150px 20% 20px'}}
                        total={90} showTotal={total => `总共 ${total} 条`}
                        onChange={this.onPageChange}
                        showSizeChanger showQuickJumper
                        />
                </Card>
                <AddDevice props={store.addDevice_modal}/>
            </Fragment>
        );
    }
    handleChange1=()=>{
        console.log('handleChange1')
    };
    handleChange2=()=>{
        console.log('handleChange2')
    };
    componentDidMount(){
        /*请求dataSouse*/
    };

}