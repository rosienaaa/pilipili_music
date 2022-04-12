<template>
  <div>
    <div id="head">
      <Head></Head>
      <Search></Search>
      <Login></Login>
    </div>
    <div>
      <Nav></Nav>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import Head from './components/head/HeadIcon.vue'
import Search from './components/head/HeadSearch.vue'
import Login from './components/head/HeadLogin.vue'
import MusicTab from './components/music/MusicTab.vue'
import Nav from './components/nav/NavTab.vue'
export default {
  name: 'App',
  components:{
    Head,
    Search,
    Login,
    Nav,
    // eslint-disable-next-line vue/no-unused-components
    MusicTab,
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

.centent {
    position: absolute;
    /* background-color: plum; */
    width: 1005px;
    height: 400px;
    left: 0%;
    top: 70px;
    /* overflow: hidden; */
}

.curren {
    position: absolute;
    left: 103%;
    top: 3px;
    width: 100%;
    /* max-height: 1600px; */
    /* background-color: pink; */
}

.aside .bar {
    /* background-color: #000; */
    /* margin-top: 20px;
    margin-left: 40px; */
    padding-right: 100px;
    font-size: 20px;
    font-weight: bold;
    height: 20px;
    width: 1216px;
}

.bar-di {
    width: 100%;
    list-style: none;
}

.bar-di li {
    cursor: pointer;
    padding-left: 20px;
}


.check {
    position: absolute;
    left: 25px;
    bottom: 30px;
    border: none;
    font-size: 14px;
}

.check a {
    margin-right: -10px;
}

.audioMus {
    position: fixed;
    bottom: 0;
}

.audioMus audio {
    width: 1520px;
}

</style>
