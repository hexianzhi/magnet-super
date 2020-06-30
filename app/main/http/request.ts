import URI from 'urijs'
import config from '../../defaultConfig'
import { OutgoingHttpHeaders, IncomingHttpHeaders } from 'http'
import axios, { AxiosRequestConfig } from 'axios'
// import htmlparser2 from 'htmlparser2'
const htmlparser2 = require('htmlparser2')
import XmlDom from 'xmldom'


let axiosInstance = createRequest()

function createRequest (appConfig?: AxiosRequestConfig) {
    const defaultTimeout = 10000

    const http = axios.create({
      timeout: defaultTimeout
    })
    http.interceptors.request.use(config => {
      let proxyURL
      // 处理代理请求
      // if (appConfig && appConfig.hasOwnProperty('proxy') && appConfig.hasOwnProperty('proxyType') &&
      //   appConfig.hasOwnProperty('proxyHost') && appConfig.hasOwnProperty('proxyPort')) {
      //   const {proxy, proxyType, proxyHost, proxyPort} = appConfig
      //   if (proxy) {
      //     const timeout = config.timeout
      //     proxyURL = `${proxyType}://${proxyHost}:${proxyPort}`
      //     const proxyAgent = proxyType.startsWith('socks') ? new SocksProxyAgent({
      //       protocol: `${proxyType}:`,
      //       hostname: proxyHost,
      //       port: proxyPort,
      //       timeout: timeout
      //     }) : tunnel.httpsOverHttp({
      //       timeout: timeout,
      //       proxy: {
      //         host: proxyHost,
      //         port: proxyPort
      //       }
      //     })
      //     config.httpAgent = proxyAgent
      //     config.httpsAgent = proxyAgent
      //   }
      // }
      const headers = config.headers
      const customHeaders  = {} as IncomingHttpHeaders
      for (let key in headers) {
        if (!/common|delete|get|head|post|put|patch/.test(key)) {
          customHeaders[key] = headers[key]
        }
      }
      console.info({
        url: config.url,
        headers: customHeaders,
        proxy: proxyURL
      })
      return config
    })
    http.interceptors.response.use(rsp => rsp.data, error => Promise.reject(error))
    return http
}

/**
 * 抓取网页
 * @param url
 * @param clientHeaders
 */
async function requestDocument (url: string, clientHeaders: IncomingHttpHeaders) {
  const timeout = 10000

  // header
  const uri = new URI(url)
  const host = uri.host()
  const origin = uri.origin()
  const headers = {
    'host': host,
    'origin': origin,
    'referer': origin
  } as OutgoingHttpHeaders
  const acceptLanguage = clientHeaders['accept-la nguage']
  headers['accept-language'] = acceptLanguage || 'zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7,und;q=0.6,ja;q=0.5'
  const xForwardedFor = clientHeaders['x-forwarded-for']
  if (xForwardedFor) {
    headers['x-forwarded-for'] = xForwardedFor
  }
  const userAgent = clientHeaders['user-agent']
  if (userAgent) {
    const newUserAgent = config.requestIdentifier && / windows | mac | android | ios /gi.test(userAgent) && process.env.npm_package_version ? `${userAgent} MWBrowser/${process.env.npm_package_version}` : userAgent
    headers['user-agent'] = config.customUserAgent && config.customUserAgentValue ? config.customUserAgentValue : newUserAgent
  }
  const options = {url: url, headers: headers, timeout: timeout}

  const html = await axiosInstance(options)

  // 用htmlparser2转换一次再解析
  // @ts-ignore
  const outerHTML = htmlparser2.DomUtils.getOuterHTML(htmlparser2.parseDOM(html))
  return new XmlDom.DOMParser().parseFromString(outerHTML)
}

export default {
  axiosInstance,
  createRequest,
  requestDocument
}
