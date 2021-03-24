// pages/base64/base64.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    md5OriginalData: '',
    md5EncodeData: ''
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

  bindInputMd5: function (e) {
    this.setData({
      md5OriginalData: e.detail.value,
      md5EncodeData: ''
    })
  },

  // 加密
  handleEncodeMd5() {
    if (this.data.md5OriginalData === undefined || this.data.md5OriginalData === '') {
      wx.showToast({
        title: '请先输入内容！',
        icon: 'error',
        duration: 2000
      }) 
    }
    var md5Utils  = require('../../utils/md5');
    console.log(md5Utils.hexMD5(this.data.md5OriginalData));
    this.setData({ md5EncodeData: md5Utils.hexMD5(this.data.md5OriginalData)});
  }

})