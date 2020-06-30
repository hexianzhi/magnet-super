
import React, {useState, useRef} from 'react'
import {Popover} from 'antd'
import QRCode from 'qrcode'

const qrCode = (props: {record: IMagnetItem}) => {
  const {record} = props

  const [ppVisible, setpPpVisible] = useState(false)
  const [hasDrawCanvas, setCanvasState] =useState(false)

  const canvasRef = useRef<any>()

  const handleVisible = (isVisible: boolean) => {
    setpPpVisible(isVisible)
    if (!isVisible) return
    if (!hasDrawCanvas) {
      // 延时等待 canvas 元素生成
      setTimeout(() => {
        QRCode.toCanvas(canvasRef.current, record.magnet,  { height: 150, width: 150 })
      }, 100)
      setCanvasState(true)
    }
  }

  const rendereContent = () =>  <canvas ref={canvasRef} width="150px" height="150px" />

  return (
    <Popover
      content={rendereContent}
      visible={ppVisible}
      onVisibleChange={v => handleVisible(v)}
      trigger="hover"
      placement="left"
    >
      <a>二维码</a>
    </Popover>
  )
}

export default qrCode
