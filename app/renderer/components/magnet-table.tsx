import React, {Component} from 'react'
// import Config from 'app/defaultConfig'
import './source-list.scss'
import {message, Table} from 'antd'
import './magnet-table.scss'
import Format from 'r/utils/format'
import Clipboard from 'clipboard'
import Operation from './operation'

const prefix = 'magnet-table'

interface IProps {
  data: IResponse
}

// interface IState {
//   dataList: IResponse[]
// }

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


export default class MagnetTable extends Component<IProps> {
  constructor(props: Readonly<IProps>) {
    super(props)
  }

  componentDidMount() {
    const clipboard =  new Clipboard('.copylink')
    clipboard.on('success', function(e) {
      message.success('复制成功')
      e.clearSelection()
    })
  }

  componentWillUnmount () {
    // clipboard.
  }

  render() {
    const {data} = this.props

    const page = data.current && data.current.page || 0
    let tableData: IMagnetItem[] = []
    if (data.items) {
      tableData = data.items.map((it, index) => {
        const item = {} as ITableData
        item.key = index
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
          dataSource={tableData}
          pagination={{current: page, position: ['bottomCenter']}}
          scroll={{ x: '100%' }}
        />
      </div>
    )
  }
}
