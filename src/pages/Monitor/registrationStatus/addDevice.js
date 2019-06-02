import React ,{Component,Fragment} from 'react';
import {Form,Button,Modal,Input} from 'antd';
import store from '../store';
import { observer } from 'mobx-react';
import CommonModalConfig from "./../../../common/common-modal";
import CommonFormConfig from "./../../../common/common-form";

@observer
class AddDevice extends Component{
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
                        <Button key="submit" type="primary" onClick={()=>{this.handleSetCode()}}>确定生成二维码</Button>,
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
                        <Form.Item label='Title：' {...CommonFormConfig}>
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true, message: '请输入Title',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label='公司名：' {...CommonFormConfig}>
                            {getFieldDecorator('company', {
                                rules: [{
                                    required: true, message: '请输入公司名',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
    handleSetCode=()=>{
        console.log('Code_ok');
        store.addDevice_modal.visible=false
    }

}

export default Form.create()(AddDevice);