<template>
    <!-- <div class="search-route">
        <router-link to="" @click="addroutSong()">单曲</router-link>
        <a @click="addroutSinger()">歌手</a>
        <a @click="addroutSheet()">歌单</a>
        <a @click="addroutAlbum()">专辑</a>
        <div>
            <router-view></router-view>
        </div>
        
    </div> -->
    <div class="search-lispriviles">
            <div class="search-count">
                <p>已找到{{searchlength}}首歌曲:</p>
            </div>
            <div class="search-tui">
                <p>为您推荐</p>
                <div class="search-tui-comname">
                    <img :src="comurl" alt="">
                    <p>{{comsingname}}</p>
                    <p>歌手:{{comsinger}}</p>
                    <!-- <span @click="addsheet()" class="iconfont">&#xe61d;</span> -->
                </div>
            </div>
            <div class="search-pritab">
                <table cellpadding="0" cellspacing="0">
                    <th>

                    </th>
                    <th>
                        <p>歌曲标题</p>
                    </th>
                    <th>
                        <p>歌手</p>
                    </th>
                    <th>
                        <p>专辑</p>
                    </th>
                    <th>
                        <p>时长</p>
                    </th>
                    <tr>
                        <td>
                            <li v-for="ite in musicList.length" :key=ite>{{foritem(ite)}}</li>
                        </td>
                        <td class="index">
                            <li  v-for="(mu,index) in musicList" @dblclick="getmusid(mu.id,index)" ref="dataid" :data-id="index" :key="index">{{mu.name}}</li>
                        </td>
                        <td>
                            <li v-for="sin in musicList" :key="sin.id">{{sin.artists[0].name}}</li>
                        </td>
                        <td>
                            <li v-for="al in musicList" :key="al.id">{{al.album.name}}</li>
                        </td>
                        <td>
                            <li v-for="ti in musicList" :key="ti.id">{{formatDuraton(ti.duration)}}</li>
                        </td>
                    </tr>
                </table>
            </div>
    </div>
</template>

<script>
import bus from '../../eventBus.js';
export default {
    data() {
        return{
            query:'',
            musicList:[],
            musicName:'', //当前歌曲名称
            singerName: '', //当前歌手名称
            picUrl:'',
            // thisurl:'',
            istr:false,
            musurl:'',
            musids: [],
            searchlength:'',
            comurl:'',
            comsingname:'',
            comsinger:'',
            comid:'',
        }
    },
    created () {
        
        // console.log(this.query);
    },
    mounted() {
        this.query = this.$route.query.id;
        this.searchList()
    },
    updated() {
        this.query = this.$route.query.id;
        // this.searchList()
    },
    watch:{
        query(){
                // console.log("123")
                this.searchList()
        }
    },
    methods: {
        foritem(s){
            if(s < 10){
                return '0' + s
            }else{
                return s
            }
        },
        formatDuraton(mss){
                // let days = Math.floor(mss / (1000 * 60 * 60 * 24));
                // let hour = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minute = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
                let second = Math.round((mss % (1000 * 60)) / 1000);
                minute = minute < 10 ? '0' + minute : minute
                second = second < 10 ? '0' + second : second
                return minute + ':' + second
                // return minutes + "分钟" + seconds + "秒";
        },
        searchList(){
            if(this.query === '' || this.query === null || this.query === undefined){
                alert("没有搜索结果")
            }
            else{
                this.$axios.get("/search?limit=35&keywords=" + this.query).then((response)=>{
                    // console.log(response);
                    this.searchlength = response.data.result.songCount;
                    this.musicList = response.data.result.songs;
                    this.comid =response.data.result.songs[0].id;
                    // console.log(this.comid);
                    // console.log(that.musicList[2]);
                    this.$axios.get("/song/detail?ids="+this.comid).then(response => {
                    // console.log(response)
                    this.comsingname = response.data.songs[0].name;
                    this.comsinger = response.data.songs[0].ar[0].name;
                    this.comurl = response.data.songs[0].al.picUrl;
                    this.comid = response.data.songs[0].al.id;
                    })
                })
                
            }
        },
        getmusid(id,index){
                this.thisurl = index;
                // })
                console.log(id)
                // var ids = this.$route.query.id;
                this.$axios.get("/song/detail?ids="+id).then(response => {
                    // console.log(response)
                    this.musicName = response.data.songs[0].name;
                    this.picUrl = response.data.songs[0].al.picUrl;
                    this.singerName = response.data.songs[0].ar[0].name;
                    // console.log(this.singerName,this.musicName)
                    bus.emit('musicName',this.musicName);
                    bus.emit('singerName',this.singerName);
                    bus.emit('picUrl',this.picUrl)
                    // bus.emit('thisid',this.thisurl);
                })
                this.$axios.get("/song/url?id="+id).then(resp=>{
                    // console.log(resp)
                        this.istr = true;
                        this.musurl = resp.data.data[0].url
                        console.log(this.musurl)
                        bus.emit('musurl',this.musurl);
                        bus.emit('istr',this.istr);
                })
        },
        addsheet(){
            this.$router.push(`/musiclist?id=${this.comid}`)
        }
    }
}
</script>

<style>
.search-lispriviles{
    height:100%;
}
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
.search-count{
    position: absolute;
    top: 40px;
    left: 20px;
}
.search-count p{
    font-size:18px;
    font-weight:bold;
}
.search-tui{
    position: absolute;
    top: 75px;
    left: 20px;
}
.search-tui p{
    font-size:14px;
}
.search-tui div{
    width: 265px;
    height:70px;
    margin-top:5px;
    /* float: left; */
    background-color: rgb(235, 229, 229);
    border-radius:5px;
}
.search-tui div p{
    position: absolute;
    left: 120px;
    top: 65px;
    width: 138px;
    font-size: 15px;
    /* background-color: pink; */
    height:40px;
    overflow: hidden;
}
.search-tui div p:nth-child(2){
    position: absolute;
    left: 120px;
    top: 40px;
    width: 120px;
    font-size: 15px;
    /* background-color: pink; */
    height:40px;
    overflow: hidden;
}
.search-tui div img{
    width:100px; 
    height:70px;
}
.search-tui div span{
    position: absolute;
    right:10px;
    top: 50px;
    cursor: pointer;
}
.search-pritab{
    margin-top: 200px;
    height:1200px;
    width: 100%;
    /* text-overflow: ellipsis; */
}
.search-pritab table{
    width: 1250px; 
    height:1100px;
    /* background-color: #000; */
    position:relative;
    /* top: 30px; */
    list-style: none;
}
.search-pritab th{
    padding-left: 10px;
    color: rgba(0,0,0,0.4);
    font-size: 13px;
    text-align: left;
    padding-bottom: 18px;
}
.search-pritab li{
    padding-left: 10px;
    height:30px;
    font-size: 14px;
    line-height:30px;
    cursor: pointer;
}
.search-pritab tr li:nth-child(2n-1){
    background-color: rgba(0,0,0,0.1);
}
.search-pritab tr td:nth-child(1){
    color: rgba(0,0,0,0.6);
    font-size: 13px;
    width: 5%;
}
.search-pritab tr td:nth-child(2){
    width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: rgba(0,0,0,0.7);
}
.search-pritab tr td:nth-child(3){
    width: 20%;
    color: rgba(0,0,0,0.6);
}
.search-pritab tr td:nth-child(4){
    width: 25%;
    color: rgba(0,0,0,0.6);
}
.search-pritab tr td:nth-child(5){
    text-align:left;
    width: 10%;
    margin-left: 30px;
    color: rgba(0,0,0,0.6);
}
</style>