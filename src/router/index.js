import {createRouter, createWebHashHistory} from "vue-router"
// import Home from '../src/components/Home.vue'
// import Blog from '../src/components/Blog.vue' 
import Music from '../components/music/MusicTab.vue' 
import Video from '../components/music/MusicVideo.vue'
import Collection from '../components/music/MusicCollection.vue'
import Recommend from '../components/music/MusicRecommend.vue'
import PlayList from '../components/bars/PlayList.vue'
import YouLike from '../components/bars/YouLike.vue'
import RankingList from '../components/bars/RankingList.vue'
import Singer from '../components/bars/SinGer.vue'
import MusicTrack from '../components/playlists/MusicTrack.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Music,
            children: [
                {
                    path: '',
                    component:YouLike
                }
            ]
        },
        {
            path: '/music',
            component: Music,
            children: [
                {
                    path: 'like',
                    component:YouLike
                },
                {
                    path: 'playlist',
                    component:PlayList
                },
                {
                    path: 'rankinglist',
                    component:RankingList
                },
                {
                    path: 'singer',
                    component:Singer
                },
            ]
        },
        {
            path: '/video',
            component: Video
        },
        {
            path: '/collection',
            component: Collection
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path:'/musiclist',
            component: MusicTrack
        }
    ]
})
export default router;