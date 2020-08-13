

import { Patient } from "./index_modle"
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
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getUserInfo(this.data.doctorUuid, this.data.name, (res) => {
      console.log(res);

      this.setData({
        patientList: res
      })

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
  onShow: function (e) {
    // console.log(wx.getStorageSync( penId'));
    // wx.setStorageSync('openId', 'oHaMa4w3GPBzUlb_8m9j9zPlyhqI');
    // let openId = wx.getStorageSync('openId');
    // if (openId) {
    //   wx.switchTab({
    //     url: '/pages/patient/index',
    //   })
    // } else {-
    //   wx.clearStorage();
    //   wx.navigateTo({
    //     url: '/pages/Authorization/index',
    //   })
    // }

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
      this.getHealthData();
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