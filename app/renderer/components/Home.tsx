import React from 'react'
import './Home.css'
import axios from 'axios'
import { Input, Button} from 'antd'
const { Search } = Input
import 'antd/dist/antd.css';
// import request from '../utils/axios'

export default function Home() {
  const params = {
    id: "btgg",
    page: 1,
    sort: "preset",
    url: "https://www.btgg.cc",
    keyword: 'fuck'
  }

  let http = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    responseType: 'json',
  })
  http
    .get('search',  {
      params: params
    })
    .then((res) => {
      console.log('-----res----> ', res)
    })
    .catch((err) => {
      console.log('-----err----> ', err)
    })
  // const result = request()
  // console.log('-----result----> ', result)

  return (
    <div>
      <Button type="primary">Button</Button>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={value => console.log(value)}
      />
    </div>
  )
}
