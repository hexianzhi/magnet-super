import React, {Component} from 'react'
import {Input, Divider} from 'antd'
const {Search} = Input
import logo from 'static/logo.png'
import SourceList from './source-list'
import './Home.scss'
import MTable from './magnet-table'
// import Event from 'r/utils/event'
import localRules from 'app/rule.json'
import testData from './test.json'

// import request from '../utils/axios'

interface IState {
  data: IResponse
  ruleList: IRuleItem[]
  activeRule: IRuleItem
}
const prefix = 'main'
export default class Home extends Component<any,IState>  {
  tempValue = ''

  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      data: {} as IResponse,
      ruleList: [],
      activeRule: {} as IRuleItem
    }
  }

  async componentDidMount() {
    // http.get('load-rule').then(res => {
    //   this.setState({
    //     // @ts-ignore
    //     ruleList: res.data
    //   })
    // })

    // const result = request()
    // console.log('-----result----> ', result)
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.tempValue = event.target.value
  }

  onSearch = (value: string)  => {
    this.tempValue = value
    // test
    this.setState({data: testData.data})

    // const {activeRule} = this.state

    // const params = {
    //   id: activeRule.id,
    //   page: 1,
    //   sort: 'preset',
    //   url: activeRule.url,
    //   keyword: value,
    // }

    //  http.get('search', {
    //     params: params,
    //   }).then((res) => {
    //     console.log('-----res----> ', res)
    //     this.setState({data: res.data})
    //   }).catch((err) => {
    //     console.log('-----err----> ', err)
    //   })
  }

  handleRuleChange = (source: IRuleItem) => {
    this.setState({
      activeRule: source
    })
    if (this.tempValue) this.onSearch(this.tempValue)
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
            onChange={this.onChange}
            onSearch={this.onSearch}
          />
          <div className={prefix + '-setting'}>设置</div>
        </div>
        <Divider></Divider>
        <div className={prefix + '-content'}>
          <SourceList ruleList={localRules} onSourceChange={this.handleRuleChange}></SourceList>
          <Divider type="vertical" style={{height: '100%'}}></Divider>
          {data && <MTable data={data}></MTable>}
        </div>
      </div>
    )
  }
}
