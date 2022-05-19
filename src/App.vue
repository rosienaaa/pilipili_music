<template>
  <div>
    <div id="head">
      <Head></Head>
      <Search></Search>
      <Login></Login>
    </div>
    <div class="nav">
      <Nav></Nav>
    </div>
    <div class="bottomm">
      <bottom/>
    </div>
      
  </div>
</template>

<script>
import Head from './components/head/HeadIcon.vue'
import Search from './components/head/HeadSearch.vue'
import Login from './components/head/HeadLogin.vue'
// import MusicTab from './components/music/MusicTab.vue'
import Nav from './components/nav/NavTab.vue'
import Bottom from './components/bottomAudio/BottomAudio.vue'
export default {
  name: 'App',
  components:{
    Head,
    Search,
    Login,
    Nav,
    Bottom,
    // eslint-disable-next-line vue/no-unused-components
    
    
  },
  
}

</script>

<style>
  @font-face {
    font-family: 'iconfont';
    src: url('./fonts/iconfont.ttf') format('truetype');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
/* 
* {
    margin: 0;
    padding: 0;
    max-width: 1535px;
} */

.app {
    position: relative;
}
.audioMus {
    position: fixed;
    bottom: 0;
    height:65px;
    border-radius: 0;
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
}


</style>
