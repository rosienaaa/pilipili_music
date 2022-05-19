<template>
    <div class="personal">
        <div class="person-info">
            <p>{{username}}</p>
            <img :src="userUrl" alt="">
            <p>Lv{{userlevel}}</p>
        </div>

        <div class="person-hr"></div>
        <div class="person-profile">
            <div class="person-count">
                <p>{{eventCount}}</p>
                <p>动态</p>
            </div>
            <div class="person-follows">
                <p>{{follows}}</p>
                <p>关注</p>
            </div>
            <div class="person-followeds">
                <p>{{followeds}}</p>
                <p>粉丝</p>
            </div>
            <div class="person-items">
                <p>用户id：<span>{{userID}}</span></p>
                <p>所在地区：<span></span></p>
                <p>个人介绍：<span>{{signature}}</span></p>
            </div>
        </div>
        <div class="person-playlist">
            <p>{{username}}创建的歌单({{userplayList.length-1}})</p>
                <div class="playlist-aul">
                    <a v-for="li in userplayList" :key="li.id">
                    {{li.name}}
                    </a>
                </div>
                <div class="person-img">
                    <img @click="cliplaylist(li.id)" v-for="li in userplayList" :key="li.id" :src="li.coverImgUrl" alt="">
                </div>
                
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            userplayList: [],
            userlevel: '',
            userID: '',
            userUrl: '',
            uses:'',
            eventCount:'',//动态
            follows:'',//关注
            followeds:'',//粉丝
            signature:'',//个人介绍
            city:'',//城市
        }
    },
    mounted() {
        this.userID = this.$route.query.useid;
        // console.log(this.userID)
        this.getuseritem();
    },
    methods: {
        getuseritem(){
            this.$axios.get("/user/detail?uid="+this.userID)
                .then(res =>{
                    // console.log(res)
                    //获取用户
                    this.uses = res.data;
                    // this.uses = toRaw(this.uses);
                    // //获取用户名
                    this.username = res.data.profile.nickname; 
                    // //获取用户头像
                    this.userUrl = res.data.profile.avatarUrl;
                    this.userlevel = res.data.level;
                })
            this.$axios.get("/user/detail/subcount?uid="+this.userID).then(response =>{
                this.eventCount = response.data.profile.eventCount;
                this.follows = response.data.profile.follows;
                this.followeds = response.data.profile.followeds;
                this.signature = response.data.profile.signature;
                this.backgroundUrl = response.data.profile.backgroundUrl;
            })
            this.$axios.get("/user/playlist?uid="+this.userID).then(response =>{
                console.log(response)
                this.userplayList = response.data.playlist;
            })
        },
        cliplaylist(id){
            this.$router.push(`/musiclist?id=${id}`)
        }
    }
}
</script>

<style>
.personal{
    width: 1345px;
    height: 100%;
    /* background-color: pink; */
}
.person-info{
    position: absolute;
    top: 40px;
    left: 40px;
    width: 100%;
    height: 400px;
    /* background-color: pink; */
}
.person-info p:nth-child(1){
    position: absolute;
    /* top: 10px; */
    left: 210px;
    font-size:30px;
    font-weight: bold;
    color: rgb(51, 53, 71);
}
.person-info p:nth-child(3){
    position: absolute;
    top: 50px;
    left: 210px;
    width: 50px;
    text-align: center;
    border-radius:40px;
    font-size:12px;
    color: rgb(76, 76, 76);
    background-color: rgba(0,0,0,0.1);
}
.person-info img{
    margin-top: 10px;
    width: 180px;
    height: 180px;
    border-radius:50%;
}
.person-hr{
    position: absolute;
    top: 120px;
    left: 250px;
    width: 1000px;
    /* background-color: pink; */
    border-top: 0.2px solid rgba(0,0,0,0.2);
}
.person-count{
    position: absolute;
    top: 135px;
    left: 255px;
    width: 60px;
    height: 48px;
    border-right: 1px solid rgba(0,0,0,0.1);
}
.person-count p:nth-child(1){
    font-size:22px;
}
.person-count p:nth-child(2){
    font-size:11px;
    color: grey;
    margin-left: 6px;
    /* text-align: center; */
}
.person-follows{
    position: absolute;
    top: 135px;
    left: 350px;
    width: 60px;
    height: 48px;
    border-right: 1px solid rgba(0,0,0,0.1);
}
.person-follows p:nth-child(1){
    font-size:22px;
}
.person-follows p:nth-child(2){
    font-size:11px;
    color: grey;
    margin-left: 3px;
    /* text-align: center; */
}
.person-followeds{
    position: absolute;
    top: 135px;
    left: 450px;
    width: 60px;
    height: 48px;
}
.person-followeds p:nth-child(1){
    font-size:22px;
}
.person-followeds p:nth-child(2){
    font-size:11px;
    color: grey;
    margin-left: 12px;
    /* text-align: center; */
}
.person-items{
    position: absolute;
    top: 190px;
    left:255px;
    width:1000px;
    text-overflow: ellipsis;
    font-size:13px;
}
.person-items p{
    margin-bottom: 5px;
}
.person-items span{
    color: grey;
}
.person-playlist{
    position: absolute;
    top: 300px;
    width: 100%;
    height:100%;
    margin-left: 10px;
}
.person-playlist p{
    font-weight: bold;
    font-size:18px;
}
.playlist-aul{
    position: absolute;
    top: 270px;
    height: 100%;
    left: 13px;
}
.person-playlist .playlist-aul a{
    display: block;
    width: 235px;
    height: 245px;
    font-size: 15px;
    font-weight: bold;
    /* background-color: pink; */
    /* line-height: 455px; */
    /* margin: 15px; */
    /* text-align:left; */
    margin-right: 28px;
    margin-bottom: 40px;
    float: left;
}
.person-img{
    position: absolute;
    width: 100%;
    /* height: 300px; */
}
.person-img img{
    width: 230px;
    height: 230px;
    margin: 15px;
    margin-bottom: 35px;
    border-radius: 20px;
    cursor: pointer;
    z-index: 5;
}
</style>