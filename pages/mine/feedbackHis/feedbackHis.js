import { Patient } from "./feedbackHis.modle"
let patientInfo = new Patient();
var utils = require("../../../utils/util.js");
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ManufacturerList: [],
    searchTimerPopupShow: false,
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    timeType: 1,
    years,
    months,
    days,
    value: [],
    chooseTime: "",
  },
  // 获取器械品牌列表
  getManufacturerList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getManufacturerList((res) => {
      console.log(res);
      that.setData({
        ManufacturerList: res.data
      })
    });
  },
  // 查看详情
  checkDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mine/feedbackHis/checkDetail/checkDetail?id=' + id,
    })
  },
  // 预览图片
  preViewImage: function (e) {
    var url = utils.getDataSet(e, "url");
    // console.log(url);
    var urls = [];
    urls.push(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 选择时间
  selectTimer: function (e) {
    this.setData({
      searchTimerPopupShow: true
    });
  },
  done: function () {
    this.setData({
      chooseTime: this.data.startTime + " / " + this.data.endTime,
      searchTimerPopupShow: false,
      healthPageNum: 1,
      healthTotal: 1
    });
    this.getManufacturerList()
  },
  clear: function () {
    this.setData({
      searchTimerPopupShow: false
    });
  },
  changeTimerType: function (e) {
    var type = utils.getDataSet(e, "type");
    this.setData({
      timeType: type
    });
  },
  bindChange(e) {
    console.log(e);
    let that = this;
    const val = e.detail.value;
    if (this.data.timeType == 1) {
      this.setData({
        startTime: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]],
        startDate: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]]
      });
    } else {
      this.setData({
        endTime: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]],
        endDate: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]]
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let current = utils.getCurrentDate().split("-");
    console.log(current);
    current.forEach(element => {
      console.log(element - 1);
      that.setData({
        value: that.data.value.concat(element - 1)
      });
    });
    this.getManufacturerList()
    this.setData({
      startTime: utils.getCurrentDate(),
      endTime: utils.getCurrentDate(),
      // value:that.data.value.concat()
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})