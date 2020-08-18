// pages/patient/patientDetail/history/index.js
import { Matter } from "./history_modle"
let MatterInfo = new Matter();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: "2020-01-01",
    endDate: "2030-01-01",
    historyQues: [],
  },
  // 获取问题信息
  getMatterInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    MatterInfo.getMatterInfo(this.data.id, this.data.startDate, this.data.endDate, (res) => {
      console.log(res);
      this.setData({
        historyQues: res
      })

    });
  },
  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      startDate: e.detail.value,
    })
    this.getMatterInfo()
  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      endDate: e.detail.value,
    })
    this.getMatterInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id
    })
    this.getMatterInfo()
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