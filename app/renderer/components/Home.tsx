import React, {Component} from 'react'
import axios from 'axios'
import {Input, Divider} from 'antd'
const {Search} = Input
import logo from 'static/logo.png'
import SourceList from './source-list'
import './Home.scss'


// import request from '../utils/axios'

const prefix = 'main'
export default class Home extends Component {
  constructor(props: Readonly<{}>) {
    super(props)
  }

  componentDidMount() {
    const params = {
      id: 'btgg',
      page: 1,
      sort: 'preset',
      url: 'https://www.btgg.cc',
      keyword: 'fuck',
    }

    let http = axios.create({
      baseURL: 'http://localhost:3000/api/',
      timeout: 10000,
      responseType: 'json',
    })
    http
      .get('search', {
        params: params,
      })
      .then((res) => {
        console.log('-----res----> ', res)
      })
      .catch((err) => {
        console.log('-----err----> ', err)
      })
    // const result = request()
    // console.log('-----result----> ', result)
  }

  render() {
    return (
      <div className={prefix}>
        <div className={prefix + '-header'}>
          <div className={prefix + '-left'}>
            <img className={'logo'} src={logo}></img>
            Magnet Super
          </div>
          <Divider type="vertical" style={{height: '2em'}}></Divider>
          <Search
            className={prefix + '-search'}
            placeholder="火影忍者"
            enterButton="搜索"
            size="middle"
            onSearch={(value) => console.log(value)}
          />
          <div className={prefix + '-setting'}>设置</div>
        </div>
        <Divider></Divider>
        <div className={prefix + '-content'}>
          <SourceList></SourceList>
          {/* <div className={prefix + '-list-source'}> 左侧源站</div> */}
          <Divider type="vertical" style={{height: '100%'}}></Divider>
          <div className={prefix + '-list-detail'}>右侧磁力详情</div>
        </div>
      </div>
    )
  }
}
