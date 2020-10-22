const urls = {
  "dev": "https://test.phmzykj.com/bp",//开发
  "test": "http://192.168.0.109:8087/zhuoya-bp",//测试
  "pro": "https://www.phmzykj.com/bp"//正式
}
const Config = {
  mode: "pro",
  baseUrl: urls["pro"],
  staticUrl: "https://www.phmzykj.com/bp",
  // staticUrl: "https://192.168.0.109:8087/bp",
  key: "BYHBZ-FV5C4-K6RUC-XCZFN-YYE2E-PDFPN",
  version: "1.0.0"
}
export { Config }