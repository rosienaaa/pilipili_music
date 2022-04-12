// import Vue from 'vue'
import Vuex from 'vuex'

// Vue.use(Vuex)


    const state = {
        // 音乐的url
    lisId: '',
    // 音乐的播放状态
    isPlay: false,
    // 当前播放的歌单
    musicList: [],
    // 当前播放歌单的id
    musicListId: '',
    // 是否登录
    isLogin: false,
    // 当前播放音乐的索引
    currentIndex: -1,
    // 音乐详情卡片的显隐
    isMusicDetailCardShow: false,
    // 实时播放时长
    currentTime: 0,
    // 音乐是否在加载中
    isMusicLoad: false,
    // 在歌手详情保存的上一首歌曲信息
    currentRowInfo: {},
    // 用户喜欢的音乐列表
    likeMuiscList: [],
    // 已收藏的歌单
    // 已收藏的专辑
    subAlbumList: null,
    // 已收藏的歌手
    subSingerList: null,
    // 已收藏的video
    subVideoList: null,
    // 已收藏的歌单
    collectMusicList: [],
    // 用户创建的歌单
    createdMusicList: [],
    // 要下载的音乐信息
    downloadMusicInfo: {
        name: '',
        url: '',
    },
    // 已喜欢的视频
    likeVideoList: null,
    }

    const store = new Vuex.Store({
        state,
        mutations: {}
    })
    export default store;
