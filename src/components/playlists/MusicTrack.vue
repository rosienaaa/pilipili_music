<template>
<div class="tracks">
    <div class="track_head">
        <div class="lisImg">
            <img :src="coImg">
        </div>

        <div class="track_names">
            <p>歌单</p>
            <p >{{playName}}</p>
            <a href="#" >{{useName}}</a>
            <img :src="useImg">
        </div>
    </div>

    <div class="lispriviles">
        <ul class="listil">
            <li>音乐标题</li>
            <li>时长</li>
            <li>歌手</li>
            <li>专辑</li>
            
        </ul>
        <ul class="lisnam">
            <li v-for="li of privilege" :key="li.id">{{li.name}}</li>
        </ul>
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
            useId:''
        }
    },
    setup(){

    },
    methods: {
        getPlay(id) {
            this.$axios.get("/playlist/detail?id="+id)
            .then(response=> {
                //获取歌单
                var privilege = response.data.playlist.tracks;
                this.privilege = reactive(privilege);
                this.privileges = toRaw(this.privilege);
                //获取歌单图片
                this.coImg = response.data.playlist.coverImgUrl;
                this.playName = response.data.playlist.name;
                // console.log(response);
                
                //获取用户id
                this.useId = response.data.playlist.userId;
                // console.log(this.useId);
                //获取歌单tag
                //获取歌单简介/user/detail?uid="+this.useId
            })  
        },
        getUSer(){
            // console.log(this.coImg);
            // this.$axios.get("/user/detail?uid="+this.useId)
            // .then(res =>{
            //     console.log(res)
                
            //     //获取用户
            //     this.uses = res.data.playlist.sharedUsers[0];
            //     this.uses = toRaw(this.uses);
            //     // //获取用户名
            //     this.useName = this.uses.nickname; 
            //     // //获取用户头像
            //     this.useImg = this.uses.avatarUrl;
            // })
            
        }
    },
    computed:{
        
    },
    created(){
        this.getPlay(this.$route.query.id);  
        this.getUSer();  
    }
}
</script>

<style>
.tracks{
    position: absolute;
    /* width: 1318px; */
    width: 1280px;
    height: 100%;
    top: 20px;
    margin-left: 40px;
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
    top: 50%;
    width:1250px;
    height:400px;
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
    top: 0px;
    left:18%;
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
</style>