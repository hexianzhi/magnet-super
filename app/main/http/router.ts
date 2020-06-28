import Router from 'koa-router'
import Handler from './handler'


const prefix = '/api'
const router = new Router<any, ICumstomContext>({prefix})


router.get('/search', async (ctx) => {

  if (ctx.query.keyword) {
    // 补全 url
    const current = Handler.makeupSearchOption(ctx.query)
    // console.log('-----current----> ', current)
    //
    const {originalCount, items} = await Handler.getSearchResult(current, ctx.headers)

    ctx.success({
      current,
      originalCount,
      items
    })

    // if (items && items.length > 0) {
    //   // 异步缓存后续结果
    //   repo.asyncCacheSearchResult(current, ctx.headers)
    // }
  } else {
    ctx.throw(400, '请输入关键词')
  }
})


export default router
