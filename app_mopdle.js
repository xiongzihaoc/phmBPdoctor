import { Comm } from "./utils/Common.js"
class AppModle extends Comm {
  constructor() {
    super();
  }
  getAppId(){
    let props = {
      url: "/api/getAppId",
      contentType: 'application/json',
      type:'GET',
      sCallBack: res => {
        callback(res);
      },
      eCallBack: err => {
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
  
}
export {AppModle};