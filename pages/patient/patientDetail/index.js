// pages/patientDetail/index.js
import { Matter, UserInfo, Report, Maint, FollowMore } from "./index.modle"
let MatterInfo = new Matter();
let userInfo = new UserInfo();
let ReportInfo = new Report();
let MaintInfo = new Maint();
let FollowMoreInfo = new FollowMore();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientId: "",
    id: "",
    reportId: "",
    maintenanceId: "",
    userInfo: {},
    Matter: {},
    reportList: {},
    MaintList: {},
    isFinsh:{},
    patientUuid:"",
  },
  // 获取患者个人信息
  getUserInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    userInfo.getUserInfo(this.data.patientId, (res) => {
      console.log(res);
      
      this.setData({
        patientUuid:res.uuid,
        userInfo: res
      })

    });
  },
  // 获取问题信息
  getMatterInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    MatterInfo.getMatterInfo(this.data.id, (res) => {
      this.setData({
        Matter: res[0],
      })

    });
  },
  // 获取维护详情信息
  getMaintInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    MaintInfo.getMaintInfo(this.data.maintenanceId, (res) => {
      console.log(res,666);
      
      this.setData({
        MaintList: res[0],
      })

    });
  },
  // 获取随访问卷更多信息
  getFollowInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    FollowMoreInfo.getFollowInfo(this.data.patientId, (res) => {
      console.log(res,333333333333333333);
      
     this.setData({
       isFinsh : res
     })


    });
  },
  // 获取报告单信息
  getReportInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    ReportInfo.getReportInfo(this.data.reportId, (res) => {
      this.setData({
        reportList: res[0],
      })

    });
  },
  // 跳转个人信息详情
  jumpDetail: function () {
    const patientId = this.data.patientId
    wx.navigateTo({
      url: `/pages/patient/patientDetail/userInfoDetail/index?id=${patientId}`,
    })
  },
  // 跳转历史
  jumpHistory: function () {
    const id = this.data.id
    wx.navigateTo({
      url: '/pages/patient/patientDetail/history/index?id=' + id
    })
  },
  // 跳转发送消息
  sendMessage: function () {
    wx.switchTab(
      {
        url: "/pages/message/index",
      }
    )

  },
  // 跳转到问卷设置
  setWenjuan: function () {
    const id = this.data.patientId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/index?id=' + id,
    })
  },
  // 跳转到随访问卷更多记录
  jumpFollowMore: function () {
    const id = this.data.patientId
    console.log(id);
    wx.navigateTo({
      url: '/pages/patient/patientDetail/followMore/followMore?id=' + id,
    })
  },
  // 跳转到报告单更多
  bingtapMore: function () {
    const id = this.data.patientId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/more/more?id=' + id,
    })
  },
  // 跳转到维护详情
  bingtapmaintenance: function () {
    const id = this.data.maintenanceId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/maintenance/maintenance?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patientId: options.id,
      id: options.id,
      reportId: options.id,
      maintenanceId: options.id
    })
    // 获取个人信息
    this.getUserInfo()
    // 获取问题记录信息
    this.getMatterInfo()
    // 获取报告单信息
    this.getReportInfo()
    // 获取维护详情信息
    this.getMaintInfo()
    // 获取随访更多信息
    this.getFollowInfo()

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