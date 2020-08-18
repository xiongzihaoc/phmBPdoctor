import { Comm } from "../../utils/Common.js"
class Patient extends Comm {
  constructor() {
    super();
  }
  getUserInfo(doctorUuid, name, pageNum, pageSzie, callback) {
    let props = {
      url: "/api/getBindPatients",
      contentType: 'application/json',
      data: {
        "doctorUuid": doctorUuid,
        "name": name,
        "pageNum": pageNum,
        "pageSize": pageSzie
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
      },
      eCallBack: err => {
        console.log(err);
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