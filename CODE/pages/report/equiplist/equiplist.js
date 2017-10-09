var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var Moment = require("../../../utils/Moment.js");
Page({
  data:{
    // text:"这是一个页面"
    records:[
      {
        id:"",
        equipId:"加载中,请稍等...",
        isOnline:"",
        status:"",
        address:""
      }
    ]
  },
  bindfocus:function(){
  },
  bindblur:function(){
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    console.log("onReady======");
  },
  onShow:function(){
    var userName = wx.getStorageSync("userName");
    var password = wx.getStorageSync("userPassword");
    
    var param = '?userName=' + userName + '&password=' + password;

    // 页面显示
    api.get('http://localhost:8180/queryDeviceInfo/device/INFO'+param)
        .then(res => {
        console.log(res);
       if (res == null || res.data == null) {
          console.error('网络请求异常');
          return;
        } else if (res.data.isError == "false") {
          var tempRecords = res.data.deviceInfoDos;
          var jsonArray = [];
          for (var i = 0; i < tempRecords.length; i++) {
            var record = tempRecords[i];
            var json = new Object;
            json.id = "" + (i + 1);
            json.equipId = record.machineNo;
            json.address = record.siteSimple;
            var isOnline = record.onOffLine;
            if (isOnline == "1") {
              json.status = "正常";
            } else {
              json.status = "异常";
            }
            json.isOnline = isOnline
            jsonArray.push(json);
          }//for end
          this.setData({
             records:jsonArray
          })
        }//if end
      })
    console.log("onShow======");
  },
  onHide:function(){
    // 页面隐藏
    console.log("onHide======");
  },
  onUnload:function(){
    // 页面关闭
    console.log("onUnload======");
  }
})