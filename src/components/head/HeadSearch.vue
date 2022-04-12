<template>
  <div id="search">
    <div class="head-search">
        <span v-on:click="searchMusic()" @click="!searShow" class="iconfont">&#xe693;</span>
        <input v-model="query" @click="searShow" v-on:keydown.enter="searchShow" v-on:keyup.enter="searchMusic" id="search-input" type="search" placeholder="请输入音乐/视频">
        <div class="searchs" v-if="query != '' && musicList != ''" v-show="isShow">
            <ul>
                <li v-for="item in musicList" v-on:click="playMusic(item.id)" :key="item.id">
                    {{item.name}}
                </li>
            </ul>
        </div>
    </div>
    <div class="src-songs">
        <image :src="musicPic" class="musicPic" />
    </div>
</div>
</template>

<script>

export default {
    name: 'HeadSearch',
    el: '#search',
    data() {
        return {
            isShow: false,
            query: '',
            musicList: [],
            musicUrl: '',
            musicPic: '',
            hotComments: []
        }
    },
    methods: {
        searCli: function() {
            this.isShow === true;
        },
        searShow() {
            this.isShow = !this.isShow;
        },
        searchShow() {
            this.isShow === false;
        },
        searchMusic: function() {
            var that = this;
            this.$axios.get("https://autumnfish.cn/search?limit=15&keywords=" + that.query)
            .then(function(response) {
                that.musicList = response.data.result.songs;
                    // console.log(response);
                console.log(this.musicList);
            }, function(error) {
                console.log(error);
            })
        },
        playMusic: function(musicId) {
            var that = this;
            this.$axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function(response) {

                    that.musicUrl = response.data.data[0].url;
                    console.log(that.musicUrl);
                }, function(error) {
                    console.log(error);
                })
                //获取封面
            this.$axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function(response) {
                    // console.log(response.data.songs[0].al.picUrl);
                    that.musicPic = response.data.songs[0].al.picUrl
                }, function(error) {
                    console.log(error);
                })
                //获取评论 
            this.$axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(function(response) {
                // console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            }, function(error) {
                console.log(error);
            })
        }
    }
}
</script>

<style>
.head-search {
    position: fixed;
    width: 170px;
    height: 35px;
    top: 3%;
    right: 20%;
    background-color: rgba(141, 92, 145, 0.4);
    border-radius: 10px;
}

.searchs {
    width: 200px;
    height: 200px;
    background-color: white;
    overflow: auto;
    /* display: none; */
}

.searchs ul li {
    cursor: pointer;
    margin: 10px;
}

.head-search input {
    width: 136px;
    height: 34px;
    outline: none;
    border-radius: 10px;
    background-color: rgba(70, 44, 71, 0.2);
    /* background-color: #fff; */
    color: #fff;
    border: 0;
}

.head-search .iconfont {
    /* position: absolute; */
    font-size: 18px;
    /* padding: 5px; */
    padding-left: 10px;
    /* background-color: #fff; */
    line-height: 29px;
    color: rgba(255, 255, 255, 0.671);
    cursor: pointer;
    left: 5px;
}

</style>