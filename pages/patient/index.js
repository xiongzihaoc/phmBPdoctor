

import { Patient } from "./index_modle"
import{TimUtils} from "../../utils/TimUtils.js"
const timUtils = new TimUtils();
let patientInfo = new Patient();
Page({

  /**
 * 页面的初始数据
 */
  data: {
    name: "",
    doctorUuid: "",
    loadmoreShow: "false",
    loadmoreType: "end",
    healthPageSize: "",
    healthList: [],
    healthTotal: 1,
    healthPageNum: 1,
    healthPageSize: 6,
    isLogin:false,
  },
  // 点击单个患者查看详情
  patientListTap: function (e) {
    const id = e.currentTarget.dataset.patientmessage.patientUuid
    wx.setStorageSync('patientUuid', id)
    this.setData({
      doctorUuid: id
    })
    wx.navigateTo({
      url: '/pages/patient/patientDetail/index?id=' + id,
    })
  },
  // 获取所有患者列表
  getUserInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getUserInfo(this.data.doctorUuid, this.data.name, this.data.healthPageNum, this.data.healthPageSize, (res) => {
      console.log(res);
      this.setData({
        patientList: res
      })
      var num = Math.round(res.count / this.data.healthPageSize);
      if (num % that.data.healthPageSize > 0) {
        num++;
      }
      if (num == 0) {
        num++;
      }
      that.setData({
        healthList: that.data.healthList.concat(res.data),
        healthTotal: num
      });
      console.log(that.data.healthTotal);

    });
  },
  // 搜索患者名称
  bindinputSearch: function (e) {
    this.setData({
      name: e.detail.value
    })
    this.getUserInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openId = wx.getStorageSync('openId');
    this.setData({
      doctorUuid: openId
    })
    // this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) { 
    let that = this;
    let openId = wx.getStorageSync('openId');
    if (openId) {
      this.setData({
        isLogin: true
      });
      wx.showLoading({
        title: '加载中...',
      })
      this.getUserInfo();
      timUtils.LoginTim();
    } else {
      wx.clearStorage();
      wx.nextTick(() => {
        wx.navigateTo({
          url: '/pages/Authorization/index',
        })
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */onUnload: function () {

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
    let that = this;
    if (this.data.healthTotal > this.data.healthPageNum) {
      this.setData({
        loadmoreShow: "true",
        loadmoreType: "loading",
        healthPageNum: that.data.healthPageNum + 1
      });
      this.getUserInfo();
    } else {
      this.setData({
        loadmoreShow: "true",
        loadmoreType: "end"
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})