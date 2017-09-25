/**  作者：Code4Android
 *   项目地址：https://github.com/xiehui999/SmallAppForQQ
 *   新浪微博：http://weibo.com/745687294
 *   CSDN  :    http://blog.csdn.net/xiehuimx?viewmode=contents
 *   简书   :   http://www.jianshu.com/users/d5b531888b2b/latest_articles
 * */
Page({
  data:{
    // text:"这是一个页面"
    isHiddenToast:true,
    messages:[
      {
        groupName:"联系电话",
        msg:"13262833102"
      },
      {
        groupName:"地址",
       msg:"浙江省杭州市江干区笕桥镇俞章路86号A幢1层1101"
      },
      {
        groupName:"杭州盖铂科技有限公司",
        msg:"服务：网络信息技术、计算机软硬件、自动化设备的技术开发、技术服务、技术咨询、成果转让，市场营销策划，网页设计，图文设计、制作，国内广告的设计、制作、代理、发布（除网络），市场调查（除社会调查、社会调研、民意调查、民意测验），商务信息咨询（除商品中介），企业管理咨询，承办会展会务，计算机系统集成，网络工程；批发、零售：计算机软硬件，自动化设备，机械设备，金属材料，铜铝制品，电子产品（除电子出版物），数码产品，办公用品，日用百货；其他无需报经审批的一切合法项目。（依法须经批准的项目，经相关部门批准后方可开展经营活动）"
        }
    ]
  },

  isShowToast:function(){
    this.setData({
      isHiddenToast:false
    })
  },
  toastChange:function(){
    this.setData({
      isHiddenToast:true
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindtap:function(event){
wx.navigateTo({
  url: "/pages/message/search/search"
})
  },
})