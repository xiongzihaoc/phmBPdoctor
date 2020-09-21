import { Patient } from "./isMessage.modle"

var getCurrentDate = require("../../../utils/util")
let patientInfo = new Patient();
Page({

  /**
 * 页面的初始数据
 */
  data: {
    date: "",
    dictLabel: "请选择",
    dictValue: "",
    ManufacturerName: "请选择",
    ManufacturerValue: "",
    InstrumentName: "请选择",
    InstrumentValue: "",
    instrDisabled: true,
    instrCondition: "",
    messObj: {},
    MethodList: [],
    InstrumentList: [],
    ManufacturerList: [],
    prepuce_method: "prepuce_method"
  },

  // 获取所有患者列表
  getUserInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getUserInfo(this.data.messObj, (res) => {
      console.log(res);
    });
  },
  // 获取手术方式列表
  getMethodList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getMethodList(that.data.prepuce_method, (res) => {
      console.log(res)
      that.setData({
        MethodList: res.data
      })

    });
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
  // 获取器械类型列表
  getInstrumentList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getInstrumentList(that.data.ManufacturerValue, (res) => {
      console.log(res);
      that.setData({
        InstrumentList: res.data
      })
    });
  },
  // 选择手术时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 选择手术方式
  bindMethodChange: function (e) {
    let that = this
    let MethodIndex = e.detail.value
    that.setData({
      dictLabel: that.data.MethodList[MethodIndex].dictLabel,
      dictValue: that.data.MethodList[MethodIndex].dictValue
    })
  },
  // 选择器械品牌
  bindManufacturerChange: function (e) {
    let that = this
    let ManufacturerIndex = e.detail.value
    that.setData({
      ManufacturerName: that.data.ManufacturerList[ManufacturerIndex].name,
      ManufacturerValue: that.data.ManufacturerList[ManufacturerIndex].id,
      instrDisabled: false,
    })
    this.getInstrumentList()
  },
  // 选择器械类型
  bindInstrumentChange: function (e) {
    let that = this
    let InstrumentIndex = e.detail.value
    that.setData({
      InstrumentName: that.data.InstrumentList[InstrumentIndex].name,
      InstrumentValue: that.data.InstrumentList[InstrumentIndex].id
    })
  },
  // 输入器械建议
  bindCondition: function (e) {
    let that = this
    console.log(e.detail.value);

    that.setData({
      instrCondition: e.detail.value
    })
  },
  btnSave: function () {
    let docUuid = wx.getStorageSync('openId')
    let patientUuid = wx.getStorageSync('patientUuid')
    let that = this
    let messageObj = {
      uuid: patientUuid,
      doctoruuid: docUuid,
      prepuceOperateTime: that.data.date,
      prepuceOperateMethod: that.data.dictValue,
      feedbackContent: that.data.instrCondition,
      vendorId: that.data.ManufacturerValue,
      goodsModelId: that.data.InstrumentValue,
    }
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.btnSave(messageObj,(res) => {
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = getCurrentDate.getCurrentDate()
    this.setData({
      date: time
    })
    this.getMethodList()
    this.getManufacturerList()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})