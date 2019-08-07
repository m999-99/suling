// pages/jrzp/gspeople/gspeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: ['博士', '研究生', '本科', '大专', '中专', '高中', '初中','小学'],
    baseInfo: {
      id: '', // the id of a piece data
      userName: '',
      userGender: 2,
      birthData: '',
      eMail: '',
      phoneNumber: '',
      job: '',
      salary: '',
      address: '',

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  success:function(){
    wx.navigateTo({
      url: '../../jrzp/success/success',
    })
  },
  onLoad: function (options) {
    console.log(options.etprzid)
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