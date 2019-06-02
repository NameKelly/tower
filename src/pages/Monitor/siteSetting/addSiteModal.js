import React ,{ Component,Fragment } from 'react';
import { Modal,Form ,Input} from 'antd';
import store from "../store";
import CommonFormConfig from "../../../common/common-form";
import {observer} from "mobx-react";
import request from "../../../helpers/request";

const FormItem=Form.Item;

@observer
class AddSiteModal extends Component{
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
                            {getFieldDecorator('site',{
                                rules:[
                                    {required: true,message:'请输入站点名'}
                                ]
                            })(
                                <Input placeholder='请输入站点名'/>
                            )}
                        </FormItem>
                        <FormItem label='站址编码' {...CommonFormConfig}>
                            {getFieldDecorator('site_code',{
                                rules:[
                                    {required: true,message:'请输入站址编码'}
                                ]
                            })(
                                <Input placeholder='请输入站址编码'/>
                            )}
                        </FormItem>
                        <FormItem label='铁塔类型' {...CommonFormConfig}>
                            {getFieldDecorator('tower_type',{
                                rules:[
                                    {required: true,message:'请输入铁塔类型'}
                                ]
                            })(
                                <Input placeholder='请输入铁塔类型'/>
                            )}
                        </FormItem>
                        <FormItem label='地址' {...CommonFormConfig}>
                            {getFieldDecorator('addr',{
                                rules:[
                                    {required: true,message:'请输入地址'}
                                ]
                            })(
                                <Input placeholder='请输入地址'/>
                            )}
                        </FormItem>
                        <FormItem label='备注' {...CommonFormConfig}>
                            {getFieldDecorator('remarks',{
                                rules:[
                                    {required: true,message:'请输入备注'}
                                ]
                            })(
                                <Input placeholder='请输入备注'/>
                            )}
                        </FormItem>
                        <FormItem label='代维公司' {...CommonFormConfig}>
                            {getFieldDecorator('company',{
                                rules:[
                                    {required: true,message:'请输入代维公司'}
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
            url: 'api/single_add',
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
}

export default Form.create()(AddSiteModal);