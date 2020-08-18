// pages/patient/patientDetail/maintenance/maintenance.js
import { Maint } from "./maintenance.modle"
let MaintInfo = new Maint();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maintenanceId: "",
    startDate: "2020-01-01",
    endDate: "2030-01-01",
    MaintList: [],
  },
  // 获取维护详情信息
  getMaintInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    MaintInfo.getMaintInfo(this.data.maintenanceId, this.data.startDate, this.data.endDate, (res) => {
      console.log(res);
      this.setData({
        MaintList: res,
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
    this.getMaintInfo()
  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      endDate: e.detail.value,
    })
    this.getMaintInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      maintenanceId: options.id
    })
    this.getMaintInfo()
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