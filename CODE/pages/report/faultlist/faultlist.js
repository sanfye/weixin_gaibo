var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var Moment = require("../../../utils/Moment.js");
Page({
  //data:设置页面的初始数据
  data:{
    // text:"这是一个页面"
    records:[
      {
        id:"",
        equipId:"加载中,请稍等...",
        errorMsg:"",
        date:""
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
    api.get('http://103.231.67.143:8079/WARNING?QID=200001&QLEVEL=WARNING&USERNAME=user&MAC=081fa7a80661901dcb6051eaf0cfbfb6')
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
            json.errorMsg = record[2];
            var tempDate = record[3];
            var date = new Date(tempDate);
            tempDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            json.date = tempDate;
            jsonArray.push(json);
          }
          if (tempRecords.length == 0) {
            var json = new Object;
            json.id = "";
            json.equipId = "没有故障";
            json.errorMsg = "";
            json.date = "";
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
  },
  onPullDownRefresh:function(){
    //监听也没下拉动作
    console.log("onPullDownRefresh======");
  }
})