<template>
        <div class="bar">
        <div class="barList">
            <ul class="bar-di">
                <div class="linka">
                <router-link to="/music/like" class="current">推荐</router-link>
                <router-link to="/music/playlist">歌单</router-link>
                <router-link to="/music/rankinglist">排行榜</router-link>
                <router-link to="/music/singer">歌手</router-link>
                </div>
                <div class="youlike">
                    <router-view></router-view>
                </div>
                
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MusicTab'
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.bar {
    /* background-color: #000; */
    position: absolute;
    left: 18%;
    top: 16%;
    padding-right: 100px;
    font-size: 20px;
    font-weight: bold;
    height: 70px;
    width: 1216px;
}

.barList {
    position: fixed;
    margin-left: 30px;
    /* background-color: #fff; */
    z-index: 6;
    width: 1316px;
    
}
.youlike{
    position: absolute;
    left: 0%;
    top: 75px;
    height: 1200px;
    overflow: auto;
    /* background-color: pink; */
}
.bar-di {
    /* background-color: #fff; */
    list-style: none;
}

.linka a {
    width: 70px;
    height: 70px;
    margin-right: 50px;
    line-height: 70px;
    float: left;
    cursor: pointer;
    color: #000;
    text-decoration: none;
    /* background-color: #000; */
}

.current::after {
    content: "";
    display: block;
    position: absolute;
    top: 55px;
    width: 70px;
    height: 3px;
    border-radius: 2px;
    background: #947ca8;
}

.centent {
    position: absolute;
    left: 10px;
    top: 64px;
    /* background-color: plum; */
    width: 1316px;
    height: 550px;
}
</style>