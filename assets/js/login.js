// 点击切换注册和登陆
$("#link_reg").click(() => {
  $(".login-box").hide();
  $(".reg-box").show();
});
$("#link_login").click(() => {
  $(".login-box").show();
  $(".reg-box").hide();
});

// 校验密码框
const form = layui.form;
form.verify({
  // 自定义一个叫 pwd 的校验规则
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  // 校验两次密码是否一致的规则
  repwd: (val) => {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    const pwd = $(".reg-box [name=password").val(); //[name=password]属性选择器
    if (pwd !== val) return "两次密码不一致";
  },
});

// 发送注册请求
$("#form_reg").submit((e) => {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/reguser",
    data: {
      username: $(".reg-box [name=username]").val(),
      password: $(".reg-box [name=password]").val(),
    },
    success: (res) => {
      // 通过layui给提示信息添加抖动效果
      if (res.status !== 0) return layer.msg(res.message);
      // 注册成功转到登陆页面：模拟点击了登陆按钮
      layer.msg(res.message);
      $("#link_login").click();
    },
  });
});

// 发送登陆请求
$('#form_login').submit(function(e){
  e.preventDefault();
  $.ajax({
    type:'POST',
    url:'/api/login',
    data:$(this).serialize(),
    success:(res)=>{
      console.log(res);
      if(res.status!==0) return layer.msg(res.message);
      layer.msg(res.message);
      // 登陆后应该将唯一的token值存储到本地存储
      localStorage.setItem('token',res.token);
      location.href='/index.html';
    }
  })
})
