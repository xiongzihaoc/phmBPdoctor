// myUserInfo/pages/reg/reg.js
import { RegModle } from "./index.modle"
let regModle = new RegModle();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null
  },
  bindgetuserinfo: function (e) {
    console.log(e);
    wx.showLoading({
      title: '授权中...',
    });
    regModle.getUserInfo(e.detail.encryptedData, e.detail.iv, this.data.code, (data) => {
      console.log(data);
      wx.setStorageSync('token', data.access_token);
      wx.setStorageSync('openId', data.openId);
      wx.setStorageSync('userName', data.userInfo.name);
      wx.setStorageSync('avatarUrl', data.userInfo.avatarUrl);
      wx.navigateBack({
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        that.setData({
          code: res.code
        })
      }
    })
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

  },
})