import { Patient } from "./feedbackPro.modle"
let patientInfo = new Patient();
var utils = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    ManufacturerName: "请选择",
    ManufacturerValue: "",
    ManufacturerList: [],
    InstrumentName: "请选择",
    InstrumentValue: "",
    getInstrumentList: [],
    instrDisabled: true,
    instrCondition: "",
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
  // 选择品牌
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
  // 输入反馈问题
  bindCondition: function (e) {
    let that = this
    console.log(e.detail.value);

    that.setData({
      instrCondition: e.detail.value
    })
  },
  // 上传图片
  upload: function () {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths);
        if (that.data.imageList.length < 9) {
          that.setData({
            imageList: that.data.imageList.concat(res.tempFilePaths)
          })
        } else {
          wx.showToast({
            title: '最多只能上传9张图片',
            icon: 'none'
          })
          return
        }

      }
    })
  },
  // 保存
  btnSave: function (e) {
    let createBy = wx.getStorageSync('openId')
    let patientUuid = wx.getStorageSync('patientUuid')
    let that = this
    let messageObj = {
      patientUuid: patientUuid,
      userType: 0,
      content: that.data.instrCondition,
      vendorId: that.data.ManufacturerValue,
      goodsModelId: that.data.InstrumentValue,
      photos: that.data.imageList
    }
    console.log(messageObj);

    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.btnSave(messageObj, (res) => {
      if (res.code != 200) {
        wx.showToast({
          title: '保存失败',
        })
      } else {
        wx.switchTab({
          url: '/pages/mine/index',
        })
      }
    });

  },
  // 预览图片
  // preViewImg: function (e) {
  //   console.log(e);
  //   var url = utils.getDataSet(e, "url");
  //   var urls = [];
  //   urls.push(url);
  //   wx.previewImage({
  //     current: url, // 当前显示图片的http链接
  //     urls: urls // 需要预览的图片http链接列表
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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