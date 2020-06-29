import React, {Component} from 'react'
// import Config from 'app/defaultConfig'
import './source-list.scss'
import {Table, Tag, Space} from 'antd'
import './magnet-table.scss'
import Format from 'r/utils/format'

const prefix = 'magnet-table'

interface IProps {
  data: IResponse
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
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags: any[]) => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: {name: React.ReactNode}) => (
      <Space size="middle">
        <a>二维码</a>
        <a>小米路由</a>
        <a>复制链接</a>
      </Space>
    ),
  },
]

const testDate = [
  {
    key: '1',
    name: 'John BrownBrownBrownBrownBrownBrownBrown',
    date: 32,
    size: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim GreenBrownBrownBrownBrownBrownv',
    date: 42,
    size: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name:
      'Joe BlackBrownBrownBrownBrownBrownBrownBrownBrownBrownBrownBrownBrownBrownBrown',
    date: 32,
    size: 'Sidney No. 1 Lake Park',
  },
]
export default class MagnetTable extends Component<IProps> {
  constructor(props: Readonly<IProps>) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const {data} = this.props
    let tableData: ITableData[] = []
    const page = data.current && data.current.page || 0

    if (data.items) {
      tableData = data.items.map((it, index) => {
        const item = {} as ITableData
        item.key = index
        item.size = Format.formatSize(it.size)
        item.size = Format.formatDate(it.date)
        return item
      })
    }

    return (
      <div className={prefix}>
        <Table
          columns={columns}
          dataSource={testDate}
          pagination={{current: page, position: ['bottomCenter']}}
        />
      </div>
    )
  }
}
