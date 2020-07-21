let testUrl = {
  backendapi: 'https://testbossapp.yonwan.cn',
  externalapi: 'https://testbossapp.yonwan.cn',
  messageapi: 'https://testbossapp.yonwan.cn'
}
let prodUrl = {
  backendapi: 'https://boss.yonwan.cn',
  externalapi: 'https://boss.yonwan.cn',
  messageapi: 'https://boss.yonwan.cn'
}

let url = !window.location.origin.includes('test') ? testUrl : prodUrl
export default url
