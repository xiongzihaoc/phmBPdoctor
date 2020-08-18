// pages/mine/index.js
var QRCode = require('../../utils/weapp-qrcode')
import { RegModle } from './index.modle'
let RegModleInfo = new RegModle();
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    userName: '',
    headerUrl: "",
    isLogin: false,
    List: [
      { id: 1, name: "个人信息", icon: "iconfont icon-gerenxinxi" },
      { id: 2, name: "二维码", icon: "iconfont icon-ico" },
    ],
  },
  // 跳转个人信息
  bindJumpUserInfo: function (e) {
    wx.navigateTo({
      url: '/pages/mine/userInfo/userInfo',
    })
  },
  // 查看二维码
  viewErweima: function () {
    this.setData({
      show: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openId = wx.getStorageSync('openId')
    QRCode = new QRCode('canvas', {
      // usingIn: this,
      text: openId,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
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
    let that = this;
    let openId = wx.getStorageSync('openId');
    console.log(app);
    if (openId) {
      this.setData({
        isLogin: true
      });
      wx.showLoading({
        title: '加载中...',
      })
      RegModleInfo.getUserInfo((data) => {
        console.log(data);
        that.setData({
          userName: data.name,
          headerUrl: data.avatarUrl
        });
      });
    } else {
      if (!app.userIndex) {
        app.userIndex = true;
        wx.clearStorage();
        wx.nextTick(() => {
          wx.navigateTo({
            url: '/pages/Authorization/index',
          })
        });
      }
    }
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