import React from 'react'
import {Space} from 'antd'
import {Base64} from 'js-base64'
import {shell} from 'electron'
import QrCode from './operation-qrcode'

const Operation = (props: {record: IMagnetItem}) => {

  const {record} = props

  const handleXiaoMi = () => {
    const url =
      'http://d.miwifi.com/d2r/?url=' + Base64.encodeURI(record.magnet)

    // TODO, 转换成浏览器
    shell.openExternal(url)
  }

  return (
    <Space size="small">
      <QrCode record={record}></QrCode>
      <a onClick={handleXiaoMi}>小米路由</a>
      <a className="copylink" data-clipboard-text={record.magnet}>复制链接</a>
    </Space>
  )
}

export default Operation
