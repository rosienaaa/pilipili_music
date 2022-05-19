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
import SearchList from '../components/playlists/SearchList.vue'
import PersonAl from '../components/personal/PersonAl.vue'
// import SerachSong from '../components/searchlist/SearchSong.vue'
// import SerachSinger from '../components/searchlist/SearchSinger.vue'
// import SerachAlbum from '../components/searchlist/SearchAlbum.vue'
// import SerachSheet from '../components/searchlist/SearchSheet.vue'

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
        },
        {
            path: '/search',
            component:SearchList
            // children: [
            //     {
            //         path:'',
            //         component:SerachSong
            //     },
            //     {
            //         path:'serchsong',
            //         component:SerachSong
            //     },
            //     {
            //         path:'serchsinger',
            //         component:SerachSinger
            //     },
            //     {
            //         path:'serchsheet',
            //         component:SerachSheet
            //     },
            //     {
            //         path:'serchalbum',
            //         component:SerachAlbum
            //     }
            // ]
        },
        {
            path:'/personal',
            component: PersonAl
        }
    ]
})
export default router;