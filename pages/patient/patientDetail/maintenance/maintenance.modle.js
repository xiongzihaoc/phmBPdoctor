import { Comm } from "../../../../utils/Common"
// 维护详情
class Maint extends Comm {
  constructor() {
    super();
  }
  getMaintInfo(patientUuid, createTime, endTime, callback) {
    let props = {
      url: "/api/getMaintain",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        "actualTime": createTime,
        "endTime": endTime,
        pageNum: 1000,
        pageSize: 1000,
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
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
export { Maint };