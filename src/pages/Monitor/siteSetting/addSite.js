import React, { Component,Fragment } from 'react';
import { Card,Breadcrumb ,Input,Button,Upload,Icon,Form} from 'antd';
import {Link} from 'react-router-dom';
import request from "../../../helpers/request";
import store from "../store";
import axios from "axios";
import AddSiteModal from './addSiteModal'

const InputGroup = Input.Group;
const Search=Input.Search;
export default class AddSite extends Component{
    state={
        file:''
    };
    handleUpload=({action, file, onSuccess, onError})=>{
        let _this=this;
        this.setState({
            file:file
        });
        let formData = new FormData();
        formData.append('photo', file);
        console.log('formData',formData);
        request({
            url: action,
            postType: 'formdata',
            data: {
                excel_file:file
            },
            success: (res) => {
                console.log(res);
               // onSuccess();
                console.log(res);
            },
            complete: (res) => {
                console.log('res',res);
                //onError();
            }
        })
       /* axios.post('api/upload_excel', {
            excel_file:_this.state.file
        })
            .then(function (response) {
                console.log('res',response);
                console.log('this.state.file',_this.state.file)
            })
            .catch(function (error) {
                console.log(error);
            });*/
    };

    handleUpload2=()=>{
        let formData = new FormData();
        //let dom=this.refs.fileId;
        let dom=document.getElementById('fileId');

        console.log('dom',dom);
        console.log(dom.files[0]);
        formData.append('photo', dom.files[0]);  //添加图片信息的参数
        console.log('formData',formData);
        request({
            url: 'api/upload_excel',
            data: {
                excel_file:formData
            },
            success: (res) => {
                console.log(res);
            },
            complete: (res) => {
                console.log(res);
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
                                <Button type='primary'>保存</Button>
                            </Form.Item>
                        </Form>

                    </div>
                </Card>
                {/*<Card>
                    <input type={'file'} id="fileId" name="fileId" hidefocus="true" ref={'fileId'}/>
                    <Button onClick={this.handleUpload2}>上传Excel表</Button>
                </Card>*/}
                <AddSiteModal props={store.addSite_modal} getData={this.getData} info={''}/>
            </Fragment>
        );
    }
    getData=()=>{

    }
}
