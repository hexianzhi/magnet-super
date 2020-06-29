
import moment from 'moment'

const Format = {
  formatSize (size: string) {
    if (/^\d+$/.test(size)) {
      const num = parseInt(size)
      let unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let index = Math.floor(Math.log(num) / Math.log(1024))
      return (num / Math.pow(1024, index)).toFixed(2) + ' ' + unit[index]
    } else {
      return ''
    }
  },

  formatDate (time: number) {
    if (!time) return ''
    const momentTime = moment(time)
    return momentTime.format(momentTime.hour() === 0 && momentTime.minute() === 0 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm')
  }
}
export default Format

// Vue.prototype.highlight = function (keyword, content, className) {
//   let str = ''
//   let array = highlightWord(keyword, content)
//   array.forEach((it) => {
//     if (it.key) {
//       str += `<span class='${className}'>${it.str}</span>`
//     } else {
//       str += it.str
//     }
//   })
//   return str
// }


// Vue.filter('date_interval', function (time) {
//   if (/^\d+$/.test(time)) {
//     let delta = moment().valueOf() - time
//     delta /= 60 * 1000
//     if (delta < 60) {
//       return Math.floor(delta) + ' 分钟前'
//     }
//     delta /= 60
//     if (delta < 24) {
//       return Math.floor(delta) + ' 小时前'
//     }
//     return moment(time).format('YYYY-MM-DD')
//   } else {
//     return time
//   }
// })

// Vue.filter('hash', function (magnet) {
//   return magnet.replace('magnet:?xt=urn:btih:', '')
// })


// Vue.filter('formatURL', function (url) {
//   if (url && url.startsWith('http')) {
//     const params = 'from=mw'
//     const symbol = url.indexOf('?') !== -1 ? '&' : '?'
//     return url + symbol + params
//   } else {
//     return url
//   }
// })
