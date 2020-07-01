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
import http from 'r/utils/axios'

interface IState {
  /** 搜索结果 */
  data: IResponse
  ruleList: IRuleItem[]
  activeRule: IRuleItem
  /** table 加载状态 */
  isLoading: boolean
}
const prefix = 'main'
export default class Home extends Component<any, IState> {
  resultCache = []
  tempValue = ''
  tempPage = 1

  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      data: {} as IResponse,
      ruleList: [],
      activeRule: {} as IRuleItem,
      isLoading: false,
    }
  }

  async componentDidMount() {}

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.tempValue = event.target.value
  }

  onSearch = (value: string) => {
    this.tempValue = value
    this.handleSearch({page: this.tempPage, value})
  }

  /**
   * 表格翻页
   * @param page
   */
  onPageChange = (page: number) => {
    this.tempPage = page
    this.handleSearch({page, value: this.tempValue})
  }

  /**
   * 搜索
   * @param opt
   */
  handleSearch = (opt: {page: number; value?: string}) => {
    this.setState({isLoading: true})

    // test
    setTimeout(() => {
      this.setState({
        data: testData.data,
        isLoading: false,
      })
    }, 1000)

    // const {activeRule} = this.state
    // const {page = 1, value} = opt

    // const params = {
    //   id: activeRule.id,
    //   page: page || 1,
    //   sort: 'preset',
    //   url: activeRule.url,
    //   keyword: value
    // }

    //  http.get('search', {
    //     params: params,
    //   }).then((res) => {
    //     console.log('-----res----> ', res)
    //     this.setState({data: res.data})
    // this.setState({isLoading: true})
    //   }).catch((err) => {
    //     console.log('-----err----> ', err)
    //   })
  }

  /**
   * 切换源站
   * @param source
   */
  handleRuleChange = (source: IRuleItem) => {
    this.setState({
      activeRule: source,
    })
    if (this.tempValue) this.handleSearch({page: 1, value: this.tempValue})
  }

  render() {
    const {data, isLoading} = this.state

    return (
      <div className={prefix}>
        {/* header */}
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
        {/* content */}
        <div className={prefix + '-content'}>
          <SourceList
            ruleList={localRules}
            onSourceChange={this.handleRuleChange}
          ></SourceList>
          <Divider type="vertical" style={{height: '100%'}}></Divider>
          {data && (
            <MTable
              data={data}
              isLoading={isLoading}
              onPageChange={this.onPageChange}
            ></MTable>
          )}
        </div>
      </div>
    )
  }
}
