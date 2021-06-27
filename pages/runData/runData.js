Page({

  /**
   * 页面的初始数据
   */
  data: {
    runDataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title: '加载中…'});
    var that = this;

    wx.getWeRunData({
      success (res) {
        // 拿 encryptedData 到开发者后台解密开放数据
        const encryptedData = res.encryptedData
        const iv = res.iv;
        // 或拿 cloudID 通过云调用直接获取开放数据
        const cloudID = res.cloudID

        //请求解密运动数据
        wx.request({
          method: 'POST',
          url: 'http://localhost:8091/wechat/decryptRunData',
          data: {
            openId: getApp().openId,
            encryptedData: encryptedData,
            iv: iv
          },
          success: (decryptRunDataRes) => {
            const {
              runDataItemVOList
            } = decryptRunDataRes.data.data;
            that.setData({
              runDataList: runDataItemVOList
            })
            wx.hideLoading();
          }
        })
      }
    })
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

})