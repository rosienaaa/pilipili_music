<template>
  <div class="singerList">
    <div class="singerList-set">
      <div>分类：</div>
      <div>全部</div>
      <div>男歌手</div>
      <div>女歌手</div>
      <div>乐队</div>
    </div>
    <div class="singerList-list">
      <p v-for="si in singerList" :key="si.id">{{si.name}}</p>
      <img v-for="si in singerList" :key="si.id" :src="si.picUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singerList: '',
    }
  },
  mounted() {
    this.getsingerList()
  },
  methods: {
    getsingerList() {
      this.$axios.get("/artist/list?type=-1&area=-1&initial=-1").then(response=> {
        this.singerList =  response.data.artists;
        console.log(response)
      })
    }
  }
}
</script>

<style>
.singerList-set div{
  width: 70px;
  height: 50px;
  margin-left: 10px;
  /* background-color: pink; */
  text-align: center;
  line-height: 50px;
  float: left;
  font-size: 15px;
  font-weight: normal;
  color:rgba(0,0,0,0.7)
}
.singerList-list p{
  float: left;
}
.singerList-list img{
  width: 180px;
  height:170px;
  float: left;
}
</style>