import React, { Component,Fragment } from 'react';
import { Card,Breadcrumb ,Input,Button,Upload,Icon,Form,message} from 'antd';
import {Link} from 'react-router-dom';
import request from "../../../helpers/request";
import store from "../store";
import axios from "axios";
import AddSiteModal from './addSiteModal';
import $ from  'jquery'

const InputGroup = Input.Group;
const Search=Input.Search;
export default class AddSite extends Component{
    state={
        file:'',
        fileName: '',
        excel_path:'',
        formData:''
    };
    handleUpload=({action, file, onSuccess, onError})=>{
        let _this=this;
        let formData = new FormData();
        formData.append('photo', file);
        this.setState({
            formData:formData,
            file:file,
            fileName:file.name
        });
        $.ajax({
            url: "api/upload_excel",
            type: "post",
            cache: false, //上传文件不需要缓存
            data: formData,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success: function (data) {
                let json=JSON.parse(data);
                _this.setState({
                    excel_path:json.data
                });
                console.log('data',data)
            },
            error: function (data) {
                console.log('data',data)
            }
        })
    };
    add_site_p=()=>{
        request({
            url:'api/add_site_p',
            data: {
                path:this.state.excel_path
            },
            success: ({res}) => {
            console.log('res',res);
            this.setState({
                fileName: '',
                excel_path:'',
                formData:''
            })
            }
        })
    };
    render(){
        let uploadOptions = {
            name: 'file',
            action:'api/upload_excel',
            withCredentials: true,
            customRequest: this.handleUpload,
            showUploadList: false
        };
        return(
            <Fragment>
                {/*<Breadcrumb style={{margin:'10px 0px'}}>
                    <Breadcrumb.Item><Link to={'/siteSetting'}>站点设置</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>批量添加</Breadcrumb.Item>
                </Breadcrumb>*/}
                <Card
                    title={<Breadcrumb style={{margin:'10px 0px'}}>
                        <Breadcrumb.Item>批量添加</Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={'/siteSetting'}>站点设置</Link></Breadcrumb.Item>
                    </Breadcrumb>}
                    style={{paddingBottom:'25px'}}
                      extra={<Button type='primary' onClick={()=>store.addSite_modal.visible=true}>添加</Button>}
                >
                    <div style={{textAlign:'center'}}>
                        <Form layout="inline">
                            <Form.Item label='导入Excel表格'>
                                <Upload { ...uploadOptions} style={{paddingBottom:0}}>
                                    <InputGroup style={{paddingBottom:0,display:'inlineBlock'}}>
                                        <Input style={{width:200}} readOnly placeholder={this.state.fileName}/>
                                        <Input value='浏览'  style={{width:50,cursor:'pointer'}} readOnly/>
                                    </InputGroup>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button>取消</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' onClick={this.add_site_p}>上传</Button>
                            </Form.Item>
                        </Form>

                    </div>
                </Card>
                <AddSiteModal props={store.addSite_modal} getData={this.getData} info={''}/>
            </Fragment>
        );
    }
    getData=()=>{

    }
}
