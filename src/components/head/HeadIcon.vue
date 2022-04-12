<template>
    <div class="head">
		<div class="head-icon">
			<span class="iconfont">&#xee8f;</span>
			<p>pilipili音乐</p>
		</div>
		<div class="head-back">
			<span id="backone" class="iconfont">&#xe604;</span>
			<span id="backtwo" class="iconfont">&#xe61d;</span>
		</div>	
	</div>
</template>

<script>
export default {
    name:'HeadIcon'
}
</script>

<style>
.head {
    position: fixed;
    width: 100%;
    height: 70px;
    top: 0;
    background-color: #000;
}

.head-icon {
    position: fixed;
    /* position: absolute; */
    width: 250px;
    height: 100%;
    left: -5%;
}

.head-icon p {
    position: absolute;
    top: 25px;
    left: 150px;
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
    left: 18%;
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