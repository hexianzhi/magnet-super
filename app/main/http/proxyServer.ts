import koa from 'koa'
import router from './router'
import cors from '@koa/cors'
import Handler from './handler'
import ResponseMiddler from './middleware/response-template'

const app = new koa<any, ICumstomContext>()

let serverInfo: any
let koaServer: any

app.use(ResponseMiddler)
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

// async function start (config, preload) {
async function start() {
  try {
    await Handler.loadRuleByURL()
    console.log('-----I am loloadRuleByURLg end!!')
    // const customPort = config.customServerPort ? config.customServerPortValue : undefined
    // const port = config.port || customPort
    const port = 3000
    koaServer = await app.listen(port)
    const address = koaServer.address()
    serverInfo = {
      port: address.port,
      ip: getIPAddress(),
      local: 'localhost',
      url: `http://localhost:${address.port}`
    }

    // await reload(config, preload)

    return serverInfo
  } catch (e) {
    return {message: e.message}
  }
}
function getIPAddress() {
  const interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}
function stop(callback: () => void) {
  if (koaServer) {
    koaServer.close(() => {
      serverInfo = null
      koaServer = null
      callback()
    })
  }
}

// async function reload (config, preload) {
//   repo.applyConfig(config)

//   if (preload) {
//     const rule = await repo.loadRuleByURL()
//     const ruleLog = rule.map((it) => `[加载][${it.name}][${it.url}]`).join('\n')
//     const proxyCount = rule.filter(it => it.proxy).length
//     const log = `${ruleLog}\n${rule.length}个规则加载完成，其中${rule.length - proxyCount}个可直接使用，${proxyCount}个需要代理\n`
//     console.info(log)
//   }
// }

function isStarting() {
  return serverInfo !== null && serverInfo !== undefined
}

function getServerInfo() {
  return serverInfo
}

export default {
  start,
  stop,
  getServerInfo,
  isStarting,
}
