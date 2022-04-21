<template>
    <div class="nav">
		<div class="nav-ul">
			<ul>
				<router-link to="/"><span class="iconfont">&#xf0064;</span>发现音乐</router-link>
				<router-link to="/video"><span class="iconfont">&#xe690;</span>视频</router-link> 
				<router-link to="/collection"><span class="iconfont">&#xe8b9;</span>收藏</router-link> 
				<router-link to="/recommend"><span class="iconfont ">&#xec7f;</span>每日推荐</router-link> 
			</ul>                   
		</div>
        <router-view class="curren"></router-view>
	</div>
</template>

<script>
export default {
    name: 'NavTab'
}
</script>

<style>
.nav{
    position: fixed;
    top: 70px;
    height: 700px;
    width: 183px;
    border-right: 1px solid #ccc;
    /* background-color: #42275a; */
}

.nav-ul ul{
    /* padding-left: 10px; */
    margin-top: 15px;
    width: 100%;
    height: 500px;
    /* background-color: pink; */
    list-style: none;
}

.nav-ul ul a {
    display: inline-block;
    width:173px;
    height:38px;
    line-height: 33px;
    text-align: left;
    padding-left:10px;
    color: #000;
    margin-top:5px;
    /* margin-bottom: 10px; */
    cursor: pointer;
    text-decoration: none;
}

.nav-ul ul a:nth-child(1) {
    
    background-color: rgba(0, 0, 0, 0.1);
}

.nav-ul ul a:hover {
    transition: linear 0.5s;
    background-color: rgba(0, 0, 0, 0.1);
}

.nav .iconfont {
    width: 20px;
    height: 15px;
    font-size: 18px;
    padding-right: 5px;
    color: rgba(0, 0, 0, 0.6);
    /* background-color: #000; */
}

</style>