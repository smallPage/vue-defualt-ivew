<template lang="html">
  <div class="bg-body">
    <div class="bg-main">
      


      <div class="regist-container" @keyup.enter="login">
        <div class="regist-animation">
          <div class="content-regist clearfix">
            <p style="margin-bottom: 0px; background: #3772ce; padding: 10px; text-align: center;">
            <a href="javascript:;">
              <!-- <img src="/static/images/logo.png"> -->
              <span style="color: white; font-size: 26px;">应用协同管理系统</span>
            </a></p>
            <div id="basic_login">
                <div class="login-title clearfix">
                    <h3 id="nav-normal-login" class="active" onclick="alterLoginTab(this)">帐号登录</h3>
                    <!-- <h3 id="nav-sms-login" onclick="alterLoginTab(this)" class="">短信登录</h3> -->
                </div>

                <!-- 帐户登录 -->
                <ul id="tab-normal-login" class="clearfix" style="display: inline-block;">
                    <li>
                      <input id="email" v-model="form.username" type="text" class="input-regist" placeholder="输入账号">
                      <!-- <font class="email-tip">邮箱不能为空！</font> -->
                    </li>
                    <li>
                      <input id="password" v-model="form.password" type="password" class="input-regist" placeholder="6~32位密码">
                      <!-- <font>密码不能为空！</font> -->
                    </li>
                </ul>

                <!-- 短信登录 -->
                <ul id="tab-sms-login" class="sms-login clearfix" style="display: none;">
                    <li>
                        <label>+86 <b></b></label>
                        <input id="registerMobilePhone" name="Tel" class="input-regist tel">
                        <font></font>
                    </li>
                    <li>
                        <input id="vCode" name="SecurityCode" class="input-regist" placeholder="请输入验证码">
                        <em id="sendVCodeButton" onclick="sendVerificationCode('sendVCodeButton','registerMobilePhone','vCodeVerifyHint')" data-origtxt="获取验证码" data-interval="">获取验证码</em>
                        <font id="vCodeVerifyHint"></font>
                    </li>
                </ul>

                <div class="login-operate">
                    <ul>
                        <li id="graph_verify_area" style="display: none">
                            <input type="text" id="graphVCode" class="input-regist  QR-code" value="" placeholder="验证码...">
                            <font></font>
                            <div class="QR-code-container" id="graph_verify_container"><canvas id="verifyCanvas" width="116" height="44" style="cursor: pointer;">您的浏览器版本不支持canvas</canvas></div>
                        </li>
                    </ul>
                    <div class="remember clearfix">
                    <!-- <span>
                    <div class="ga-checkbox">
                    <input id="remember_me" type="checkbox" class="ng-pristine ng-valid" checked=""><b></b>
                    </div>
                    七日内免登录
                    </span> -->
                    <!-- <strong>
                    <a href="javascript:void(0)" onclick="forgetPassword()">忘记密码?</a>
                    <br />
                    <a href="javascript:void(0)" onclick="notReceivedEmail()">没有收到邮箱认证邮件?</a>
                    </strong> -->
                    </div>
                    <a href="javascript:void(0)" id="btn-normal-login" class="btn-login btn-regist" @click="login" style="display: block;">帐号登录</a>
                    <a href="javascript:void(0)" id="btn-sms-login" class="btn-login btn-regist" onclick="smslogin()" style="display: none;">短信登录</a>
                </div>
            </div>

        </div>
            
      </div>
    </div>




    </div>
  </div>
</template>

<script>

import { Message } from 'iview';
import { accountAPI } from '@/api'
import { mapActions } from 'vuex'
import cookie from '@/utils/cookie'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions([ 'setToken', 'setLoginedUser' ]),
    login() {
      if(this.form.username === '' || this.form.password === '' ){
        this.$Message.error('帐号或密码不能为空 ,请检查后再登录!');
        return;
      }
      accountAPI.login(this.form).then(res => {
        if (res.code == 0) {
          this.setToken(res.data.token);
          this.setLoginedUser(res.data.loginedUser || {});
          cookie.set('token', res.data.token);
          this.$router.push({ name: 'user' });
        } else {
          this.$Message.error(res.message || '系统出现登录异常.');
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>

  .bg-body {
    background: linear-gradient(to bottom right, #6172d8, #000000);
    // background: linear-gradient(to bottom right, #47518b , #343a66);
    height: 100%;
    min-height: 100%
  }

  .bg-main {
    // background: url('http://localhost:8011/static/images/login-header-bg.png') top center no-repeat;
    // background: url('https://account.talkingdata.com/images/bg-regist.png') top center no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 80px;
  }

  .regist-container {
    width: 440px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  .regist-animation {
    width: 200%;
    transition: all linear .3s;
    -webkit-transition: all linear .3s;
    -moz-transition: all linear .3s;
    -ms-transition: all linear .3s;
    -o-transition: all linear .3s;
  }

  .content-regist {
    width: 440px;
    padding: 60px;
    display: block;
    background: #fff;
    float: left;
  }

  .login-title {
    border-bottom: 1px solid #edeeef;
    display: flex;
    padding-top: 24px;
    margin-bottom: 6px;
  }

  .content-regist h3 {
      font-size: 16px;
      color: rgba(29,36,54,.8);
      position: relative;
      height: 50px;
      line-height: 50px;
      margin-right: 20px;
      border-bottom: 2px solid transparent;
      cursor: pointer;
  }

  .content-regist h3.active {
    font-weight: bold;
    border-bottom: 2px solid #1d2436;
    color: rgba(29,36,54,1);
  }

  .content-regist ol, .content-regist ul {
    margin: 0;
    width: 100%;
    list-style: none;
  }

  .content-regist ul > li {
    list-style: none;
    clear: both;
    padding-top: 16px;
    position: relative;
    display: block;
  }

  .content-regist ul li .input-regist, .content-regist ul li .choose-function {
    background: none;
    border: 1px solid #dbdcdf;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    padding: 0 16px;
    font-size: 14px;
    width: 100%;
  }

  .content-regist ul li font, .content-regist ul li span {
    display: block;
    color: #db4e2b;
    font-size: 12px;
    padding-top: 2px;
  }

  .login-operate #graph_verify_area {
    padding-top: 10px;
  }

  .content-regist ul li .input-regist.QR-code {
    width: 200px;
  }

  .login-operate .QR-code-container {
    top: 10px;
  }

  .QR-code-container {
      position: absolute;
      z-index: 10;
      width: 116px;
      height: 44px;
      right: 0;
      top: 16px;
      border-radius: 4px;
      overflow: hidden;
  }

  .remember {
    position: relative;
    display: block;
    font-size: 12px;
    color: #5368a2;
    padding-top: 6px;
  }

  a.btn-login {
    cursor: pointer;
    display: block;
    text-align: center;
    color: #fff;
    background: #2d8cf0;
    height: 44px;
    line-height: 44px;
    width: 140px;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 10px;
    text-decoration: none;
    font-weight: bold;
  }

  a.btn-login.btn-regist {
    width: 100%;
    margin-top: 24px;
  }










</style>


