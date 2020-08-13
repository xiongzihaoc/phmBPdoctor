import { Comm } from "../../../../../utils/Common"

// 随访更多
class FollowMore extends Comm {
  constructor() {
    super();
  }
  getFollowInfoNum(patientUuid, callback) {
    let props = {
      url: "/api/getQuestionnaire",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
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
export { FollowMore };