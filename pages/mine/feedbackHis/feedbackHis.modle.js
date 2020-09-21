import { Comm } from "../../../utils/Common"
class Patient extends Comm {
  constructor() {
    super();
  }
  getManufacturerList(callback) {
    let openId = wx.getStorageSync('openId')
    let props = {
      url: "/api/vendor/getUserFeedback",
      contentType: 'application/json',
      data: {
        "createBy":openId
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
}
export { Patient };