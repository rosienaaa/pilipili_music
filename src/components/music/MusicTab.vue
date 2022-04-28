<template>
        <div class="bar">
        <div class="barList">
            <ul class="bar-di">
                <div class="linka">
                    <router-link to="/music/like" >推荐</router-link>
                    <router-link to="/music/playlist">歌单</router-link>
                    <router-link to="/music/rankinglist">排行榜</router-link>
                    <router-link to="/music/singer">歌手</router-link>
                </div>
                
            </ul>
            <div class="youlike">
                    <router-view></router-view>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MusicTab',
    data() {
        return {
            nulls: [],
        }
    },
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
    left: 200px;
    top: 0%;
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
    width:100%;
    overflow: auto;
    z-index: 5;
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
    text-align: center;
    text-decoration: none;
    /* background-color: pink; */
}
.linka .router-link-active::after{
    content: "";
    display: block;
    position: absolute;
    top: 55px;
    width: 70px;
    height: 3px;
    border-radius: 2px;
    background: #947ca8;
}

</style>