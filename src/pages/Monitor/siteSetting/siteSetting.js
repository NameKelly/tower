import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Input, Select, Table,Modal,Form} from 'antd';
import store from "../store";
import { observer } from 'mobx-react';
import CommonFormConfig from "../../../common/common-form";
import AddSiteModal from './addSiteModal'
import  UpdateSiteModal from './updateSiteModal.js'
import request from "../../../helpers/request";

const FormItem=Form.Item;
const Search=Input.Search;
const Option=Select.Option;

@observer
class SiteSetting extends Component{
    state={
        dataSource:[],
        selectValue: 'site_name',
        searchValue:'',
        getData:{}
    };
    getData=(key)=>{
        let data={};
        if (key){
            data=key
        }
        request({
            url: 'api/select_site',
            method:'GET',
            data,
            success: (res) => {
                console.log('res.data',res.data);
                this.setState({
                    dataSource:res.data
                })
            }
        })
    };
    componentWillMount() {
        this.getData();
    }

    render(){
        const selectBefore = (
            <Select defaultValue="站名" style={{ width: 90 }} onChange={this.selectChange}>
                <Option value="site_name" key='siteName'>站名</Option>
                <Option value="site_address" key='addr'>地址</Option>
                <Option value="site_id" key='site_id'>站点编码</Option>
                <Option value="tower_type" key='tower_type'>铁塔类型</Option>
                <Option value="maintain_company" key='company'>代维公司</Option>
            </Select>
        );
        const {getFieldDecorator,getFieldsValue} = this.props.form;
        const columns = [
            {
                title:'站名',
                dataIndex:'site_name',
                fixed: 'left',
                sorter: (a, b) => a.date - b.date
            },
            {
                title:'站点地址',
                dataIndex:'site_address',
                align:'center'
            }, {
                title:'站点编码',
                dataIndex:'site_id',
            },
            {
                title:'铁塔类型',
                dataIndex:'tower_type',
            },
            {
                title:'经纬度',
                render:(record)=>{
                    return(
                        <span>({record.site_longitude} , {record.site_latitude})</span>
                    )
                }
            },
            {
                title: '铁塔高度',
                dataIndex: 'tower_hight',
            },
            {
                title: '警报距离',
                dataIndex: 'alert_distance',
            },
            {
                title: '警报电话',
                dataIndex: 'alert_phone',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
            },
            {
                title: '更新日期',
                dataIndex: 'update_date',
            },
            {
                title:'代维公司',
                dataIndex:'maintain_company',
            },
            {
                title:'操作',
                fixed: 'right',
                render: (text, record,index) => {
                    return (
                        <Fragment>
                            <a onClick={()=>this.handleChange(text, record,index)}>修改</a>
                            <span style={{margin:'0 2px'}}> | </span>
                            <a style={{color:'red'}} onClick={()=>this.handleDelete(record.site_id)}>删除</a>
                        </Fragment>
                    )}
            }
        ];
        return(
            <Card
                title='站点设置'
                extra={<span>
                    <Link to='/addSite'><Button type='primary' style={{marginRight:'10px'}}>批量添加</Button></Link>
                    <Button type='primary' onClick={()=>store.addSite_modal.visible=true}>添加</Button>
                </span>}
            >
                <div style={{width:'100%',textAlign:'center'}}>
                    <Search
                        addonBefore={selectBefore}
                        placeholder="请输入搜索内容"
                        onSearch={value => this.onSearch(value)}
                        enterButton
                        style={{ width: '30%',marginBottom:'10px'}}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={true}
                    bordered
                    size={'small'}
                    scroll={{ x: 1500 }}
                    rowKey={(record,index) =>index}
                />
               <UpdateSiteModal props={store.siteSetting_modal} getData={this.getData} info={this.state.getData}/>
                <AddSiteModal props={store.addSite_modal} getData={this.getData} info={this.state.getData}/>
            </Card>
        );
    }
    upLoadFile=(e)=>{
            e.preventDefault();//阻止元素发生默认行为
    };
    selectChange=(value)=>{
        this.setState({
            selectValue:value
        });
        console.log('selectChange',value);
    };
    onSearch=(value)=>{
        let key=this.state.selectValue;
        this.state.searchValue=value;
        let data={};
        data[key]=this.state.searchValue;
        this.state.getData=data;
        this.getData(data);
    };

    handleDelete=(deleteId)=>{
        var _this=this;
    Modal.confirm({
        title: '确认删除该站名？',
        onOk() {
            request({
                url: 'api/delete_site',
                data: {
                    id:deleteId
                },
                success: (res) => {
                    console.log(res);
                },
                complete: () => {
                    //这里应该从新请求更新页面
                    _this.getData(_this.state.getData);
                }
            })
        },
        onCancel() {
            console.log('Cancel');
        },
    })
    };

    //修改数据并传值给后台
    handleChange=(text, record,index)=>{
        console.log(text, record,index);
        store.siteSetting_modal.visible=true;
        store.siteSetting_modal.data=record;
    };

}
export default Form.create()(SiteSetting);
