
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

// window.ipcRenderer.on('settingConfig', (_event, message) => {
//   let config = JSON.parse(message)
//   console.log('接收到配置:', config)
//   // Object.keys(config).forEach((key) => {
//   //   localStorage.setItem(key, config[key])
//   // })
// })
