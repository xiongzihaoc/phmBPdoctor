// pages/patient/patientDetail/userInfoDetail/index.js
import { UserInfo } from "./userInfo.modle"
let userInfo = new UserInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    userInfo: {},
  },
  // 获取患者个人详细信息
  getUserInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    userInfo.getUserInfo(this.data.id, (res) => {
      console.log(res);
      this.setData({
        userInfo: res
      })

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('openId');
    this.setData({
      id: id
    })
    this.getUserInfo()
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