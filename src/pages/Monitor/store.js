import {
  observable
} from 'mobx';
import moment from 'moment';

class Store {
  @observable alarm_modal = {
    loading: false,
    visible: false,
  };
  @observable addDevice_modal = {
    loading: false,
    visible: false,
  };
  @observable revise_modal = {
    loading: false,
    visible: false,
  };
  @observable initialize_modal = {
    loading: false,
    visible: false,
  };
  @observable siteSetting_modal = {
    loading: false,
    visible: false,
    data:{}
  };
  @observable addSite_modal = {
    loading: false,
    visible: false,
  };
  @observable reviseData = [];
  @observable initialData = [];
  @observable fetchList = [];
  @observable fetchListFilter = [];
  @observable realtimeData = {};
  @observable initialParams = {
    startTime: '',
    endTime: ''
  };
  @observable warnCurrent = {
    currentImei2:'',
    currentSite2:'',
    x_add_all:'',
    y_add_all:'',
    x_big_all:'',
    y_big_all:'',
    date_time2:[],
  };
  @observable warnValue = {
    warn_addX:'',
    warn_addY:'',
    warn_bigX:'',
    warn_bigY:''
  };
  @observable echartsData=[];
  @observable echartsXData=[];
  @observable series=[];
  @observable series3=[];
  @observable details_echartsData=[];
  @observable details_echartsXData=[];
  @observable details_series=[];
  @observable details_series2=[];
  @observable details_series3=[];
  @observable machine_site_id ='';
  @observable sensorID ='';
  @observable warn_data=[];
  @observable history_data=[];
  @observable total_num=0;
  @observable months_data = [];
  @observable sensorID_data=[{sensorID:'全部'}];
  @observable dataSource = [];
  @observable basicMsg = {};
  @observable reviseMsg = {};
  @observable angleValue = [];
  @observable dateValue = [];
  @observable xValue = [];
  @observable yValue = [];
  @observable rangeValue = [];
  @observable currentImei='';
  @observable site_id='';
  @observable details={};
  @observable reviewChange={};
  @observable searchData=[];
  @observable search=[];
  @observable siteValue=[];
  @observable admin_data=[];
  @observable review_data=[];
  @observable reStatus_data=[];
  @observable reviseSite_data=[];
  @observable reviseAddr_data=[];
  @observable filter_data=[];
  /*@observable x_add_arr=[];
  @observable y_add_arr=[];
  @observable x_big_arr=[];
  @observable y_big_arr=[];
  @observable activeKey1='1';
  @observable day_number=3;
  */
  @observable activeKey2='01';
  @observable warnParams = {
    endTime: moment().format('YYYY-MM-DD'),
    startTime: moment().subtract('days',2).format('YYYY-MM-DD')
  };

  @observable warn_x=[];
  @observable angle_add_x=[];
  @observable angle_add_y=[];
  @observable angle_big_x=[];
  @observable angle_big_y=[];

  @observable angle_add_x3=[];
  @observable angle_add_y3=[];
  @observable angle_big_x3=[];
  @observable angle_big_y3=[];

  @observable angle_add_x5=[];
  @observable angle_add_y5=[];
  @observable angle_big_x5=[];
  @observable angle_big_y5=[];

  @observable angle_add_x7=[];
  @observable angle_add_y7=[];
  @observable angle_big_x7=[];
  @observable angle_big_y7=[];

  @observable angle_add_x10=[];
  @observable angle_add_y10=[];
  @observable angle_big_x10=[];
  @observable angle_big_y10=[];

  @observable angle_add_x15=[];
  @observable angle_add_y15=[];
  @observable angle_big_x15=[];
  @observable angle_big_y15=[];
  @observable activeKey1='3';






}
export default new Store();
