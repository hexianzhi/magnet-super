import { ipcRenderer } from 'electron'


function getRule () {
  console.log('-----I am sendSync!!')
  return ipcRenderer.sendSync('get-rule')
}

export default {
  getRule
}
