import React ,{Component} from 'react';
import { Modal, Form, Input,AutoComplete,Button,message} from 'antd';
import { observer } from 'mobx-react';
import store from '../../store';
import request from './../../../../helpers/request';
import CommonModalConfig from "./../../../../common/common-modal";
import CommonFormConfig from "./../../../../common/common-form";

const FormItem = Form.Item;

@observer
class Revise extends Component{
    setReviseData=(type)=>{
        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        let { imei,imsi,sensorID, tower_hight, site_name,site_address,maintain_company} = values;
        request({
            url: 'api/examine_tower',
            data: {
                id:store.reviseMsg.id,
                type:type,
            },
            success: (res) => {
                this.props.getData();
            },
            complete: () => {
                store.revise_modal.visible = false;
            }
        })
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        let { props, params } = this.props;
        let { visible } = props;

        return(
            <Modal
                onCancel={() => store.revise_modal.visible= false}
                visible={visible}
                title='传感器审核'
                {...CommonModalConfig}
                footer={[
                    <Button key="pass" type="primary" onClick={()=>this.setReviseData('通过')}>
                        通过
                    </Button>,
                    <Button key="noPass" type="primary" onClick={()=>this.setReviseData('不通过')}>
                        不通过
                    </Button>,
                    <Button key="cancel" onClick={() => store.revise_modal.visible= false}>
                        取消
                    </Button>,
                ]}
            >
                <Form>
                    <FormItem label='传感器IMEI：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('imei',{
                                rules: [{
                                    message: '传感器IMEI',
                                }],
                            })(
                                <Input placeholder={store.reviseMsg.imei} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label='传感器IMSI：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('imsi', {
                                rules: [{
                                    message: '请输入传感器IMSI',
                                }],
                            })(
                                <Input placeholder={store.reviseMsg.imsi} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label='sensorID：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('sensorID',{
                                rules: [{
                                    message: '请输入铁塔sensorID',
                                }],
                            })(
                                <Input disabled placeholder={store.reviseMsg.sensorID}/>
                            )
                        }
                    </FormItem>
                    <FormItem label='站名：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('site_name', {
                                rules: [{
                                    required: false, message: '请输入站名',
                                }],
                            })(
                                <AutoComplete
                                    dataSource={store.reviseSite_data}
                                    allowClear={true}
                                    onChange={(value)=>{this.filterData(value)}}
                                    style={{ marginBottom: 5 ,width:'100%'}}
                                    disabled
                                >
                                    <Input onChange={(e)=>{this.handleChangeSite(e)}} placeholder={store.reviseMsg.site_name}/>
                                </AutoComplete>
                            )
                        }
                    </FormItem>

                    <FormItem label='地址：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('site_address', {
                                rules: [{
                                    message: '请输入地址',
                                }],
                            })(
                                <Input placeholder={store.reviseMsg.site_address} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label='高度：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('tower_hight', {
                                rules: [{
                                    required: false, message: '请输入高度',
                                }],
                            })(
                                <Input  onChange={(e)=>{this.handleChangeHeight(e)}} placeholder={store.reviseMsg.tower_hight} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label='代维公司：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('maintain_company', {
                                rules: [{
                                    message: '请输入地址',
                                }],
                            })(
                                <Input placeholder={store.reviseMsg.maintain_company} disabled/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }

    handleChangeHeight=(e)=>{
        store.reviewChange.install_height=e.target.value;
        console.log('handleChangeHeight',store.reviewChange.install_height);
    };
    handleChangeSite=(e)=>{

    };
    filterData=(value)=>{
        request({
            url: 'api/select_site',
            method:'GET',
            data:{
                site_name:value,
            },
            success: (res) => {
                console.log('res',res,'res.data',res.data);
                let data=Array.from(res.data);
                console.log('是否为数组',data instanceof Array,data);
                let siteList=data.map(v=>v.site_name);
                let addrList=data.map(v=>v.site_address);

                store.reviseSite_data=siteList;
                store.reviseAddr_data=addrList;
            }
        });
        /*store.filter_data= store.reviseSite_data.filter(function (item) {
                   //遍历数组，返回值为true保留并复制到新数组，false则过滤掉

                  let inputValue=new RegExp(`(.*)(${value.split('').join(')(.*)(')})(.*)`, 'i');
                  return item.match(inputValue);
               });*/
        let index=store.reviseSite_data.indexOf(value);
        store.reviewChange.site=value;
        store.reviewChange.addr=store.reviseAddr_data[index];

    };

}
export default Form.create()(Revise);
