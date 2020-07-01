import React, {Component} from 'react'
// import Config from 'app/defaultConfig'
import './source-list.scss'
import {message, Table} from 'antd'
import './magnet-table.scss'
import Format from 'r/utils/format'
import Operation from './operation'
import Clipboard from 'clipboard'

const prefix = 'magnet-table'

interface IState {
  currentPage: number
}
interface IProps {
  data: IResponse
  isLoading: boolean
  onPageChange: (page: number) => void
}

interface ITableData extends Omit<IMagnetItem, 'date'> {
  key?: number
  date: string
}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <a>{text}</a>,
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '热度',
    dataIndex: 'hot',
    key: 'hot',
  },
  {
    title: '操作',
    key: 'action',
    // fixed: 'right',
    // width: 120,
    render: (text: string, record: IMagnetItem) => <Operation record={record}></Operation>,
  },
]


export default class MagnetTable extends Component<IProps, IState> {
  clipboard: any

  constructor(props: Readonly<IProps>) {
    super(props)
    this.state = {
      currentPage:  props.data.current && props.data.current.page || 1
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard('.copylink')
    this.clipboard.on('success', function(e: { clearSelection: () => void }) {
      message.success('复制成功')
      e.clearSelection()
    })
  }

  componentWillUnmount () {
    this.clipboard.destroy()
  }

  onPageChange = (page: number) => {
    this.setState({
      currentPage: page
    })
    this.props.onPageChange(page)
  }

  render() {
    const {data,isLoading} = this.props
    const {currentPage } = this.state

    let tableData: IMagnetItem[] = []
    if (data.items) {
      tableData = data.items.map((it, index) => {
        const item = {} as ITableData
        item.key = index
        // TODO: fix 切换后缓存
        item.size = Format.formatSize(it.size)
        item.date = Format.formatDate(it.date)
        return Object.assign(it, item)
      })
    }

    return (
      <div className={prefix}>
        <Table
          //@ts-ignore
          columns={columns}
          loading={isLoading}
          dataSource={tableData}
          pagination={{
            current: currentPage,
            position: ['bottomCenter'],
            onChange: this.onPageChange,
            pageSize: 20,
            total: 1000,
            showSizeChanger: false
          }}
        />
      </div>
    )
  }
}
