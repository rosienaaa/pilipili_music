<template>
  <div class="play-list">
        <p>歌单></p>
        <div>
            <!-- <router-link to="/musiclist/"> -->
                <div class="play-aul">
                    <a v-for="it of liLists" href="" :key="it.id">
                        {{it.name}}
                    </a>
                </div>
                <div class="play-imgul">
                    <img v-for="im in liLists" @click="MusicPlay(im.id)" :key="im.id" :src="im.coverImgUrl">
                </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
        return {
            liLists: [], //歌单列表
            coverImgUrl: '',//歌单图片
            SongImg:'',
            plays:[],
            lisId:'',
        }
    },
  methods: {
        resPlay(){
            this.$axios.get('/top/playlist?limit=60&order=hot').then(response=>{
                // console.log(response);
                this.liLists = response.data.playlists;
                this.coverImgUrl = response.data.playlists;
            })
        },
        MusicPlay(id) {
            this.$router.push(`/musiclist?id=${id}`)
            //获取点击的id以及封面
            this.$axios.get("/playlist/detail?id="+id)
                .then(response=> {
                    this.lisId=id;
                    // console.log(this.lisId);
                    // console.log(response.data);
                    this.SongImg = response.data.playlist.coverImgUrl;
                    // console.log(this.SongImg);
            //根据传入的id获取歌单
                    this.privileges = response.data.privileges;
                })
        },
        setup(){
            
        }
    },
    mounted(){
        this.resPlay();
    }
}
</script>

<style>
.play-lists {
    /* position: relative; */
    position: absolute;
    left: 0px;
    top: 60%;
    width: 100%;
    height: 300px;
    background-color: #000;
    /* overflow: hidden; */
}
.play-lists p{
    /* position: absolute; */
    text-align: left;
    font-size: 14px;
    /* margin-left: 30px; */
    color: #000;
    /* background-color: #000; */
}
.play-aul{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 225px;
}
.play-aul a{
    width: 170px;
    height:245px;
    float: left;
    word-wrap: break-word;
    text-align:left;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    margin-left: 7px;
    margin-right: 35px;
}
.play-imgul {
    position: absolute;
    /* left: 10px; */
    /* left: 20px; */
    width: 100%;
    height: 620px;
    /* background-color: #000; */
}

.play-imgul img {
    height: 180px;
    width: 170px;
    cursor: pointer;
    margin: 10px;
    margin-bottom: 50px;
    margin-right: 32px;
    border-radius: 15px; 
    /* background-color: #000; */
}
</style>