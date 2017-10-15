var api = require('../../utils/api.js')
Page({ 
 data: { 
 phone: '', 
 password:'',
 nickName:''
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
   var userName = this.data.phone;
   api.get('https://www.gablecafe.cn/gaibo-query-server/queryUserInfo/userInfo?userName=' + userName)
     .then(res => {
       console.log(res);
       if (res == null || res.data == null || res.statusCode != '200') {
         console.log(res);
       } else {
         var userName = res.data.name;
         var userPassword = res.data.password;
         if (this.data.password == userPassword){
           wx.setStorageSync("userName", this.data.phone);
           wx.setStorageSync("userPassword", this.data.password);
           wx.navigateTo({
             url: "../report/report"
           })
          }else{
           wx.showToast({
           title: '用户名或密码错误', 
           icon: 'loading', 
           duration: 500 
           }) 
          }
       }
     })

 } 
 },
 onLoad: function (options) {
    
   var userName = wx.getStorageSync("userName");
   if (userName){
     // 页面显示
     api.get('https://www.gablecafe.cn/gaibo-query-server/queryUserInfo/userInfo?userName=' + userName)
       .then(res => {
         console.log(res);
         if (res == null || res.data == null || res.statusCode != '200') {

         }else{
           wx.navigateTo({
             url: "../report/report"
           })
         }
       })
       
   }
 }
})