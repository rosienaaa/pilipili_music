<template>
    <div class="head">
		<div class="head-icon">
			<span class="iconfont">&#xee8f;</span>
			<p>pilipili音乐</p>
		</div>
		<div class="head-back">
			<span id="backone" @click="backone()" class="iconfont">&#xe605;</span>
			<span id="backtwo" @click="backtwo()" class="iconfont">&#xe61d;</span>
		</div>	
	</div>
</template>

<script>
export default {
    name:'HeadIcon',
    data() {
        return {}
    },
    methods:{
        backone() {
            this.$router.go(-1)
        },
        backtwo() {
            this.$router.go(1)
        }
    }
}
</script>

<style>
.head {
    position: absolute;
    width: 100%;
    height: 70px;
    top: 0;
    background-color: #000;
}

.head-icon {
    position: fixed;
    /* position: absolute; */
    width: 250px;
    /* height: 100%; */
    left: 20px;
}

.head-icon p {
    position: absolute;
    top: 25px;
    left: 50px;
    text-align: center;
    color: #fff;
}

.head-icon .iconfont {
    color: rgb(235, 176, 235);
    font-size: 45px;
    line-height: 70px;
}

.head-back{
    position: fixed;
    /* background: #fff; */
    left: 240px;
    top: 28px;
    height:30px;
}
.head-back span:nth-child(1){
    margin-right: 14px;
    border-radius: 15px;
    font-size: 23px;
    cursor: pointer;
    background-color: rgb(140, 89, 143);
}
.head-back span:nth-child(2){
    border-radius: 15px;
    font-size: 23px;
    cursor: pointer;
    background-color: rgb(140, 89, 143);
}
</style>