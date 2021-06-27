// pages/base64/base64.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('weather page = ' + JSON.stringify(getApp().openId));
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
    wx.request({
      url: 'http://47.110.93.171:8091/weather/getRealTimeData', //仅为示例，并非真实的接口地址
      data: {
        
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'accept': 'application/json;charset=UTF-8'
      },
      success (res) {
        console.log(res.data)
      }
    })
  }

})