
var str = [];
wx.request({
  url: 'https://192.168.1.123:8443/easyjob/getAddressData',
  success(res) {
    if (res.data) {

      str = res.data;
     
    }
  }
})
function getAreaInfo(callBack){
  callBack(str);
 
}

module.exports.getAreaInfo = getAreaInfo;