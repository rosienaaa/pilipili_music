<template>
  <div id="loginto">
    <div class="head-login">
        <p @click="butt" class="logon" v-show="logSh">{{userlogin}}</p>
        <image class="" :src="userUrl">
        </image>
    </div>
    <div class="head-loginto" v-show="isFalse">
        <div id="but1-2">
            <div class="but1" @click="bu">登录</div>
            <div class="but2" @click="bu">注册</div>
        </div>
        <span @click="but" class="iconfont" id="icon-err">&#xf00b3;</span>
        <div class="login1" v-show="isTrue">
            <form>
                <div class="user-inp">
                    <input class="in1" type="text" placeholder="请输入手机号"/>
                    <input class="in2" type="password" placeholder="请输入密码" autocomplete />
                </div>
            </form>
            <div class="login-inp">
                <input class="in3" type="submit" id="tt" value="登录" @click="userLogin"/>
            </div>
            <div class="check">
                <input type="checkbox"> 同意
                <a href="https://st.music.163.com/official-terms/service">《服务条款》</a>
                <a href="https://st.music.163.com/official-terms/privacy">《隐私政策》</a>
                <a href="https://st.music.163.com/official-terms/children">《儿童隐私政策》</a>
            </div>
        </div>
        <div class="login2" v-show="!isTrue">
            <form>
                <div class="user-inp">
                    <input class="in1" type="text" placeholder="请输入手机号"/>
                    <input class="in4" type="captcha" placeholder="请输入验证码">
                </div>
            </form>
            <div class="login-inp">
                <input class="in3" type="submit" id="tt" value="注册" />
            </div>
            <div class="check">
                <input type="checkbox"> 同意
                <a href="https://st.music.163.com/official-terms/service">《服务条款》</a>
                <a href="https://st.music.163.com/official-terms/privacy">《隐私政策》</a>
                <a href="https://st.music.163.com/official-terms/children">《儿童隐私政策》</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'HeadLogin',
    el: '#loginto',
    data() {
        return {
            isTrue: true,
            isFalse: false,
            phone:'',
            email:'',
            password:'',
            userlogin:'登录/注册',
            status:'',
            userName:'莉莉',
            userId:'472271342',
            userUrl:'',
            captcha:'',
            logSh:true
        }
        
    },
    methods: {
        bu() {
            this.isTrue = !this.isTrue;
            // console.log(this.isTrue)
        },
        but() {
            // console.log()
            this.isFalse = !this.isFalse;
        },
        butt() {
            this.isFalse = !this.isFalse;
            this.$axios.get("https://autumnfish.cn/captcha/sent?phone="+this.phone)
                .then(function(response) {
                console.log(response);
                this.captcha = response.data;
            })
        },
        users:function() {
            
        },
        userLogin:function(){
            this.$axios.get("https://autumnfish.cn/login/cellphone?phone="+this.phone+"&password="+this.password)
                .then(function(response) {
                    // console.log(response);
                    this.status = response.data.code;
                    // console.log(this.status);
                })
            this.$axios.get("https://autumnfish.cn/user/detail?uid="+this.userId)
                .then(function(response) {
                // console.log(response);
                this.userName = response.data.profile.nickname;
                // console.log(this.userName);
                // console.log(this.userlogin);
            })
            this.userlogin = this.userName;
        }
        },
}
</script>

<style>
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
    left: 40%;
    width: 350px;
    height: 350px;
    margin: 0 auto;
    margin-top: 11%;
    background-color: rgb(255, 255, 255);
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
    color: black;
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
    width: 290px;
    height: 35px;
    margin-bottom: 30px;
}

.login-inp input {
    background-color: rgb(140, 89, 143);
    font-size: 20px;
    text-shadow: rgba(0, 0, 0, .3);
}

.in3 {
    width: 305px;
    height: 40px;
    bottom: 20px;
    opacity: 0.9;
    top: 220px;
    margin-left: 25px;
    cursor: pointer;
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
    color: #000;
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
    height: 2px;
    border-radius: 2px;
    margin: 0 auto;
    background: #947ca8;
}

.but1aft {
    margin-right: 60px;
    color: gray;
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
    color: gray;
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

 ::placeholder {
    color: gray;
    font-size: 15px;
    /* opacity: 0.8; */
}

</style>