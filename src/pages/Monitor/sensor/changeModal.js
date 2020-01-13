import React,{ Component,Fragment} from 'react';
import {Modal, Form, Input, Button, AutoComplete,DatePicker} from 'antd'
import store from '../store';
import { observer } from 'mobx-react';
import request from '../../../helpers/request';
import CommonFormConfig from "../../../common/common-form";
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

const FormItem = Form.Item;
let site_id='';
let machine_site_id='';
let company_id='';
let upper_date='';
let lower_date='';



@observer
class ChangeModal extends Component{
    render(){
        let { getFieldDecorator } = this.props.form;
        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        let { props, record } = this.props;

        let { visible } = props;
        return(
            <Fragment>
                <Modal
                    onCancel={() => store.changeModal.visible=false}
                    visible={visible}
                    title='修改'
                    footer={[
                        <Button key="noPass" type="primary" onClick={()=>this.setReviseData()} >
                            确定
                        </Button>,
                        <Button key="cancel" onClick={() => store.changeModal.visible=false}>
                            取消
                        </Button>,
                    ]}
                >
                    <Form>
                        <FormItem label='站点名：' {...CommonFormConfig}>
                            {
                                getFieldDecorator('site_name',{
                                    rules: [{
                                        message: '请输入站点名',
                                    }],
                                })(
                                    <AutoComplete
                                        dataSource={store.reviseSite_data}
                                        allowClear={true}
                                        onChange={(value)=>{this.filterData(value)}}
                                        style={{ marginBottom: 5 ,width:'100%'}}
                                    >
                                    <Input/>
                                    </AutoComplete>
                                )
                            }
                        </FormItem>
                        <FormItem label='站点地址：' {...CommonFormConfig}>
                            {
                                getFieldDecorator('site_addr', {
                                    rules: [{
                                        message: '请输入站点地址',
                                    }],
                                })(
                                    <Input disabled/>
                                )
                            }
                        </FormItem>
                        <FormItem label='sensorID：' {...CommonFormConfig}>
                            {
                                getFieldDecorator('sensorID', {
                                    rules: [{
                                        message: '请输入sensorID',
                                    }],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem label='上塔时间：' {...CommonFormConfig}>
                            {
                                getFieldDecorator('upper_date', {

                                })(
                                    <DatePicker format={dateFormat} onChange={this.onChange1} style={{width:'100%'}} placeholder={upper_date}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='下塔时间：' {...CommonFormConfig}>
                            {
                                getFieldDecorator('lower_date', {

                                })(
                                    <DatePicker format={dateFormat} onChange={this.onChange2} style={{width:'100%'}} placeholder={lower_date}/>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </Fragment>
        )
    }

    componentDidMount(){
        this.props.onRef(this)
    }
    setValue=(record)=>{
                            console.log('record',record);
                            store.is_lower=record.is_lower;
                            site_id=store.changeModal.record.site_id;
                            machine_site_id=store.changeModal.record.machine_site_id;
                            company_id=store.changeModal.record.company_id;
                            if(record.upper_date!=''){
                                upper_date=moment(record.upper_date).format('YYYY-MM-DD HH:mm:ss');
                            }
                            if(record.lower_date!=''){
                                lower_date=moment(record.lower_date).format('YYYY-MM-DD HH:mm:ss');
                            }

                            console.log('默认日期',upper_date,lower_date);
        this.props.form.setFieldsValue({
            site_name:store.changeModal.record.site_name,
            site_addr:store.changeModal.record.site_address,
            sensorID:store.changeModal.record.sensorID,
           /* upper_date:store.changeModal.record.upper_date,
            lower_date:store.changeModal.record.lower_date*/
        });
    };
    setReviseData=()=>{

        let { getFieldsValue } = this.props.form;
        let values = getFieldsValue();
        let {sensorID} = values;
        console.log('values',values);
        request({
            url:'api/add_sensor_sx',
            data:{
                sensorID,
                site_id:site_id,
                company_id:company_id,
                upper_date,
                lower_date,
                machine_site_id,
            },
            success: (res) => {
                console.log('res',res);
                store.changeModal.visible=false;
                this.props.getData();
            },
            complete: () => {

            }
        })
    };
    filterData=(value)=>{
        request({
            url: 'api/select_site',
            method:'GET',
            data:{
                site_name:value,
            },
            success: (res) => {
                console.log('res.data',res.data);
                if(res.data.length==1){
                    site_id=res.data[0].site_id;
                    //machine_site_id=res.data[0].machine_site_id;
                    company_id=res.data[0].company_id;
                    console.log('11111',site_id,company_id)
                }
                let data=Array.from(res.data);
                console.log('是否为数组',data instanceof Array,data);
                let siteList=data.map(v=>v.site_name);
                let addrList=data.map(v=>v.site_address);

                store.reviseSite_data=siteList;
                store.reviseAddr_data=addrList;
            }
        });
        let index=store.reviseSite_data.indexOf(value);
        store.reviewChange.site=value;
        store.reviewChange.addr=store.reviseAddr_data[index];
        console.log('store.reviewChange.addr',store.reviewChange.addr);
        this.props.form.setFieldsValue({
            site_addr:store.reviewChange.addr,
        });

    };
    onChange2=(value)=>{
        lower_date=moment(value).format('YYYY-MM-DD HH:mm:ss');
        console.log('date',lower_date)
    };
    onChange1=(value)=>{
        upper_date=moment(value).format('YYYY-MM-DD HH:mm:ss');
        console.log('date',upper_date)
    };
}

export default Form.create()(ChangeModal);
