<template>
    <div class="search-route">
        <router-link to="">单曲</router-link>
        <router-link to="/search/serchsinger">歌手</router-link>
        <router-link to="/search/serchsheet">歌单</router-link>
        <router-link to="/search/serchalbum">专辑</router-link>
        <div>
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.search-route {
    position: absolute;
    top: 15px;
}
.search-route a{
    display: block;
    float: left;
    margin:15px;
    width: 45px;
    text-decoration: none;
    height: 30px;
    text-align: center;
    color: #000;
    font-size: 17px;
    font-weight: bold;
    /* background-color: pink; */
}
.search-route .router-link-active::after{
    content: "";
    display: block;
    position: absolute;
    margin-top: 5px;
    /* top: 55px; */
    width: 45px;
    height: 3px;
    border-radius: 2px;
    background: #947ca8;
}
</style>