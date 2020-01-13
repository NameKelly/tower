import React,{Component,Fragment} from 'react';
import {Card, Input, Select, Table} from 'antd';
import store from '../store';
import { observer } from 'mobx-react';
import request from '../../../helpers/request';
import ChangeModal from './changeModal'

const Search = Input.Search;
const Option = Select.Option;

@observer
class SensorTable extends Component{
    state={
        selectValue:'site_name'
    };

    render(){
        const selectBefore = (
            <Select defaultValue="站点名" style={{ width: 90 }} onChange={this.selectChange}>
                <Option value="site_name" key='site_name'>站点名</Option>
                <Option value="sensorID" key='sensorID'>sensorID</Option>
                <Option value="site_address" key='addr'>地址</Option>
            </Select>
        );
        const columns=[
            {
                title:'站点名',
                dataIndex:'site_name'
            },
            {
                title:'站点地址',
                width:'250px',
                dataIndex:'site_address'
            },
            {
                title:'sensorID',
                dataIndex:'sensorID'
            },
            {
                title:'上塔时间',
                dataIndex:'upper_date'
            },
            {
                title:'下塔时间',
                dataIndex:'lower_date'
            },
            {
                title:'修改时间',
                dataIndex:'update_date'
            },
            {
                title:'操作',
                render:(record)=>{
                    return(
                        <a onClick={()=>this.click(record)}>修改</a>
                    )
                }
            },
        ];
        return(
            <Fragment>
                <Card>
                    <div style={{width:'100%',textAlign:'center'}}>
                        <Search
                            addonBefore={selectBefore}
                            placeholder="请输入搜索内容"
                            onSearch={(value,event) => this.onSearch(value,event)}
                            enterButton
                            style={{ width: '30%',marginBottom:'10px'}}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={store.sensorList}
                        pagination={true}
                        rowKey={(record,index) =>index}
                    >

                    </Table>
                </Card>
                <ChangeModal props={store.changeModal} getData={this.getData} onRef={this.onRef}/>
            </Fragment>
        )
    }
    componentWillMount(){
                this.getData();
    }
    getData=(key)=>{
        let data={};
        if(key){
            data=key
        }
        request({
            url:'api/select_tower',
            method:'GET',
            data,
            success: (res) => {
                console.log('res',res);
                store.sensorList=res.data;
            },
            complete: () => {

            }
        })
    };
    onSearch=(value)=>{
        let key=this.state.selectValue;
        let data={};
        data[key]=value;
        console.log('onSearch',value,data);
        this.getData(data);
    };
    selectChange=(value)=>{
        this.setState({
            selectValue:value
        });
        console.log('value',value)
    }
    onRef = (ref) => {
        this.child = ref
    }

    click = (record) => {
        store.changeModal.visible=true;store.changeModal.record=record;
        this.child.setValue(record);
    }
}
export default SensorTable;
