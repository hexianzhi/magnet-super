/**
 * 处理成功/失败
 */
export default async (ctx: any, next: Function) => {
  try {
    // 添加 success 接口到 koa context 上
    ctx.success = function (data: any) {
      ctx.body = {
        success: true,
        data: data
      }
    }

    await next()

    if (ctx.status !== 200) {
      ctx.throw(ctx.status, ctx.message)
    }
  } catch (e) {
    let message = e.message
    const statusCode = e.statusCode || 500
    console.error(statusCode, e.message)
    const maxLength = 100
    if (statusCode !== 500) {
      message = `${statusCode} - 请求源站异常，请查看日志`
    }
    ctx.status = statusCode
    ctx.body = {
      success: false,
      message: message.length > maxLength ? `${message.substring(0, maxLength)}...` : message
    }
  }
}
