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
    // 页面显示
    //api.get('http://103.231.67.143:8079/DEVICE?QID=300001&QLEVEL=INFO&USERNAME=user&MAC=f9add388b2fc6ca7628deb27d3504245')
    api.get('http://localhost:8180/queryDeviceInfo/device/INFO')
        .then(res => {
        console.log(res);
        if(res.data.status == "success") {
          var tempRecords = res.data.record;
          var jsonArray = [];
          var totalPrices = 0;
          for (var i = 0; i < tempRecords.length; i++) {
            var record = tempRecords[i];
            var json = new Object;
            json.id = "" + (i + 1);
            json.equipId = record[0];
            json.address = record[1];
            var isOnline = record[3];
            if (isOnline == "1") {
              isOnline = "正常";
            } else {
              isOnline = "断开服务";
            }
            json.isOnline = isOnline
            jsonArray.push(json);
          }
          this.setData({
             records:jsonArray
          })
        }
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