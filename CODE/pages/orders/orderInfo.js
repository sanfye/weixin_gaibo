// pages/orders/orderInfo.js
var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var Moment = require("../../utils/Moment.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo: {},
    labelStart: '开始时间',
    labelEnd: '结束时间',
    labelCanlendar: '--请选择--',
    labelCups: '总杯数',
    labelAccount: '总收益 (元)',
    totalCups: 0,
    totalAccount: 0,
    canlendarUrl: '../../images/calendar-icon.png',
    startDate: Moment(new Date() - 1).format('YYYY-MM-DD').sub(1,'day'),
    endDate: Moment(new Date()).format('YYYY-MM-DD'),
    // text:"这是一个页面"
    records: [
      {
        id: "",
        productName: "加载中,请稍等...",
        price: "",
        orderTime: "",
        payType: ""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad======");
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady======");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow======");
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
  }
})