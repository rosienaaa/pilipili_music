import {createRouter, createWebHashHistory} from "vue-router"
// import Home from '../src/components/Home.vue'
// import Blog from '../src/components/Blog.vue' 
import Music from '../src/components/music/MusicTab.vue' 
import Video from '../src/components/music/MusicVideo.vue'
import Collection from '../src/components/music/MusicCollection.vue'
import Recommend from '../src/components/music/MusicRecommend.vue'
import PlayList from '../src/components/bars/PlayList.vue'
import YouLike from '../src/components/bars/YouLike.vue'
import RankingList from '../src/components/bars/RankingList.vue'
import Singer from '../src/components/bars/SinGer.vue'
import MusicTrack from '../src/components/playlists/MusicTrack.vue'

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