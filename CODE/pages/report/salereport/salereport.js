var util = require('../../../utils/util.js')
var api = require('../../../utils/api.js')
var Moment = require("../../../utils/Moment.js");
Page({
 
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
    machineNo: '',
    canlendarUrl: '../../../images/calendar-icon.png',
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
    try {
      wx.removeStorageSync('ROOM_SOURCE_DATE')
    } catch (e) {
      // Do something when catch error
      console.error("onLoad错误日志：" + e);
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow-begin======");
    // var month = Moment(new Date()).format('YYYY-MM');
    var now = Moment(new Date()).format('YYYY-MM-DD');
    // var data = '{startTime:20170323000000 , endTime:20170821230000}' ;
    var value = wx.getStorageSync('ROOM_SOURCE_DATE');

    var startTime = Moment(new Date()).format('YYYYMMDD');
    var endTime = Moment(new Date()).format('YYYYMMDD')

    var startDate = Moment(new Date()).format('yyyy-MM-DD');
    var endDate = Moment(new Date()).format('yyyy-MM-DD');

    if (value) {
      console.log(value);
      startTime = Moment(value.checkInDate).format('YYYYMMDD');
      endTime = Moment(value.checkOutDate).format('YYYYMMDD')
      startDate = Moment(value.checkInDate).format('yyyy-MM-DD');
      endDate = Moment(value.checkOutDate).format('yyyy-MM-DD');
    }
    startTime = startTime + "000000";
    endTime = endTime + "235959";
    console.log("startTime:" + startTime + " ; endTime:" + endTime);
    var date = 'starttime=' + startTime + '&endtime=' + endTime

    // 页面显示
    api.get('https://www.gablecafe.cn/gaibo-query-server/queryorderinfo/orderinfo?' + date)
      .then(res => {
        console.log(res);
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        } else if (res.data.isError == "false") {
          console.log("res.data.orderInfoVos======" + res.data.orderInfoVos);
          var tempRecords = res.data.orderInfoVos;
          var jsonArray = [];
          var totalPrices = 0;
          console.log("tempRecords======" + tempRecords.length);
          for (var i = 0; i < tempRecords.length; i++) {

            //取出记录内容
            var record = tempRecords[i];
            // console.log("tempRecords======" + record.machineNo + '-' + record.orderNo + '-' + record.productName);
            var json = new Object;
            json.id = (i + 1);
            //机器编号
            json.machineNo = record.machineNo;

            //产品编码(名称)
            json.productName = record.productName;
            //产品价格
            totalPrices = totalPrices + parseFloat(record.price);
            json.price = "￥" + record.price;
            //支付类型
            json.payType = record.payWay;
            //订单完成时间
            var date = record.orderTime;
            //yyyy-MM-DD ==> yyyy/MM/DD 或其他格式才可以
            var tempDate = new Date(Date.parse(date.replace(/-/g, "/")));
            var orderTime = Moment(tempDate).format('MM-DD HH:mm');
            if (date.indexOf(now) != -1) {
              orderTime = Moment(tempDate).format('HH:mm');
              orderTime = "今天 " + orderTime;
            }
            json.orderTime = orderTime;
            jsonArray.push(json);
            console.log("json======" + json);
          }
          this.setData({
            startDate: startDate,
            endDate: endDate,
            records: jsonArray,
            totalCups: tempRecords.length + "杯",
            totalAccount: totalPrices.toFixed(1)
          });
        }

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
    var startDate = Moment(new Date()).format('yyyy-MM-DD');
    var endDate = Moment(new Date()).format('yyyy-MM-DD');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh======");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom======");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage======");
  },
  //调用日期选择控件
  selectDate: function (event) {
    wx.navigateTo({
      url: "../../dateSelect/dateSelect"
    })
  }
})