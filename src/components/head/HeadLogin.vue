<template>
<div>
    <div id="loginto">
    <div class="head-login">
        <div v-show="logSh" @click="loginbut">
            <p class="logon" >{{userlogin}}</p>
        </div>
        <div v-show="!logSh">
            <p class="logon">{{userName}}</p>
            <img class="" :src="userUrl">
        </div>
        
    </div>
    <div class="head-loginto" v-show="isFalse">
        
        <div id="but1-2">
            <div class="but1" @click="loginbu">登录</div>
            <div class="but2" @click="loginbu">注册</div>
        </div>
        <span @click="errbut" class="iconfont" id="icon-err">&#xf00b3;</span>
        <div class="login1" v-show="isTrue">
            <form>
                <div class="user-inp">
                    <input class="in1" v-model="userPhone" type="text" placeholder="请输入手机号"/>
                    <input class="in2" v-model="userPassword" type="password" placeholder="请输入密码" autocomplete />
                </div>
            </form>
            <div class="login-inp">
                <input class="in3" type="submit" id="tt" value="登录" @click="userLogin"/>
            </div>
        </div>
        <div class="login2" v-show="!isTrue">
            <form>
                <div class="user-inp">
                    <input class="in1" v-model="userPhone" type="text" placeholder="请输入手机号"/>
                    <input class="in4"  type="captcha" placeholder="请输入验证码">
                </div>
            </form>
            <div class="login-inp">
                <input class="in3" type="submit" id="tt" value="注册" />
            </div>
        </div>
    </div>
    </div>
    <!-- <div class="log-backg" v-show="isFalse" :style="true?windowheight:''">hhh</div> -->
</div>

</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name:'HeadLogin',
    el: '#loginto',
    data() {
        return {
            isTrue: true,//是否显示登陆界面
            isFalse: false,
            userPhone:'',//手机号
            userEmail:'',//用户邮箱
            userPassword:'',//用户密码
            userlogin:'登录/注册',
            status:'',
            userName:'',//用户名
            userId:'',//用户id
            userUrl:'',//用户头像
            captcha:'',//验证码
            logSh:true,
        }
    },
    methods: {
        loginbu() {
            this.isTrue = !this.isTrue;
            // console.log(this.isTrue)
        },
        errbut() {
            // console.log()
            this.isFalse = !this.isFalse;
        },
        loginbut() {
            this.isFalse = !this.isFalse;
            
        },
        ...mapMutations(['changeLogin']),
        userLogin(){
            // if(this.userPhone === '' || this.userPassword === ''){
            //     alert('账号或密码不能为空');
            // }
            // else{
                this.$axios.get("/login/cellphone?phone="+this.userPhone+"&password="+this.userPassword).then((response) =>{
                    console.log(response);
                })
            // }
        },
    }
}
</script>

<style>
/* .log-backg{
    width: 100%;
    height: 700px;
    background-color: #ccc;
    z-index: 2;
} */
.head-login {
    position: absolute;
    right: 10%;
    top: 28px;
    color: #fff;
    cursor: pointer;
}

.head-loginto {
    position: absolute;
    /* display: none; */
    z-index: 3;
    right: 40%;
    width: 320px;
    height: 290px;
    margin: 0 auto;
    margin-top: 10%;
    background-color: rgb(0,0,0);
    /* background-image: src("../../images/6.png"); */
    border-radius: 8%;
    backdrop-filter: blur(3px);
    border-left: 2px solid rgba(255, 255, 255, .3);
    border-right: 2px solid rgba(255, 255, 255, .3);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
}

.head-loginto input {
    /* width: 240px;
    height: 35px; */
    border: none;
    /* color: #fff; */
    font-size: 17px;
    font-weight: 500;
    /* margin-bottom: 38px; */
    outline: none;
    background-color: transparent;
    border-radius: 16px;
    backdrop-filter: blur(3px);
    border-left: 2px solid rgba(255, 255, 255, .3);
    border-right: 2px solid rgba(255, 255, 255, .3);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
}
.user-inp {
    padding-top: 85px;
    padding-left: 25px;
}

.user-inp input {
    padding-left: 10px;
    /* left: 30px; */
    width: 250px;
    height: 35px;
    margin-bottom: 30px;
    background-color: #fff;
}
.user-inp::placeholder {
    color: #000;
    font-size: 15px;
    /* opacity: 0.8; */
}
.login-inp input {
    background-color: rgb(140, 89, 143);
    font-size: 20px;
    text-shadow: rgba(255, 255, 255, .7);
}

.in3 {
    width: 270px;
    height: 40px;
    bottom: 20px;
    opacity: 0.9;
    top: 220px;
    margin-left: 25px;
    cursor: pointer;
    color: #fff;
}

.in4 {
    margin-bottom: 15px;
}
#icon-err {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    /* background-color: plum; */
    color: #947ca8;
    cursor: pointer;
}


#but1-2 {
    position: absolute;
    top: 20px;
    height: 38px;
    width: 100%;
    display: flex;
    /* background-color: #fff; */
    margin-left: 40px;
    text-align: center;
    line-height: 38px;
    font-weight: bold;
    transition: linear 3s;
}

.but1 {
    margin-right: 60px;
    /* background-color: #fff; */
    color: #fff;
    cursor: pointer;
}

.but1::after {
    content: "";
    display: block;
    position: absolute;
    left: -8px;
    /* right: 0; */
    bottom: 0px;
    width: 55px;
    height: 3px;
    border-radius: 2px;
    margin: 0 auto;
    background: #947ca8;
}

.but1aft {
    margin-right: 60px;
    color: #fff;
    cursor: pointer;
}

.but1aft::after {
    content: "";
    display: none;
    position: absolute;
    left: -8px;
    /* right: 0; */
    bottom: 0px;
    width: 55px;
    height: 2px;
    border-radius: 2px;
    margin: 0 auto;
    background: #947ca8;
}

.but2 {
    color: #fff;
    cursor: pointer;
}

.but2::after {
    content: "";
    display: none;
    position: absolute;
    left: 85px;
    /* right: 0; */
    bottom: 0px;
    width: 55px;
    height: 2px;
    border-radius: 2px;
    margin: 0 auto;
    background: #947ca8;
}

.but2aft {
    cursor: pointer;
}

.but2aft::after {
    content: "";
    display: block;
    position: absolute;
    left: 85px;
    /* right: 0; */
    bottom: 0px;
    width: 55px;
    height: 2px;
    border-radius: 2px;
    margin: 0 auto;
    background: #947ca8;
}

.but2::after,
.but1::after,
.but1aft::after,
.but2aft::after {
    transform: all 5s;
}



</style>