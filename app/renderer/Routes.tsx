import React from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from './constants/routes.json'
import App from './containers/App'
import HomePage from './containers/HomePage'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

export default function Routes() {
  return (
    <ConfigProvider locale={zhCN}>
      <App>
        <Switch>
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </App>
    </ConfigProvider>
  )
}
