import React, { Component,Fragment } from 'react';
import { Card,Breadcrumb ,Input,Button,Upload,Icon,Form} from 'antd';
import {Link} from 'react-router-dom';
import request from "../../../helpers/request";
import store from "../store";

const InputGroup = Input.Group;
const Search=Input.Search;
export default class AddSite extends Component{
    handleUpload=({action, file, onSuccess, onError})=>{
        /*let _this=this;
        request({
            url: '',
            postType: 'formdata',
            data: {
                file: file
            },
            success: (res) => {
                onSuccess();
                console.log(res);
            },
            complete: () => {
                onError();
                console.log('complete');
            }
        })*/
    };
    render(){
        let uploadOptions = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            withCredentials: true,
            customRequest: this.handleUpload,
            showUploadList: false
        };
        return(
            <Fragment>
                <Breadcrumb style={{margin:'10px 0px'}}>
                    <Breadcrumb.Item><Link to={'/siteSetting'}>站点设置</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>批量添加</Breadcrumb.Item>
                </Breadcrumb>
                <Card style={{paddingBottom:'25px',textAlign:'center'}}>
                    <div style={{textAlign:'center'}}>
                        <Form layout="inline">
                            <Form.Item label='导入Excel表格'>
                                <Upload { ...uploadOptions} style={{paddingBottom:0}}>
                                    <InputGroup style={{paddingBottom:0,display:'inlineBlock'}}>
                                        <Input style={{width:200}} readOnly/>
                                        <Input value='浏览' style={{width:50,cursor:'pointer'}} readOnly/>
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
            </Fragment>
        );
    }
}
