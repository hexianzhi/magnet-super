import React, {Component} from 'react'
import {Input, Divider} from 'antd'
const {Search} = Input
import logo from 'static/logo.png'
import SourceList from './source-list'
import './Home.scss'
import MTable from './magnet-table'
import http from 'r/utils/axios'

// import request from '../utils/axios'
interface IState {
  data: IResponse
}
const prefix = 'main'
export default class Home extends Component<any,IState>  {


  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      data: {} as IResponse
    }
  }

  componentDidMount() {
    // const result = request()
    // console.log('-----result----> ', result)
  }


  search = (value: string)  => {
    const params = {
      id: 'btgg',
      page: 1,
      sort: 'preset',
      url: 'https://www.btgg.cc',
      keyword: value,
    }

     http.get('search', {
        params: params,
      }).then((res) => {
        console.log('-----res----> ', res)
        this.setState({data: res.data})
      }).catch((err) => {
        console.log('-----err----> ', err)
      })
  }

  render() {
    const {data} = this.state

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
            defaultValue="火影忍者"
            enterButton="搜索"
            size="middle"
            onSearch={this.search}
          />
          <div className={prefix + '-setting'}>设置</div>
        </div>
        <Divider></Divider>
        <div className={prefix + '-content'}>
          <SourceList></SourceList>
          <Divider type="vertical" style={{height: '100%'}}></Divider>
          {data && <MTable data={data}></MTable>}
        </div>
      </div>
    )
  }
}
