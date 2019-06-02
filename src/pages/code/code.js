import React ,{Component,Fragment} from 'react';
import { Card,Form,Input ,Button ,Modal } from 'antd';
import CommonModalConfig from "../../common/common-modal";
import CommonFormConfig from "../../common/common-form";


class Code extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                {/*<Modal
                    title="传感器设置"
                    {...CommonModalConfig}
                    visible='true'
                    onOk={()=>{this.onOk()}}
                    onCancel={()=>{this.onCancel()}}
                    style={{ width:'100%' }}>*/}
                    <Card title='传感器设置'  {...CommonModalConfig}>
                    <Form>
                        <Form.Item label='传感器IMEI：' {...CommonFormConfig}>
                            {getFieldDecorator('imei', {
                                rules: [],
                            })(
                                <Input disabled/>
                            )}
                        </Form.Item>
                        <Form.Item label='传感器IMSI：' {...CommonFormConfig}>
                            {getFieldDecorator('imsi', {
                                rules: [{
                                    required: true, message: '请输入IMSI号',
                                }],
                            })(
                                <Input disabled/>
                            )}
                        </Form.Item>
                        <Form.Item label='sensorID：' {...CommonFormConfig}>
                            {getFieldDecorator('sensorID', {
                                rules: [],
                            })(
                                <Input disabled/>
                            )}
                        </Form.Item>
                        <Form.Item label='高度：' {...CommonFormConfig}>
                            {getFieldDecorator('height', {
                                rules: [{
                                    required: true, message: '请输入传感器安装高度',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label='站名：' {...CommonFormConfig}>
                            {getFieldDecorator('site', {
                                rules: [{
                                    required: true, message: '请输入传感器站名',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label='地址：' {...CommonFormConfig}>
                            {getFieldDecorator('addr', {
                                rules: [],
                            })(
                                <Input disabled/>
                            )}
                        </Form.Item>
                    </Form>
                    </Card>
               {/* </Modal>*/}
            </Fragment>
        );
    }
    onCancel=()=>{
       console.log('onCancel')
    };
    onOk=()=>{
        console.log('onOk')
    }
}
export default Form.create()(Code);