// declare module 'koa-router'
// declare module 'koa'
declare module '@koa/cors'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
/**
 * 磁力链接数据模型
 */
interface IMagnetItem {
  /**
   * 名字
   */
  name: string
  /**
   * 磁力链接
   */
  magnet: string
  /**
   * 分辨率
   */
  resolution: string
  /**
   * 日期
   */
  date: number
  /**
   * 大小
   */
  size: string
  /**
   * 热度
   */
  hot: number
  /**
   * 详情 URL
   */
  detailUrl: string
}

/**
 * 请求参数
 */
interface IRequestParams {
    id: string
    keyword: string
    page: number
    sort: string
}
/**
 * 后端返回数据类型
 */
interface IResponse {
  items: IMagnetItem[]
  current: IRequestParams
  originalCount: number
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
