import { IncomingHttpHeaders } from 'http'
import config from '../defaultConfig'
import Request from './request'
import xpath from 'xpath'
import URI from 'urijs'
import format from './format-parser'
// import fs from 'fs'
import {loadFilterData, isFilter} from './filter'

let ruleMap = {} as any


/**
 * 从网络或者本地更新并缓存规则
 * @returns {Promise<void>}
 */
async function loadRuleByURL () {
  const url = config.ruleUrl
  let rule
  try {
    if (url.startsWith('http')) {
      // 如果是网络文件
      console.info('获取网络规则文件', url)
      rule = await Request.axiosInstance(url)
    }
    if (!Array.isArray(rule) || rule.length <= 0) {
      throw new Error('规则格式不正确')
    }
  } catch (e) {
    console.error(e.message, '规则加载失败，将使用内置规则')
    rule = require('./rule.json')
  }
  // cacheManager.set('rule_json', JSON.stringify(rule))

  rule.forEach((it: { id: string | number }) => {
    ruleMap[it.id] = it
  })
  return rule
}

/**
 * 补齐搜索参数
 * @param rule
 * @param keyword
 * @param page
 * @param sort
 * @returns {{id: *, page: *, sort: *, keyword: *, url: *}}
 */
function makeupSearchOption({id, keyword, page, sort}: {id: string, keyword:string, page:number, sort: string}) {
  const rule = getRuleById(id)

  const newPage = Math.max(1, page || 0)
  // 如果没有指定的排序 就取第一个排序
  const pathKeys = Object.keys(rule.paths)
  const newSort = pathKeys.indexOf(sort) !== -1 ? sort : pathKeys[0]
  // 拼接完整url
  const url = rule.url + rule.paths[newSort].replace(/{k}/g, encodeURIComponent(keyword)).replace(/{p}/g, newPage)
  return {id: rule.id, keyword, page: newPage, sort: newSort, url}
}

function getRuleById (id: string) {
  return ruleMap[id] || ruleMap[Object.keys(ruleMap)[0]]
}

/**
 * 获取搜索结果
 * @param param0
 * @param headers
 */
async function getSearchResult ({id, url}:{id: string, url: string}, headers: IncomingHttpHeaders) {
  const rule = getRuleById(id)
  // TODO: 缓存
  let document = await Request.requestDocument(url, headers)
  let items = parseItemsDocument(document, rule.xpath)

  // 过滤
  const originalCount = items.length
  if (config.filterBare || config.filterEmpty) {
    items = items.filter((item) => {
      if (config.filterBare) {
        return !isFilter(item.name.replace(/ /g, ''))
      } else if (config.filterEmpty) {
        return typeof item.size === 'number' && item.size > 0
      }
      return 0
    })
  }

  return {originalCount, items}
}

/**
 * 解析列表Document
 * @param document
 * @param expression xpath表达式对象
 */
function parseItemsDocument (document: HTMLDocument, expression: any) {

  const items = [] as any[]
  const groupNodes = xpath.select(expression.group, document)
  groupNodes.forEach((item) => {
    const child = item as Node
    // 名称
    const nameNode = xpath.select(expression.name, child)
    const name = format.extractTextByNode(nameNode)
    // 分辨率
    const resolution = format.extractResolution(name)
    // 磁力链
    const magnet = format.extractMagnet(format.extractTextByNode(xpath.select(expression.magnet, child)))
    // 时间
    const date = format.extractDate(format.extractTextByNode(xpath.select(expression.date, child)))
    // 文件大小
    const size = format.extractFileSize(format.extractTextByNode(xpath.select(expression.size, child)))
    // 人气
    const hot = expression.hot ? format.extractNumber(format.extractTextByNode(xpath.select(expression.hot, child))) : null
    // 详情url
    const detailExps = expression.name + '/@href'
    const detailUrlText = format.extractTextByNode(xpath.select(detailExps, child))
    const detailUrl = detailUrlText ? new URI(detailUrlText).hostname('').toString() : null
    if (name) {
      items.push({
        name, magnet, resolution, date, size, hot, detailUrl
      })
    }
  })
  // console.silly(`\n${JSON.stringify(items, '\t', 2)}`)
  return items
}

export default {
  loadRuleByURL,
  makeupSearchOption,
  getSearchResult
}
