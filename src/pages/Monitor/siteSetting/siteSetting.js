import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Input, Select, Table,Modal,Form} from 'antd';
import store from "../store";
import { observer } from 'mobx-react';
import CommonFormConfig from "../../../common/common-form";
import AddSiteModal from './addSiteModal'
import request from "../../../helpers/request";

const FormItem=Form.Item;
const Search=Input.Search;
const Option=Select.Option;
const selectBefore = (
    <Select defaultValue="站名" style={{ width: 90 }}>
        <Option value="站名" key='siteName'>站名</Option>
        <Option value="站址编码" key='siteCode'>站址编码</Option>
        <Option value="铁塔类型" key='towerType'>铁塔类型</Option>
        <Option value="地址" key='addr'>地址</Option>
        <Option value="代维公司" key='company'>代维公司</Option>
    </Select>
);

@observer
class SiteSetting extends Component{
    state={
        dataSource:[]
    };
    request=()=>{
        request({
            url: 'api/select_sensor_site',
            success: (res) => {
                console.log('res.data',res.data);
                this.setState({
                    dataSource:res.data
                })
            }
        })
    };
    componentWillMount() {
        this.request();
    }

    render(){
        const {getFieldDecorator,getFieldsValue} = this.props.form;
        const columns = [
            {
                title:'站名',
                dataIndex:'site',
                sorter: (a, b) => a.date - b.date
            },
            {
                title:'站址编码',
                dataIndex:'site_code',
            },
            {
                title:'铁塔类型',
                dataIndex:'tower_type',
            },
            {
                title:'地址',
                dataIndex:'addr',
            },
            {
                title: '备注',
                dataIndex: 'remarks',
            },
            {
                title:'代维公司',
                dataIndex:'company',
            },
            {
                title:'操作',
                render: (text, record,index) => {
                    return (
                        <Fragment>
                            <a onClick={()=>this.handleChange(text, record,index)}>修改</a>
                            <span style={{margin:'0 2px'}}>|</span>
                            <a style={{color:'red'}} onClick={()=>this.handleDelete(record.id)}>删除</a>
                        </Fragment>
                    )}
            }
        ];
        return(
            <Card
                title='站点设置'
                extra={<span>
                    <Button type='primary' style={{marginRight:'10px'}}>批量添加</Button>
                    <Button type='primary' onClick={()=>store.addSite_modal.visible=true}>添加</Button>
                </span>}
            >
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
                    dataSource={this.state.dataSource}
                    pagination={true}
                    bordered
                    rowKey={record => record.site_code}
                />
                <Modal
                    title="站名设置"
                    visible={store.siteSetting_modal.visible}
                    onOk={this.modalOk}
                    onCancel={()=> store.siteSetting_modal.visible=false}
                >
                    <Form>
                        <FormItem label='站名' {...CommonFormConfig}>
                            {getFieldDecorator('site',{
                                    initialValue:store.siteSetting_modal.data.site,
                                    rules:[
                                        {required: true,message:'请输入站点名'}
                                    ]
                                })(
                                    <Input/>
                                )}
                        </FormItem>
                        <FormItem label='站址编码' {...CommonFormConfig}>
                            {getFieldDecorator('site_code',{
                                initialValue:store.siteSetting_modal.data.site_code,
                                rules:[
                                    {required: true,message:'请输入站址编码'}
                                ]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='铁塔类型' {...CommonFormConfig}>
                            {getFieldDecorator('tower_type',{
                                initialValue:store.siteSetting_modal.data.tower_type,
                                rules:[
                                    {required: true,message:'请输入铁塔类型'}
                                ]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='地址' {...CommonFormConfig}>
                            {getFieldDecorator('addr',{
                                initialValue:store.siteSetting_modal.data.addr,
                                rules:[
                                    {required: true,message:'请输入地址'}
                                ]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='备注' {...CommonFormConfig}>
                            {getFieldDecorator('remarks',{
                                initialValue:store.siteSetting_modal.data.remarks,
                                rules:[
                                    {required: true,message:'请输入备注'}
                                ]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='代维公司' {...CommonFormConfig}>
                            {getFieldDecorator('company',{
                                initialValue:store.siteSetting_modal.data.company,
                                rules:[
                                    {required: true,message:'请输入公司'}
                                ]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <AddSiteModal props={store.addSite_modal}/>
            </Card>
        );
    }
    handleChange=(text, record,index)=>{
        console.log('text, record,index',text, record,index);
        store.siteSetting_modal.visible=true;
        store.siteSetting_modal.data=record;
    };
    handleDelete=(deleteId)=>{
        var _this=this;
    Modal.confirm({
        title: '确认删除该站名？',
        onOk() {
            console.log('OK');
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
                    _this.request();
                }
            })
        },
        onCancel() {
            console.log('Cancel');
        },
    })
    };

    //修改数据并传值给后台
    modalOk=()=>{
        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        console.log('getFieldsValue',values);
        store.siteSetting_modal.visible=false;
        request({
            url: 'api/update_site',
            data: {
                site:values.site,
                site_code:values.site_code,
                tower_type:values.tower_type,
                addr:values.addr,
                company:values.company
            },
            success: (res) => {
                console.log(res);
                console.log('传过去的values',values)
            },
            complete: () => {
                //这里应该从新请求更新页面
                this.request();
            }
        })

    };

}
export default Form.create()(SiteSetting);