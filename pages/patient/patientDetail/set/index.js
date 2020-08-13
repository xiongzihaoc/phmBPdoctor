// pages/patient/patientDetail/set/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packagesList: [],
  },
  // 添加问卷
  addWenjuan: function () {
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/addWenjuan/index',
    })
  },
  addCombo: function () {
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/addWenjuan/add/add',
    })
  },

  // 保存套餐
  btnSaveCombo:function(){
    

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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    console.log(this.data.packagesList);
    
    // var taocList = []
    // if (that.data.checkedList != undefined) {
    //   taocList.push(that.data.checkedList)
    //   this.setData({
    //     taocList: taocList
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