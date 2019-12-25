import React ,{Component,Fragment} from 'react';
import {Form,Button,Modal,Input,AutoComplete} from 'antd';
import store from '../store';
import { observer } from 'mobx-react';
import CommonModalConfig from "./../../../common/common-modal";
import CommonFormConfig from "./../../../common/common-form";
import request from "../../../helpers/request";

@observer
class AddDevice extends Component{
    state={
      company_id:''
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                <Modal
                    title="添加设备"
                    {...CommonModalConfig}
                    visible={store.addDevice_modal.visible}
                    onOk={()=>{this.handleSetCode()}}
                    onCancel={()=>store.addDevice_modal.visible=false}
                    footer={[
                        <Button key="submit" type="primary" onClick={()=>{this.handleOk()}}>确定</Button>,
                        <Button key="back" type="primary" onClick={()=>store.addDevice_modal.visible=false}>取消</Button>
                    ]}
                >
                    <Form>
                        <Form.Item label='IMEI：' {...CommonFormConfig}>
                            {getFieldDecorator('imei', {
                                rules: [{
                                    required: true, message: '请输入IMEI号',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label='IMSI：' {...CommonFormConfig}>
                            {getFieldDecorator('imsi', {
                                rules: [{
                                    required: true, message: '请输入IMSI号',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label='sensorID：' {...CommonFormConfig}>
                            {getFieldDecorator('sensorID', {
                                rules: [{
                                    required: true, message: '请输入sensorID',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label='公司名：' {...CommonFormConfig}>
                            {getFieldDecorator('company_name', {
                                rules: [{
                                    required: true, message: '请输入公司名',
                                }],
                            })(
                                <AutoComplete
                                    dataSource={store.companyArr}
                                    onSelect={(value)=>this.onSelect(value)}
                                    onSearch={this.handleSearch}
                                    allowClear={true}
                                    style={{ marginBottom: 5 ,width:'100%'}}
                                >
                                <Input />
                                </AutoComplete>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
    handleOk=()=>{
        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        console.log('添加机器',values);
        let data={
          ...values,
          ...this.state,
        };
        console.log('添加',data);
        request({
            url: 'api/add_machine',
            data,
            success: (res) => {
                console.log('传过去的values',values,res)
            },
            complete: () => {
                //这里应该从新请求更新页面
                this.props.gotoFather();
            }
        });
        store.addDevice_modal.visible=false
    };
    handleSearch=(value)=>{
        request({
            url: 'api/select_machine',
            method:'GET',
            data:{
                company_name:value
            },
            success: ({
                          data
                      }) => {
                console.log('搜索',data);
                    store.companyData=data.map(item=>item.company_name);
                    let arr=this.filterArr(store.companyData);
                    console.log('arr',arr,typeof arr,store.companyData);
                    store.companyArr=arr;

            }
        });
    };
    onSelect=(value)=>{
        let _this=this;
        console.log('选中',value);
        store.companyArr=[];
        request({
            url: 'api/select_machine',
            method:'GET',
            data:{
                company_name:value
            },
            success: ({
                          data
                      }) => {
                _this.setState({
                    company_id:data[0].company_id
                })
                console.log('company_id',_this.state.company_id);
            }
        });
    };

    filterArr=(arr)=>{
        console.log('筛选数据');
        return Array.from(new Set(arr));
    };
}

export default Form.create()(AddDevice);
