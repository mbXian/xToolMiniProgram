// pages/base64/base64.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originalData: '',
    encodeData: ''
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

  bindInput: function (e) {
    this.setData({
      originalData: e.detail.value,
      encodeData: ''
    })
  },

  // 加密
  handleEncode() {
    console.log(this.data.originalData);
    if (this.data.originalData === undefined || this.data.originalData === '') {
      wx.showToast({
        title: '请先输入内容！',
        icon: 'error',
        duration: 2000
      }) 
    }
    var base64  = require('../../utils/base64Utils');
    this.setData({ encodeData: base64.encode(this.data.originalData) });
  }

})