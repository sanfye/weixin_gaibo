var api = require('../../utils/api.js')
Page({ 
 data: { 
 phone: 'admin', 
 password:'admin123'
 }, 
  
// 获取输入账号 
 phoneInput :function (e) { 
 this.setData({ 
  phone:e.detail.value 
 }) 
 }, 
  
// 获取输入密码 
 passwordInput :function (e) { 
 this.setData({ 
  password:e.detail.value 
 }) 
 }, 
  
// 登录 
 login: function () { 
 if(this.data.phone.length == 0 || this.data.password.length == 0){ 
  wx.showToast({ 
  title: '用户名和密码不能为空', 
  icon: 'loading', 
  duration: 500 
  }) 
}else { 
 // 这里修改成跳转的页面 
  // var params = e.detail.value;
  // console.log(params);
  wx.navigateTo({
      url: "../report/report"
    })
  // if (this.data.phone == "gaibo" && this.data.password == "gaibo123") {
  //   wx.navigateTo({
  //     url: "../report/report"
  //   })
  // } else {
  //   wx.showToast({ 
  //     title: '用户名和密码错误', 
  //     icon: 'loading', 
  //     duration: 500 
  //   }) 
  // }
  

 } 
 } 
})