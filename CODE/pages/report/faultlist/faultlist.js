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
        machineCode:"加载中,请稍等...",
        warningId:"",
        warningMessage:"",
        warningDate:""
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
    var userName = wx.getStorageSync("userName");
    var password = wx.getStorageSync("userPassword");
    var now = Moment(new Date()).format('YYYY-MM-DD');
    var parm = 'userName=' + userName + '&password' + password;
    api.get('https://www.gablecafe.cn/gaibo-query-server/queryWarningInfo/warning?' + parm)
        .then(res => {
        console.log(res);
        if(res.data.isError  =="false") {
          var tempRecords = res.data.warningDtos;
          var jsonArray = [];
          for (var i = 0; i < tempRecords.length; i++) {
            var record = tempRecords[i];
            var json = new Object;
            json.id = "" + (i + 1);
            json.machineCode = record.machineCode;
            json.warningId = record.warningId;
            json.warningMessage = record.warningMessage;

            var date = record.warningDate;
            var tempDate = new Date(Date.parse(date.replace(/-/g, "/")));
            var orderTime = Moment(tempDate).format('MM-DD HH:mm');
            if (date.indexOf(now) != -1) {
              orderTime = Moment(tempDate).format('HH:mm');
              orderTime = "今天 " + orderTime;
            }
            json.warningDate = orderTime;
            jsonArray.push(json);
          }
          if (tempRecords.length == 0) {
            var json = new Object;
            json.machineCode = "暂无报警";
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