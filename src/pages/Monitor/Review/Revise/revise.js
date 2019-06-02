import React ,{Component} from 'react';
import { Modal, Form, Input,AutoComplete} from 'antd';
import { observer } from 'mobx-react';
import store from '../../store';
import request from './../../../../helpers/request';
import CommonModalConfig from "./../../../../common/common-modal";
import CommonFormConfig from "./../../../../common/common-form";

const FormItem = Form.Item;

@observer
class Revise extends Component{
    setReviseData=()=>{
        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        let { sensorID, install_height, site} = values;
        request({
            url: 'api/sensor_data_mysql',
            data: {
                sensorID:store.reviewChange.sensorID,
                install_height:store.reviewChange.install_height,
                site:store.reviewChange.site,
                Tower_addr:store.reviewChange.addr,
            },
            success: (res) => {
                console.log("res",res,store.reviewChange.sensorID,store.reviewChange.install_height,store.reviewChange.site,store.reviewChange.addr);
            },
            complete: () => {
                store.revise_modal.visible = false;
                this.props.form.resetFields();
               /* this.sql();*/

            }
        })
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        let { props, params } = this.props;
        let { visible } = props;

        return(
            <Modal visible={visible} title='传感器设置'{...CommonModalConfig}
                   onCancel={() => store.revise_modal.visible= false}
                   onOk={() => {this.setReviseData()}}>
                <Form>
                    <FormItem label='传感器IMEI：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('imei',{
                                rules: [{
                                     message: '传感器IMEI',
                                }],
                            })(
                                <Input placeholder={store.reviewChange.imei} disabled/>
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
                                <Input placeholder={store.reviewChange.imsi} disabled/>
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
                                <Input disabled placeholder={store.reviewChange.sensorID}/>
                            )
                        }
                    </FormItem>

                    <FormItem label='高度：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('install_height', {
                                rules: [{
                                    required: true, message: '请输入高度',
                                }],
                            })(
                                <Input onChange={(e)=>{this.handleChangeHeight(e)}} placeholder={store.reviewChange.install_height}/>
                            )
                        }
                    </FormItem>


                    <FormItem label='站名：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('site', {
                                rules: [{
                                    required: true, message: '请输入站名',
                                }],
                            })(
                                <AutoComplete
                                    dataSource={store.reviseSite_data}
                                    allowClear={true}
                                    onBlur={this.onBlur}
                                    onChange={(value)=>{this.filterData(value)}}
                                    style={{ marginBottom: 5 ,width:'100%'}}
                                >
                                <Input onChange={(e)=>{this.handleChangeSite(e)}} placeholder={store.reviewChange.site}/>
                                </AutoComplete>
                            )
                        }
                    </FormItem>
                    <FormItem label='地址：' {...CommonFormConfig}>
                        {
                            getFieldDecorator('addr', {
                                rules: [{
                                    message: '请输入地址',
                                }],
                            })(
                                <Input disabled placeholder={store.reviewChange.addr}/>
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
       /* let value=e.target.value;
        let index=store.reviseSite_data.indexOf(value);
        console.log('index',index,value);
        store.reviewChange.site=value;
        store.reviewChange.addr=store.reviseAddr_data[index];*/
    };
    filterData=(value)=>{
        request({
            url: 'api/select_site',
            data:{
                keyword:value,
            },
            success: (res) => {
                console.log('res',res,'res.data',res.data);
                let data=Array.from(res.data);
                console.log('是否为数组',data instanceof Array,data);
                let siteList=data.map(v=>v.site);
                let addrList=data.map(v=>v.addr);

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
    /*setData=()=>{
        request({
            url: 'api/select_site',
            data:{
                keyword:'keywords'
            },
            success: (res) => {
                console.log('res',res,'res.data',res.data);
               let data=Array.from(res.data);
               console.log('是否为数组',data instanceof Array,data);
               let siteList=data.map(v=>v.site);
               let addrList=data.map(v=>v.addr);

               store.reviseSite_data=siteList;
               store.reviseAddr_data=addrList;
            }
        })
    };*/


}
export default Form.create()(Revise);