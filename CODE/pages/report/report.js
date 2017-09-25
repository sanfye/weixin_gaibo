     var focus
    var isShowView
Page({
  data:{
    // text:"这是一个页面"
    focus:false,
    isShowView:true,
    messages:{
      saleinfo:{
        title:"销售列表",
        url:"/images/icon/sale.png"
      },
      mataince:{
        title:"维护日志",
        url:"/images/icon/mataince.png"
      },
      error:{
        title:"故障列表",
        url:"/images/icon/error.png"
        },
      status:{
        title:"机器状态",
        url:"/images/icon/status.png"
      },
      controller:{
        title:"机器控制",
        url:"/images/icon/controller.png"
      },
      aboutus2:{
        title:"关于我们",
        url:"/images/icon/aboutus2.png"
      }
    }
  },
  showMsg: function (event) {
    var title = event.currentTarget.id;
    if (title == "销售列表") {
        wx.navigateTo({
          url: "salereport/salereport"
        })
    } else if (title == "维护日志") {
        wx.navigateTo({
          url: "../logs/logs"
        })
    } else if (title == "故障列表") {
        wx.navigateTo({
          url: "faultlist/faultlist"
        })
    } else if (title == "机器状态") {
        wx.navigateTo({
          url: "equiplist/equiplist"
        })
    } else if (title == "机器控制") {
        
    } else if (title == "关于我们") {
        wx.navigateTo({
          url: "aboutus/aboutus"
        })
    }
  },
  bindfocus:function(){
    this.setData({
         focus:true
    })
    this.setData({
      isShowView:false
    })
  },
  bindblur:function(){

          this.setData({
      focus:false
    })
    this.setData({
           isShowView:true
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
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
  }
})