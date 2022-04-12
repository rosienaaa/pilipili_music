<template>
  <div id="liPlay">
    <div class="banners">
        <!-- <img v-for="ig in banners" :src="ig.imageUrl" :key="ig.id" alt=""> -->
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="ig in banners" :key="ig.id">
                <!-- <h3>{{ item }}</h3> -->
                <img  :src="ig.imageUrl">
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="lists">
        <h3>推荐歌单></h3>
        <div>
            <!-- <router-link to="/musiclist/"> -->
                <div class="aul">
                    <a v-for="it of liLists" href="" :key="it.id">
                        {{it.name}}
                    </a>
                </div>
                <div class="imgul">
                    <img v-for="im in liLists" @click="MusicPlay(im.id)" :key="im.id" :src="im.coverImgUrl">
                </div>
        </div>
    </div>
</div>
</template>

<script>
// import {reactive, toRaw} from 'vue'
export default {
    name:'YouLike',
    data(){
        return {
            banners:[],
            bann:[],
            liLists: [], //歌单列表
            coverImgUrl: '',//歌单图片
            SongImg:'',
            plays:[],
            lisId:'',
        }
    },
    methods: {
        resPlay(){
            this.$axios.get('/top/playlist?limit=10&order=hot').then(response=>{
                // console.log(response);
                this.liLists = response.data.playlists;
                this.coverImgUrl = response.data.playlists;
            }),
            this.$axios.get('/banner').then(res=>{
                // this.bann = reactive(res.data.banners);
                // this.banners = toRaw(this.bann);
                this.banners = res.data.banners;
                console.log(this.banners);
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
ul {
    list-style: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

#liPlay {
    position: relative;
    width: 1348px;
    height: 500px;
    overflow:auto;
}
.banners{
    /* position: absolute; */
    width: 1260px;
    /* height: 256px; */
    /* margin-left: 32px; */
    margin-top: 25px;
    /* background-color: #000; */
}
.banners img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
}
.lists {
    /* position: relative; */
    position: absolute;
    left: 0px;
    top: 60%;
    width: 100%;
    height: 300px;
    /* background-color: #000; */
    /* overflow: hidden; */
}
.lists h3{
    /* position: absolute; */
    text-align: left;
    /* margin-left: 30px; */
    color: #000;
    /* background-color: #000; */
}
.aul{
    position: absolute;
    height: 100%;
    width: 100%;
    /* margin-left: 15px; */
    top: 265px;
    /* left:30px; */
    /* background-color: #000; */
}

.aul a{
    float: left;
    display: block;
    height: 55px;
    width: 220px;
    word-wrap: break-word;
    text-align:left;
    color: #000;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 35px;
    /* padding-bottom: 80px; */
    /* background-color: #000; */
}
.aul a:nth-child(n+6){
    margin-top: 233px;
}
.imgul {
    position: absolute;
    /* left: 10px; */
    left: -20px;
    width: 100%;
    height: 620px;
    /* background-color: #000; */
}

.imgul img {
    height: 220px;
    width: 220px;
    cursor: pointer;
    margin: 10px;
    margin-bottom: 50px;
    margin-right: 32px;
    border-radius: 15px; 
    /* background-color: #000; */
}
</style>