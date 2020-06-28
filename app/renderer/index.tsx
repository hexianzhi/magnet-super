import React, {Fragment} from 'react'
import {render} from 'react-dom'
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader'
import Root from './containers/Root'
import {configureStore, history} from './store/configureStore'
import { Input, Button} from 'antd'
// import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css'
const store = configureStore()

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

{/* <Button type="primary">Button</Button> */}
document.addEventListener('DOMContentLoaded', () =>
render(
  <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
)
