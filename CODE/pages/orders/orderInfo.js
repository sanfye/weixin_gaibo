// pages/orders/orderInfo.js
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var Moment = require("../../utils/Moment.js");
Page({
  systemInfo: {},
  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"
    records: [
      {
        id: "",
        productName: "加载中,请稍等...",
        price: "",
        orderTime: "",
        payType: "",
        machineNo: ""
      }
    ],
    labelStart: '开始时间',
    labelEnd: '结束时间',
    labelCanlendar: '--请选择--',
    labelCups: '总杯数',
    labelAccount: '总收益 (元)',
    totalCups: 0,
    totalAccount: 0,
    machineNo:'',
    canlendarUrl: '../../images/calendar-icon.png',
    startDate: Moment(new Date()).format('YYYY-MM-DD'),
    endDate: Moment(new Date()).format('YYYY-MM-DD')
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad======");
    // console.log(options);
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow-begin======");
    // var month = Moment(new Date()).format('YYYY-MM');
    // var now = Moment(new Date()).format('YYYY-MM-DD');
    // var data = '{startTime:20170323000000 , endTime:20170821230000}' ;
    var value = wx.getStorageSync('ROOM_SOURCE_DATE');
    var dateStart = value.checkInDate;
    var dateEnd = value.checkOutDate;
    console.log("dateStart:" + dateStart);
     // 页面显示
    api.get('http://localhost:8180/queryOrderInfo/orderInfo?startTime=20170323000000&endTime=20170821230000')
    .then(res =>{
      console.log(res);
      if (res == null || res.data ==null ){
        console.error('网络请求失败');
        return;  
      }else if(res.data.status == "success"){
        console.log("res.data.orderInfoVos======" + res.data.orderInfoVos);
        var tempRecords = res.data.orderInfoVos ;
        var jsonArray = [];
        var totalPrices = 0 ;
        console.log("tempRecords======" + tempRecords.length);
        for (var i = 0; i <= tempRecords.length ; i++ ){
         
          //取出记录内容
          var record = tempRecords[i] ;
          console.log("tempRecords======" + record.machineNo + '-' + record.orderNo + '-' + record.productName);
          var json = new Object ;
          json.id = (i + 1) ;
          //机器编号
          json.machineNo = record.machineNo ;  
          //订单号
          json.orderNo = record.orderNo ;
          //产品编码(名称)
          json.productName = record.productName;
          //产品价格
          totalPrices = totalPrices + parseInt(record.price);
          json.price = "￥" + record.price;
          //支付类型
          json.payType = record.payWay ;
          //订单完成时间
          var date = record.orderTime ;
          // var orderTime ;
          // console.info("date:"+date)
          // var tempDate = Moment(new date(date)).format('YYYY-MM-DD');
          // if(tempDate == now){
          //   orderTime = "今天 " + date.getHours() + ":" + date.getMinutes() ;
          // }else{
          //   orderTime = Moment(new date(date)).format('MM-DD HH:mm');
          // }
          josn.orderTime = date ;
          jsonArray.push(json);
          console.log("json======" + json);
        }
      }
      this.setData({
       // startDate: dateStart,
       // endDate: dateEnd,
        records: jsonArray,
        totalCups: recordsInfo.length + "杯",
        totalAccount: totalPrices 
      });
      
    })
  
    console.log("onShow-end======");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady======");

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide======");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload======");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   console.log("onPullDownRefresh======");
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   console.log("onReachBottom======");
  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   console.log("onShareAppMessage======");
  // }
})