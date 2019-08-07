// pages/jrzp/jrzp.js
//引入data文件夹中的js数据
var app = getApp()
 var newsData=require("../../data/newsdata.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    useData:""
  },
  goDetail: function () {
    wx.switchTab({
      url: '../../live/detail/detail',
    })
  },
  goGsdetail:function(event) {
    console.log(event);
    wx.navigateTo({
      url: '../../jrzp/gsdetail/gsdetail?etprzid=' + event.currentTarget.dataset.etprzid
    })
  },
  goVideo: function () {
    wx.switchTab({
      url: '../../live/detail/detail',
    })
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    var that=this;
    
    that.setData({
      useData:newsData.initData
    })
//     wx.request({
//   url: 'https://192.168.1.123:8443/easyjob/entprz/listentprz',
//   method:'GET',
//   success(res){
  
//     console.log("resdata:"+res.data)
//       that.setData({
//         useData: res.data
//       })
      
      
   
//   }
//  })
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
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

