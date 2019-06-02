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
  @observable warn_data=[];
  @observable history_data=[];
  @observable months_data = [];
  @observable dataSource = [];
  @observable basicMsg = {};
  @observable reviseMsg = {};
  @observable angleValue = [];
  @observable dateValue = [];
  @observable xValue = [];
  @observable yValue = [];
  @observable rangeValue = [];
  @observable currentImei='';
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
  @observable x_add_arr=[];
  @observable y_add_arr=[];
  @observable x_big_arr=[];
  @observable y_big_arr=[];
  @observable activeKey1='1';
  @observable activeKey2='01';
  @observable day_number=3;
  @observable warnParams = {
    endTime: moment().format('YYYY-MM-DD'),
    startTime: moment().subtract('days',2).format('YYYY-MM-DD')
  };





}
export default new Store();