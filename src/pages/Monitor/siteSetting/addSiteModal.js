import React ,{ Component,Fragment } from 'react';
import { Modal,Form ,Input} from 'antd';
import store from "../store";
import CommonFormConfig from "../../../common/common-form";
import {observer} from "mobx-react";
import request from "../../../helpers/request";

const FormItem=Form.Item;

@observer
class AddSiteModal extends Component{
    constructor(props){
        super(props);
        console.log(this.props,'0000000000000000')
    }
    render(){
        let { props } = this.props;
        let { visible } = props;
        const {getFieldDecorator,getFieldsValue}=this.props.form;
        return(
            <Fragment>
                <Modal
                    title="站名设置"
                    visible={visible}
                    onOk={()=>{this.modalOk2()}}
                    onCancel={()=> store.addSite_modal.visible=false}
                >
                    <Form>
                        <FormItem label='站名' {...CommonFormConfig}>
                            {getFieldDecorator('site_name',{
                                initialValue:'',
                                rules:[
                                    {required: true,message:'请输入站点名'}
                                ]
                            })(
                                <Input placeholder='请输入站点名'/>
                            )}
                        </FormItem>
                        <FormItem label='站点地址' {...CommonFormConfig}>
                            {getFieldDecorator('site_address',{
                                initialValue:'',
                                rules:[
                                    {required: true,message:'请输入站点地址'}
                                ]
                            })(
                                <Input placeholder='请输入站点地址'/>
                            )}
                        </FormItem>
                        <FormItem label='站点编码' {...CommonFormConfig}>
                            {getFieldDecorator('site_id',{
                                initialValue:'',
                                rules:[
                                    {required: true,message:'请输入站点编码'}
                                ]
                            })(
                                <Input placeholder='请输入站点编码'/>
                            )}
                        </FormItem>
                        <FormItem label='铁塔类型' {...CommonFormConfig}>
                            {getFieldDecorator('tower_type',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入铁塔类型'}
                                ]
                            })(
                                <Input placeholder='请输入铁塔类型'/>
                            )}
                        </FormItem>
                        <FormItem label='站点经度' {...CommonFormConfig}>
                            {getFieldDecorator('site_longitude',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入站点经度'}
                                ]
                            })(
                                <Input placeholder='请输入站点经度'/>
                            )}
                        </FormItem>
                        <FormItem label='站点纬度' {...CommonFormConfig}>
                            {getFieldDecorator('site_latitude',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入站点纬度'}
                                ]
                            })(
                                <Input placeholder='请输入站点纬度'/>
                            )}
                        </FormItem>
                        <FormItem label='铁塔高度' {...CommonFormConfig}>
                            {getFieldDecorator('tower_hight',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入铁塔高度'}
                                ]
                            })(
                                <Input placeholder='请输入铁塔高度'/>
                            )}
                        </FormItem>
                        <FormItem label='警报距离' {...CommonFormConfig}>
                            {getFieldDecorator('alert_distance',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入警报距离'}
                                ]
                            })(
                                <Input placeholder='请输入警报距离'/>
                            )}
                        </FormItem>
                        <FormItem label='警报电话' {...CommonFormConfig}>
                            {getFieldDecorator('alert_phone',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入警报电话'}
                                ]
                            })(
                                <Input placeholder='请输入警报电话'/>
                            )}
                        </FormItem>
                        <FormItem label='代维公司' {...CommonFormConfig}>
                            {getFieldDecorator('maintain_company',{
                                initialValue:'',
                                rules:[
                                    {required: false,message:'请输入代维公司'}
                                ]
                            })(
                                <Input placeholder='请输入公司'/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
    singleAdd=(values)=>{
        request({
            url: 'api/add_site',
            data: values,
            success: (res) => {
                console.log('传过去的values',values,res)
            },
            complete: () => {
                //这里应该从新请求更新页面
                this.gotoFather();
            }
        })
    };
    modalOk2=()=>{
        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        console.log('getFieldsValue',values);
        store.addSite_modal.visible=false;
        this.singleAdd(values);
    };

    gotoFather=()=>{
        console.log('gotoFather');
        console.log(this.props);
        this.props.getData(this.props.info);
    };
}

export default Form.create()(AddSiteModal);
