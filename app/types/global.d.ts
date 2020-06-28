// declare module 'koa-router'
// declare module 'koa'
declare module '@koa/cors'

/**
 * 磁力链接数据模型
 */
interface IMagnetItem {
  name: string
  magnet: string
  /**
   * 分辨率
   */
  resolution: string
  date: number
  size: string
  hot: number
  detailUrl: string
}

/**
 * 搜索结果返回数据类型
 */
interface ISuccessReturnValue {
  current: object
  /**
   * 原始数据总数
   */
  originalCount: number
  items: IMagnetItem[]
}


/**
 * 扩展 koa context 字段
 */
interface ICumstomContext {
  /**
   * 成功回调
   */
  success: (value: ISuccessReturnValue) => void
}
