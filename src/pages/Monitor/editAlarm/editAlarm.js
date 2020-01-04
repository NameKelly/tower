import React ,{Component} from 'react';
import { Modal, Form, Input, DatePicker} from 'antd';
import CommonModalConfig from '../../../common/common-modal'
import CommonFormConfig from '../../../common/common-form'
import { observer } from 'mobx-react';
import store from '../store';
import request from '../../../helpers/request';
import moment from 'moment';

const FormItem = Form.Item;
const route = 'http://oil.mengant.cn/api';

@observer
class EditAlarm extends Component{
  setWarnData = () => {
    let { getFieldsValue } = this.props.form;
    let values = getFieldsValue();
    let { site_id,site_name,site_address,site_longitude,site_latitude,tower_hight,alert_distance,alert_phone } = values;
    request({
      /*url: '/api/Set_warn',*/
      url:'/api/update_site',
      data: {
        site_id,
        site_name,
        site_address,
        site_longitude,
        site_latitude,
        tower_hight,
        alert_distance,
        alert_phone
      },
      success: (res) => {
        console.log(res);
        this.props.getDevicesList();
      },
      complete: () => {
        store.alarm_modal.visible = false;
        this.props.form.resetFields()
      }
    })
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    let { props, params } = this.props;
    console.log('params',params);
    let { visible } = props;
    let { site_id,site_name,site_address,site_longitude,site_latitude,tower_hight,alert_distance,alert_phone } = params;
    return(
        <Modal
            visible={visible}
            title='警报指数设置'
            {...CommonModalConfig}
            onCancel={() => store.alarm_modal.visible = false}
            onOk={() => {this.setWarnData()}}>
          <Form>
            <FormItem label='站名：' {...CommonFormConfig}>
              {
                getFieldDecorator('site_name', {initialValue: site_name},{
                  rules: [{
                    required: true, message: '请输入站名',
                  }],
                })(
                    <Input disabled/>
                )
              }
            </FormItem>
            <FormItem label='站点编码：' {...CommonFormConfig}>
              {
                getFieldDecorator('site_id', {initialValue: site_id},{
                  rules: [{
                    required: true, message: '请输入站点编码',
                  }],
                })(
                    <Input disabled/>
                )
              }
            </FormItem>
            <FormItem label='站名地址：' {...CommonFormConfig}>
              {
                getFieldDecorator('site_address', { initialValue: site_address },{
                  rules: [{
                    required: true, message: '请输入站名地址',
                  }],
                })(
                    <Input disabled placeholder='请输入站名地址'/>
                )
              }
            </FormItem>
            <FormItem label='站点经度：' {...CommonFormConfig}>
              {
                getFieldDecorator('site_longitude', { initialValue: site_longitude },)(
                    <Input disabled />
                )
              }
            </FormItem>
            <FormItem label='站点纬度：' {...CommonFormConfig}>
              {
                getFieldDecorator('site_latitude', { initialValue: site_latitude },)(
                    <Input disabled />
                )
              }
            </FormItem>
            <FormItem label='铁塔高度：' {...CommonFormConfig}>
              {
                getFieldDecorator('tower_hight', { initialValue: tower_hight },)(
                    <Input disabled />
                )
              }
            </FormItem>
            <FormItem label='距离预警值：' {...CommonFormConfig}>
              {
                getFieldDecorator('alert_distance', {
                  initialValue: alert_distance,
                  rules: [{
                    required: true, message: '请输入距离预警值',
                  }],
                })(
                    <Input placeholder='大于或等于该距离预警值将自动警报'/>
                )
              }
            </FormItem>
            <FormItem label='警报电话：' {...CommonFormConfig}>
              {
                getFieldDecorator('alert_phone', {
                  initialValue: alert_phone,
                  rules: [{
                    required: true, message: '请输入电话号码',
                  }],
                })(
                    <Input placeholder='请输入电话号码'/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
    )
  }
}

export default Form.create()(EditAlarm);
