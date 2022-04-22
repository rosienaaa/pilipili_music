<template>
<div class="tracks" onselectstart="return false;">
    <div class="track_head">
        <div class="lisImg">
            <img :src="coImg">
        </div>

        <div class="track_names">
            <p>歌单</p>
            <p>{{playName}}</p>
            <a href="#" >{{useName}}</a>
            <img :src="useImg">
            <p>简介：{{playLi.description}}</p>
            <ul>
                <span>标签：</span>
                <li v-for="ta in playLi.tags" :key="ta">{{ta}}</li>
            </ul>
            <div class="track_but">
                <div class="butmusic" @click="getids()">
                    <span class="iconfont">&#xe87c;播放全部</span>
                </div>
                <div class="butlike">
                    <span class="iconfont">&#xe603;收藏</span>
                </div>
            </div>
        </div>
    </div>

    <div class="lispriviles">
        <!-- <div v-for="mu in privileges" :key="mu.id"></div> -->
        <!-- <el-table style="font-size: 13px;width:100%" stripe :data="privileges" prop="id"  @row-dblclick="getmusid()">
            <el-table-column type="index"/>
            <el-table-column  prop="name"  label="歌曲标题" width="380"/>
            <el-table-column  prop="ar[0].name" label="歌手" />
            <el-table-column  prop="al.name" label="专辑" />
            <el-table-column  prop='id' label="id"></el-table-column>
            <el-table-column  prop="publishTime" value-format="HH:mm:ss" label="时长" width="180" />
            
        </el-table> -->
        <div class="pritab">
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
                        <li v-for="ite in 10" :key=ite>{{foritem(ite)}}</li>
                    </td>
                    <td class="index">
                        <li  v-for="(mu,index) in privileges" @dblclick="getmusid(mu.id,index)" ref="dataid" :data-id="index" :key="index">{{mu.name}}</li>
                    </td>
                    <td>
                        <li v-for="sin in privileges" :key="sin.id">{{sin.ar[0].name}}</li>
                    </td>
                    <td>
                        <li v-for="al in privileges" :key="al.id">{{al.al.name}}</li>
                    </td>
                    <td>
                        <li v-for="ti in privileges" :key="ti.id">{{formatDuraton(ti.dt)}}</li>
                    </td>
                </tr>
            </table>
        </div>

    </div>
    <div>
        <!-- <router-link ></router-link>
        <router-link ></router-link>
        <router-link ></router-link> -->
    </div>
</div>
</template>

<script>
import {reactive, toRaw} from 'vue'
// import { mapState} from 'vuex'
import bus from '../../eventBus.js';
export default {
    data(){
        return{
            privileges:[],
            playLi:'',
            coImg:'',
            playName:'',
            privilege:'',
            uses:'',
            useName:'',
            playTags:'',
            description:'',
            useImg:'',
            useId:'',
            musId:'',
            ids:[],
            thids:[],
            istr:false,
            singerName:'',
            picUrl:'',
            musicName:'',
            timer:'',
            thisurl:0
        }
    },
    computed:{
        timers() {
            return this.formatTime(this.timers)
        },
    },
    watch: {
        
    },
    methods: {
        lsUpDown() {
        
        },
        getPlay() {
            var id = this.$route.query.id;
            this.$axios.get("/playlist/detail?id="+id)
            .then(response=> {
                //获取歌单
                this.playLi = response.data.playlist;
                // console.log(this.playLi);
                var privilege = response.data.playlist.tracks;
                this.privilege = reactive(privilege);
                this.privileges = toRaw(this.privilege);
                console.log(this.privileges);
                // this.timer = this.privileges.data.dt;
                //获取歌单图片
                this.coImg = response.data.playlist.coverImgUrl;
                this.playName = response.data.playlist.name;
                // console.log(response);
                
                // console.log(this.ids)
                //获取用户id
                this.useId = response.data.playlist.userId;
                // console.log(this.useId);
                // console.log(this.privileges.id);
                
                this.$axios.get("/user/detail?uid="+this.useId)
                .then(res =>{
                    // console.log(res)
                    
                    //获取用户
                    this.uses = res.data;
                    // this.uses = toRaw(this.uses);
                    // //获取用户名
                    this.useName = res.data.profile.nickname; 
                    // //获取用户头像
                    this.useImg = res.data.profile.avatarUrl;
                })
            })
        },
        getmusid:function(id,index){
            // console.log(row);
                // this.$axios.get("/song/detail?ids="+id)
                // .then((res) =>{
                // // console.log(res);
                
                this.thisurl = index;
                // })
                var ids = this.$route.query.id;
                this.$axios.get("/playlist/detail?id="+ids)
                .then(resp=>{
                    console.log(resp)
                    for(let i in resp.data.privileges || i<11){
                        var ids = this.privileges[i].id
                        this.ids.push(ids);
                    }
                this.istr = true;
                this.singerName = resp.data.playlist.tracks[this.thisurl].ar[0].name;
                this.musicName = resp.data.playlist.tracks[this.thisurl].name;
                this.picUrl = resp.data.playlist.tracks[this.thisurl].al.picUrl;
                bus.emit('musicName',this.musicName);
                bus.emit('singerName',this.singerName);
                bus.emit('picUrl',this.picUrl)
                bus.emit('thisid',this.thisurl);
                bus.emit('musids',this.ids);
                bus.emit('istr',this.istr);
                })
        },
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
        getids(){
            var ids = this.$route.query.id;
            this.$axios.get("/playlist/detail?id="+ids)
            .then(resp=>{
                console.log(resp)
                for(let i in resp.data.privileges || i<11){
                    var ids = this.privileges[i].id
                    this.ids.push(ids);
                }
                // console.log(this.ids)
                this.thisurl = 0;
                this.istr = true;
                this.playLi =resp.data.playlist;
                // this.singerName = resp.data.playlist.tracks[this.thisurl].ar[0].name;
                // this.musicName = resp.data.playlist.tracks[this.thisurl].name;
                // this.picUrl = resp.data.playlist.tracks[this.thisurl].al.picUrl;
                // bus.emit('musicName',this.musicName);
                // bus.emit('singerName',this.singerName);
                // bus.emit('picUrl',this.picUrl)
                // bus.emit('thisid',this.thisurl);
                bus.emit('istr',this.istr);
                bus.emit('musids',this.ids);
            })
        }
    },
    created(){
        this.getPlay();
        bus.on('thisurl',thisurl=>{
            this.thisurl = thisurl;
            
            // console.log(this.thisurl);
            this.singerName = this.playLi.tracks[thisurl].ar[0].name;
            this.musicName = this.playLi.tracks[thisurl].name;
            this.picUrl = this.playLi.tracks[thisurl].al.picUrl;
            // console.log(this.singerName, this.musicName)
            // console.log(this.thisurl)
            bus.emit('musicName',this.musicName);
            bus.emit('singerName',this.singerName);
            bus.emit('picUrl',this.picUrl)
            bus.emit('thisid',this.thisurl);
        })
    },
    update(){
        // bus.on('thisurl',thisurl=>{
        //     this.thisurl = thisurl;
        //     console.log(this.thisurl);
        //     this.singerName = this.playLi.tracks[thisurl].ar[0].name;
        //     this.musicName = this.playLi.tracks[thisurl].name;
        //     this.picUrl = this.playLi.tracks[thisurl].al.picUrl;
        //     // console.log(this.singerName, this.musicName)
        //     // console.log(this.thisurl)
        //     bus.emit('musicName',this.musicName);
        //     bus.emit('singerName',this.singerName);
        //     bus.emit('picUrl',this.picUrl)
        //     bus.emit('thisid',this.thisurl);
        // })
        // this.getids()
        // this.getPlay();
    }
    
}
</script>

<style>
.pritab table{
    width: 1250px; 
    height:100%;
    /* background-color: #000; */
    position:relative;
    top: 30px;
    list-style: none;
}
.pritab th{
    padding-left: 10px;
    color: rgba(0,0,0,0.4);
    font-size: 13px;
    padding-bottom: 18px;
}
.pritab li{
    padding-left: 10px;
    height:30px;
    line-height:30px;
    cursor: pointer;
}
.pritab tr li:nth-child(2n-1){
    background-color: rgba(0,0,0,0.1);
}
.pritab tr td:nth-child(1){
    color: rgba(0,0,0,0.6);
    width: 5%;
}
.pritab tr td:nth-child(2){
    width: 40%;
    color: rgba(0,0,0,0.7);
}
.pritab tr td:nth-child(3){
    width: 20%;
    color: rgba(0,0,0,0.6);
}
.pritab tr td:nth-child(4){
    width: 25%;
    color: rgba(0,0,0,0.6);
}
.pritab tr td:nth-child(5){
    text-align:left;
    width: 10%;
    margin-left: 30px;
    color: rgba(0,0,0,0.6);
}
.tracks{
    position: absolute;
    /* width: 1318px; */
    width: 1340px;
    height: 100%;
    top: 20px;
    left:100%;
    margin-left: 40px;
    overflow:  scroll;
    /* background-color: #000; */
}
.track_head{
    position: absolute;
    /* bottom: 100%; */
    width: 100%;
    height: 100%;
    /* background-color: #000; */
}
.lisImg{
    margin-top:10px;
    width:180px;
    height:180px;
}
.lisImg img{
    width:100%;
    height:100%;
    border-radius: 15px;
}
.lispriviles{
    position: absolute;
    top: 30%;
    width:1250px;
    /* height:580px; */
    text-align: left;
    /* background-color: pink; */
    font-size:12px;
    
}
.listil{
    position: absolute;
    width: 100%;
    height:30px;
    top: -20px;
    /* background-color: #000; */
    
}
.listil li{
    float: left;
    margin-left: 250px;
}
.lisnam li{
    width: 100%;
    height: 30px;
    line-height: 30px;
    /* margin-bottom: 10px; */
    padding-left: 200px;
}
.lisnam li:nth-child(2n-1){
    background-color: rgba(131, 120, 120, 0.1);
}
.lisnam li:last-child{
    border-bottom: 1px solid rgba(131, 120, 120, 0.1);
}
.track_names{
    position: absolute;
    width: 550px;
    top: 0px;
    left:18%;
}
.track_names img{
    position: absolute;
    left: 0px;
    /* top: 80px; */
    margin-top:20px;
    width:30px;
    height:30px;
    border-radius: 50%;
}
.track_names a{
    position: absolute;
    left: 38px;
    margin-top:25px;
    text-decoration: none;
    color:rgb(115, 149, 164);
    font-size:14px;
}
.track_names p:nth-child(1){
    position: absolute;
    width: 25px;
    height: 15px;
    font-size:10px;
    color: red;
    border: 1px solid red;
    box-shadow: 1px 2px 3px #ccc;
    top: 10px;
}
.track_names p:nth-child(2){
    font-size:23px;
    font-weight: bold;
    color: black;
    margin-left:35px;
}
.track_names p:nth-child(5){
    position: absolute;
    top:158px;
    width: 1000px;
    font-size:13px;
    color: rgba(0,0,0,0.6);
    text-overflow: ellipsis;
    overflow: hidden;
    /* background-color: #000; */
    height:70px;
}
.track_names ul {
    position: absolute;
    top: 135px;
    /* background-color: #000; */
}
.track_names ul li{
    float: left;
    font-size: 13px;
    cursor: pointer;
    margin-right: -25px;
    margin-left: 37px;
    color: rgb(115, 149, 164);
}
.track_names ul li:hover{
    
    color: rgb(43, 52, 76);
}
.track_names ul span{
    font-size:13px;
    color: rgba(0,0,0,0.6);
    position: absolute;
    left: 0;
}
.track_but{
    position: absolute;
    top: 90px;
    width: 350px;
}
.butmusic{
    width: 120px;
    height:30px;
    line-height:30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    cursor: pointer;
    background-color: #947ca8;
}
.butmusic .iconfont{
    color: #fff;
    font-size: 15px;
    margin-right: -5px;
}
.butlike{
    position: absolute;
    top: 0px;
    left:140px;
    width: 80px;
    height:30px;
    line-height:30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    cursor: pointer;
}
.butlike .iconfont{
    font-size: 17px;
}
</style>