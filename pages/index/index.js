
var canIUseSession = true;
const {
  $Message
} = require('../../dist/base/index');
const app = getApp();
var model = require('../../model/model.js')

var show = false;
var item = {};

Page({
  data: {
    bsshow:"请输入搜索的公司",
    canIUseSession: true,
    banner: ["http://m.qpic.cn/psb?/V13Cv6dH1DBP2N/urWqqHAaxru5d7oIcAZyHPb0iQgodIsxkWnDtBUfj1Q!/b/dE0BAAAAAAAA&bo=IAMsAQAAAAARBz4!&rf=viewer_4", "http://m.qpic.cn/psb?/V13Cv6dH1DBP2N/el7r8l11ekGE5B7cVvhYRU0XGajvACkJoDaTNWryC7U!/b/dL8AAAAAAAAA&bo=IAMsAQAAAAARFy4!&rf=viewer_4", "http://m.qpic.cn/psb?/V13Cv6dH1DBP2N/8ijR1ZEFDq7G2sVoLwOZ7qmnvTFkIAYX1VFIQG.mpJo!/b/dLgAAAAAAAAA&bo=IAMsAQAAAAARFy4!&rf=viewer_4"],
    visible: true,
    //mayulong
    goods: [],
    city: "获取地址",
    county: "",

    province: "",
    hidden: false,
    nocancel: false,
    actions: [

    ],
    msgList: [{
      url: "url",
      title: "易职招聘小程序正式上线啦..."
    }, {
      url: "url",
      title: "苏州园区三星工厂大量招工..."
    }, {
      url: "url",
      title: "苏州园区大量招聘普工.."
    }, {
      url: "url",
      title: "苏州园区大量招聘普工啦啦啦啦..."
    }
    ],
    item: {
      show: show
    },

    bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
  },
  ggclick: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  onLoad: function (options) {
    
    var that = this;

    var isAuth = app.globalData.isAuth;
   
 
     
    console.log("onloadIsAuth:" + isAuth)
    wx.getSetting({
      success(res) {
        //console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        if (res.authSetting['scope.userInfo']) {
          console.log("getSetting:" + res.authSetting['scope.userInfo']);
          that.getUserInfo();
          var isAuth = app.globalData.isAuth;

        } else {
          var isAuth = app.globalData.isAuth;
          console.log("weishouquan" + isAuth)
          console.log("weishouquan")
          that.setData({
            visible: false
          })

        }

      }

    })
    that.loadLocation();
  },
  loadLocation: function () {
    var me = this;
    wx.getLocation({
      type: "wgs84",
      altitude: true,

      success: function (res) {
        console.log("wx.location:" + res)
        if (res && res.latitude && res.longitude) {
          var longitude = res.longitude,
            latitude = res.latitude;
          console.log("1:" + longitude + "2:" + latitude)
          me.loadCity(longitude, latitude);
        } else {
          me.setData({
            city: '获取地址失败'
          });
        }
      },
    })
  },
  loadCity: function (longitude, latitude) {
    var me = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=859d16285fd000feec89e9032513f8bb&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/jason'
      },
      success: function (res) {
        if (res && res.data) {

          console.log(res)

          var city1 = res.data.result.addressComponent.city;
          var district = res.data.result.addressComponent.district
          var street = res.data.result.addressComponent.street;
          var street_number = res.data.result.addressComponent.street_number
          me.setData({
            city: city1,
            county: district
          })

        }


      }



    })
  },
  doLogin: function (e) {
    console.log(e.detail);
    var isAuth = app.globalData.isAuth;
    //that.setData({ isAuth: true })
    console.log("dologin:" + isAuth)
    wx.login({
      success: (res) => {
        console.log(res);
        // 获取登录临时凭证
        //var appId = 'wx6ba645c41614ff12';
        //var secret = 'f9946a103c6a54c6c04f76fab8105814';
        // 调用后端，获取微信的session_key, 

        console.log(res.code);
        this.getUserInfo();
        this.cancel();
      }
    })
  },


  getUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.userInfoSetInSQL(userInfo)
      },
      fail: function () {
        // userAccess()
      }
    })
  },

  userInfoSetInSQL: function (userInfo) {
    wx.getStorage({
      key: 'third_Session',

      success: function (res2) {
        console.log("RES2.DATA:" + res2.data);
        wx.request({
          url: 'https://192.168.1.123:8443/easyjob/upduser',
          method: "POST",
          data: {
            openid: res2.data,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            province: userInfo.province,
            city: userInfo.city,
            country: userInfo.country
          },
          success: function (res2) {
            if (res2.data) {
              //SQL更新用户数据成功
              console.log("SQL更新用户数据成功");
              console.log(res2.data);
            } else {
              //SQL更新用户数据失败
              console.log("SQL更新用户数据失败");
            }
          }
        })
      }
    })

  },




  onShareAppMessage: function () {
    return {
      title: 'EASYJOB',
      desc: '一个面向蓝领的招聘平台',
      path: '/pages/index/index?uid=4719784'
    }
  },

  navigateToAddress: function () {
    wx.navigateTo({
      url: '../../pages/addindex/addindex'
    });
  },


  handleClick3({
    detail
  }) {
    var that = this;
    const index = detail.index;
    that.setData({
      visible: false
    });
  },

  cancel: function () {
    var isAuth = app.globalData.isAuth;
    this.setData({
      visible: true
    })
  },
  confirm: function () {
    var isAuth = app.globalData.isAuth;
    this.setData({
      isAuth: true
    });
    console.log("clicked confirm");
  },
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function () { },
  nono: function () { },
 //今日招聘跳转
  gojrzp: function () {
    wx.navigateTo({
      url: '../jrzp/jrzp/jrzp',
    })
  },
  gofwfw: function () {
    wx.navigateTo({
      url: '../fwfw/fwfw',
    })
  },
  ggclick: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})