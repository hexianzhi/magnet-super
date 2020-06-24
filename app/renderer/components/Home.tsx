import React from 'react'
import {Link} from 'react-router-dom'
import routes from '../constants/routes.json'
import styles from './Home.css'
// import request from '../utils/axios'
import axios from 'axios'

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
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  )
}
