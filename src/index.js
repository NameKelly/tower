import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';
import {
    HashRouter,
    Route,
} from 'react-router-dom'
import globalStore from './globalStore';
moment.locale('zh-cn');

const root = document.getElementById('root');

const render = (Com) => {
    ReactDOM.hydrate(
        <LocaleProvider  locale={zhCN}>
            <HashRouter>
                <Route render={props => <Com {...props} globalStore={globalStore} />} >
                </Route>
            </HashRouter>
        </LocaleProvider>
        , root)
};

render(App);

