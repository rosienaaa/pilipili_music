<template>
  <div class="audioMus" onselectstart="return false;">
      <div class="music-container" id="music-container">
        <!-- 音乐信息 -->
        <div class="music-item">
            <img :src="picUrl" alt="">
            <p>{{musicName}}</p>
             <p>{{singerName}}</p>
        </div>
        <div class="music-info">
            <!-- 音乐播放进度条 -->
            <div class="progress-container" id="progress-container">
                <!-- <input type="range" ref="range" @input="onChange" @change="onChange" min="0" max="450" value="0"> -->
                <input type="range" ref="range" @input="onChange" @change="onChange" min="0" max="360" value="0">
            </div>
            <!-- 音乐时长 -->
            <div class="music-timer">    
                <!-- <div class="name">{{  audioName==null ? "未知": audioName}}</div> -->
                <div class="timefirst">{{formatCurrentTime}}</div>
                <div class="timelast">{{formatTotalTime}}</div>
            </div>
        </div>
        <!-- 播放控制 -->
        <div class="navigation" onselectstart="return false;">
                    <!-- 音乐循环-->
                    <div id="prev" @click="getprev()" class="action-btn">
                        <span class="iconfont">&#xe623;</span>
                    </div>
                    <!-- 上一首 -->
                    <div id="last" @click="getlast()" class="action-btn">
                        <span class="iconfont">&#xe604;</span>
                    </div>
                    <!-- 音乐播放暂停 -->
                    <div id="play"  class="action-btn action-btn-big">
                        <span class="iconfont" v-if="iftr == false" @click="play()" v-show="!iftr">&#xe87c;</span>
                        <span class="iconfont" v-if="iftr == true" @click="pause()" v-show="iftr">&#xe630;</span>
                    </div>
                    <!-- 下一首 -->
                    <div id="next" @click="getnext()" class="action-btn">
                        <span class="iconfont">&#xe602;</span>
                    </div>
                    <!-- 音乐收藏 -->
                    <div id="like" class="action-btn">
                        <span class="iconfont" @click="getlike()" v-show="liketr">&#xe603;</span>
                        <span class="iconfont" @click="getlike()" v-show="!liketr" style="color:red;">&#xe8c3;</span>
                    </div>
        </div>

        <!-- 默认第一首音乐 -->
        <!-- <audio v-for="ur in musurl" :src="ur.url" :key="ur.id" id="audio" ></audio> -->
        <audio :src="musurl" ref="audio" v-show="false" preload="auto" controls autoplay @timeupdate="update" @canplay="loadingFinish"></audio>
        <!-- 音乐封面 -->
        <div class="img-container">
            <!-- <img src="" alt="music-cover" id="music-cover"> -->
        </div>
        <!-- 播放控制 -->
        
    </div>
  </div>
</template>

<script>
import bus from '../../eventBus';
export default {
    data() {
        return{
            thisurl:0,
            iftr:false,
            // isfa:'',
            musurl:[],
            musid:'',
            musids:[],
            thisur:'',
            musurls:[],
            totalTime: 0, // 播放总时间--秒
            currentTime: 0, // 当前播放时间--秒
            picUrl:'', //当前歌曲图片
            musicName:'', //当前歌曲名称
            singerName: '', //当前歌手名称
            liketr:true, //当前是否收藏
            musicBar: 0, //进度条的value值
        }
    },
    
    created () {
        bus.on('musicUrl',musicUrl=>{
            this.musurl = musicUrl;
        });
        bus.on('thisid',index=>{
            this.thisurl = index;
            
            // console.log(this.thisurl);
        });
        bus.on('musids',ids=>{
            this.musids = ids;
            this.getSrc()
            // bus.emit('thisurl',this.thisurl)
            // console.log(this.musids);
        })
        bus.on('istr',istr=>{
            this.iftr = istr;
            //    console.log(istr)
        })
        bus.on('musicName',musicName=>{
            this.musicName = musicName;
            // console.log(musicName);
        });
        bus.on('singerName',singerName=>{
            this.singerName = singerName;
            // console.log(singerName);
        });
        bus.on('picUrl',picUrl=>{
            this.picUrl = picUrl;
            // console.log(picUrl);
        })
        
        bus.emit('thisurl',this.thisurl)
    },
    beforeUpdate(){
        
    },
    updated(){
        bus.on('istr',istr=>{
            this.iftr = istr;
        })
        bus.emit('thisurl',this.thisurl)
        
    },
    computed:{
        formatTotalTime() {
            return this.formatTime(this.totalTime)
        },
        formatCurrentTime() {
            return this.formatTime(this.currentTime)
        }
    },
    mounted() {
        this.$refs.audio.src = this.audioURL
    // 将range位置归0--如果不使用这个的话，设置了value之后没有用= =郁闷
        setTimeout(() => {
        this.$refs.range.value = 0
        }, 1)
        
    },
    methods:{
        getlike() {
            this.liketr = !this.liketr;
        },
        play() {
            const audio = this.$refs.audio;
            this.iftr = true;
                audio.play();
            if(this.musurl == undefined || this.musurl == "" || this.musurl == null) {
                this.iftr = false;
                alert("没有可播放歌曲")
            }
            // console.log(this.iftr);
        },
        pause() {
            const audio = this.$refs.audio;
            audio.pause()
            this.iftr = false;
            // console.log(this.iftr);
            
        },
        getlast(){
            console.log('点击上一首')
            
            if(this.thisurl > 0){
                this.thisurl --
                // console.log(this.thisurl)
                this.getSrc()
            }else{
                alert("没有上一首歌了哦")
            }
        },
        getnext() {
            console.log('点击下一首')
            
            if(this.thisurl >=  this.musids.length -1){
                this.thisurl = 0;
                this.getSrc()
                // bus.emit('thisurl',this.thisurl)
            }else{
                this.thisurl ++
                this.getSrc()
                // console.log(this.thisurl)
                // bus.emit('thisurl',this.thisurl)
            }
        },

        // 音乐缓存完毕，获取时间
        loadingFinish() {
        const totalTime = this.$refs.audio.duration
        this.totalTime = totalTime
        // console.log(this.totalTime)
        },
        // range--拖动进度条得到的回调
        onChange() {
            let value = this.$refs.range.value
            const persentage = ((value / 360) * 100).toFixed(1) + '%'
            this.$refs.range.style.backgroundSize = `${persentage} 100%`
            // 控制音频播放
            const timeToGo = (value / 360) * this.totalTime
            const audio = this.$refs.audio
            audio.currentTime = timeToGo
            // this.getAudioEnded()
            // console.log(audio.currentTime)
        },
        // audio--进度变化的时候的回调--改变文字
        update() {
            const audio = this.$refs.audio
            const currentTime = audio.currentTime // 当前播放时间
            this.currentTime = currentTime
            // console.log('this.totalTime:'+this.totalTime)
            // console.log('this.currentTime:'+this.currentTime)
            // 改变进度条的值
            this.getAudioEnded()
            const range = this.$refs.range
            range.value = ((this.currentTime / this.totalTime) * 360).toFixed(1)
            // console.log('range.value:'+range.value)
            // 进度条的值改变的时候，颜色也跟着变化
            const persentage = ((this.currentTime / this.totalTime) * 100).toFixed(1) + '%'
            // console.log('persentage:'+persentage)
            this.$refs.range.style.backgroundSize = `${persentage} 100%`
        },

        //辅助函数，将秒变成分秒的形式--用在计算属性中
        formatTime(value) {
            let second = 0
            let minute = 0
            minute = parseInt(value / 60)
            second = parseInt(value % 60)
            // 补0
            minute = minute < 10 ? '0' + minute : minute
            second = second < 10 ? '0' + second : second
            return minute + ':' + second
        },
        getSrc:function() {
            // console.log(this.musids)
            // console.log(audio.readyState)
            if(this.musids !== undefined && this.musids !== '' && this.musids !== null) {
                this.$axios.get("/song/url?id="+this.musids[this.thisurl]).then((response) =>{
                    // console.log(response)
                    
                    this.musurl = response.data.data[0].url;
                    // this.$store.commit('saveMusicUrl',this.musurl)
                    // console.log(this.musurl) 
                })}
            
        },
        getAudioEnded(){
            const audio = this.$refs.audio;
            // console.log(audio.ended)
            if(audio.ended == true) {
                console.log('播完啦')
                this.thisurl++;
                console.log(this.thisurl)
                this.$axios.get("/song/url?id="+this.musids[this.thisurl]).then((response) =>{
                this.musurl = response.data.data[0].url
                })
            }
            if(this.thisurl > this.musids.length-1){
                console.log("没有啦")
                this.iftr = false
                audio.pause();
                // return;
            }
        }
        }
    }
</script>

<style>
.audioMus {
    position: fixed;
    bottom: 0;
    height:65px;
    border-radius: 0;
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
}

.music-container{
    margin-left: 40%;
    margin-top: 10px;
}
.music-item{
    position: absolute;
    left: 10px;
    width: 200px;
    height: 100%;
    text-overflow:ellipsis; 
    /* background-color: plum; */
    /* overflow: hidden; */
}
.music-item img{
    width: 60px;
    height: 50px;
    border-radius: 10px;
    /* height:100%; */
}
.music-item p{
    position: absolute;
    left: 90px;
    top: 10px;
    font-size: 12px;
    
}
.music-item p:nth-child(2){
    overflow: hidden;
    height:19px;
    width:100px;
    text-overflow: ellipsis;
    /* color:#ccc; */
    /* background: #000; */
    
}
.music-item p:last-child{
    top: 32px;
    height:19px;
    width:100px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.music-timer{
    position: absolute;
    left: 33%;
    top: 42px;
    font-size: 15px;
    color: rgb(151, 145, 145)
}
.timefirst{
    position: absolute;
    left: 0%;
}
.timelast{
    position: absolute;
    left: 500px;
}
.navigation{
    /* background-color: #000; */
    /* color: white; */
    position:fixed;
    left: 36%;
    border: none;
    margin-right: 80px;
}
.action-btn{
    margin-right: 80px;
    float: left;
}
.navigation .iconfont{
    font-size:26px;
    border:1px solid white;
    cursor: pointer;
}
audio {
    height:20px;
    width:250px;
    color: white;
}
.progress-container{
    position: absolute;
    top: 38px;
    left: 36%;
}
input[type='range'] {
    outline: none;
    -webkit-appearance: none; /*清除系统默认样式*/
    width: 450px;
    background: -webkit-linear-gradient(#ccc, #ccc) no-repeat, #dddddd; /*背景颜色，俩个颜色分别对应上下*/
    background-size: 0% 100%; /*设置左右宽度比例，这里可以设置为拖动条属性*/
    height: 4px; /*横条的高度，细的真的比较好看嗯*/
}
/*拖动块的样式*/
input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none; /*清除系统默认样式*/
    height: 8px; /*拖动块高度*/
    width: 8px; /*拖动块宽度*/
    border-radius: 50%;
    left: 0;
    background: rgb(221, 142, 201); /*拖动块背景*/
}

</style>