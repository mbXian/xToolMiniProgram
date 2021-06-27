Page({
  data: {
    nickName: '',
    avatarUrl: ''
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success (res) {
        if (res.code) {
          if (getApp().openId == null) {
            //请求openId
            wx.request({
              url: 'http://localhost:8091/wechat/getSession?jsCode=' + res.code,
              success: (getSessionRes) => {
                if (getSessionRes.data.data) {
                  getApp().openId = getSessionRes.data.data.openId;
                  wx.getLocation({
                    type: 'wgs84',
                    success (res) {
                      const latitude = res.latitude
                      const longitude = res.longitude
                      getApp().latitude = latitude;
                      getApp().longitude = longitude;
                    },
                    fail (error) {
                      console.log('位置未开启');
                    }
                   })
                }
              }
            }) 
          }
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail (error) {
        console.log('error');
      }
    })    
  },

  handleNav(e) {
    var that = this;

    let tag = e.currentTarget.dataset.tag;
    let userInfo = getApp().userInfo;
    if (userInfo) {
      this.navToPageByTag(tag)
    } else {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          let appInstance = getApp()
          appInstance.userInfo = res.userInfo
          console.log(JSON.stringify(appInstance.userInfo));
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
          this.navToPageByTag(tag)
        }
      })
    }
  },

  navToPageByTag(tag) {
    if ('cal' === tag) {
      this.handleToCal()
    } else if ('base64' === tag) {
      this.handleBase64()
    } else if ('md5' === tag) {
      this.handleMD5()
    } else if ('weather' === tag) {
      this.handleWeather()
    } else if ('runData' === tag) {
      this.handleRunData()
    } else if ('more' === tag) {
      this.handleMore()
    }
  },

  handleToCal() {
    wx.navigateTo({
      url: '../cal/cal'
    })
  },

  handleMore() {
    wx.showToast({
      title: '敬请期待！',
      icon: 'error',
      duration: 2000
    })    
  },
  
  handleBase64() {
    wx.navigateTo({
      url: '../base64/base64'
    })
  },

  handleMD5() {
    wx.navigateTo({
      url: '../md5/md5'
    })
  },

  handleWeather() {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },

  handleRunData() {
    wx.navigateTo({
      url: '../runData/runData'
    })
  }

});