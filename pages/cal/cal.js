Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5: "9",
    id6: "8",
    id7: "7",
    id8: "-",
    id9: "6",
    id10: "5",
    id11: "4",
    id12: "*",
    id13: "3",
    id14: "2",
    id15: "1",
    id16: "/",
    id17: "0",
    id18: ".",
    id19: "history",
    id20: "=",
    screenData:"0",
    lastIsOperator:false,
    arr:[],
    logs:[]
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
  history:function(){
    wx.navigateTo({
      url: '../calList/list',
    })
  },
  btnClick:function(event){
    //==================打log看输出的数据
    console.log(event.target.id);
    //==================获得点击的数
    var id=event.target.id;
    //如果点击的是退格键操作如下
    if(id==this.data.id1){
      var data=this.data.screenData;
      if(data==0){
        //如果值为0，不用做退格操作
        return ;
      }
      //如果不等于0开始往后减少
      data=data.substring(0,data.length-1);
      if(data==""||data=="-"){
        //如果退格到只有""或者-的时候赋值为0
        data=0;
      }
      //将screenData的值赋值为新data
      this.setData({screenData:data});
      //退格要减掉
      this.data.arr.pop();
    }else if(id==this.data.id2){
      //如果点击的是清屏键操作如下
      //设置当前的data=0
      this.setData({screenData:"0"});
      this.data.arr.length=0;
    }else if(id==this.data.id3){
      var data=this.data.screenData;
      if(data==0){
        return ;//如果等于0就直接返回
      }
      //获得第一个值判断是什么
      var firstWord=data.substring(0,1);
      if(firstWord=="-"){//得到的第一个值如果是-，则重新赋值
        data=data.substring(1,data.length);//如果是-，去掉第一个元素
        this.data.arr.shift();
      }else{
        data="-"+data;//如果原来是正数，则加上-之后返回回去
        this.data.arr.unshift("-");
      }
      this.setData({ screenData: data });
    }else if(id==this.data.id20){//点击=号需要得到相应的值
      var data=this.data.screenData;
      if(data==0){
        //如果输入的是0，就不需要处理
        return ;
      }
      //最后一个字符必须是数字点击=号才有意义，所以需要过滤一下
      var lastWord = data.substring(data.length-1,data.length);
      if (isNaN(lastWord)){
        return ;//说明不是数字，直接return
      }
      var num="";
      var lastOperator;
      var arr=this.data.arr;
      var optarr=[];
      for(var i in arr){
        if(isNaN(arr[i])==false||arr[i]==this.data.id18||arr[i]==this.data.id3){
          num+=arr[i];
        }else{
          lastOperator=arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num="";
        }
      }
        optarr.push(Number(num));
        var result = Number(optarr[0]*1.0);
        console.log(result+'哈哈');
        for(var i=1;i<optarr.length;i++){
          if (isNaN(optarr[i])){
            //加减乘除的处理
            if(optarr[1]==this.data.id4){
              result += Number(optarr[i+1]);
            }else if(optarr[1]==this.data.id8){
              result -= Number(optarr[i+1]);
            } else if (optarr[1] == this.data.id12){
              result *= Number(optarr[i+1]);
            } else if(optarr[1] == this.data.id16){
              result /= Number(optarr[i+1]);
            }
        }
      }
      //将每次计算结果保存到缓存中去
      this.data.logs.push(data+"="+result);
        wx.setStorageSync("callogs", this.data.logs);
        //取值
        console.log(wx.getStorageSync('callogs'));
      //计算完成后清空数组
      this.data.arr.length=0;
      this.data.arr.push(result);
      this.setData({screenData:result+""});
    }else{
      //==================将数据叠加在后面之前，先判断lastIsOperator是否是true，且不是0
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id16 || id ==                   this.data.id12) {
        if (this.data.lastIsOperator == true || this.data.screenData == 0) {
          return;
        }
      }
      //==================得到全局变量中的参数值 默认为0
      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;//如果参数是0
      } else {
        data = sd + id;
      }
      //==================给screenData设置数据
      this.setData({ screenData: data });
      this.data.arr.push(id);
      //判断是否是加减乘除，不能连续添加
      if (id == this.data.id4 || id == data.id8 || id == this.data.id16 || id == this.data.id12) {
        this.setData({ lastIsOperator: true });
      } else {
        this.setData({ lastIsOperator: false });
      }
    }
  }
})