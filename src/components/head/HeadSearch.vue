<template>
    <div class="head-search">
        <div class="search-icon">
            <span v-on:click="searchMusic()" class="iconfont">&#xe693;</span>
            <input v-model="query" v-on:keydown.enter="searchMusic()" id="search-input" type="search" placeholder="请输入音乐/视频">
        </div>
    </div>
</template>

<script>
// import bus from '../../eventBus';
export default {
    name: 'HeadSearch',
    // el: '#search',
    data() {
        return {
            query: '',
        }
    },
    mounted () {
        // this.ifquery()
    },
    beforeUpdate() {
        // this.ifquery()
    },
    methods: {
        searchMusic() {
            if(this.query == ''){
                return alert("搜索词为空")
            }else{
                this.$router.push(`/search?id=${this.query}`);
                // bus.emit('query',this.query);
            }
        },
    }
}
</script>

<style>
.head-search {
    position: absolute;
    width: 170px;
    left: 1100px;
    top: 21px;
    right: 300px;
    background-color: rgba(141, 92, 145, 0.4);
    border-radius: 10px;
}

.search-list{
    /* position: absolute; */
    width: 300px;
    height: 300px;
    background-color: white;
    overflow: scroll;
    border-radius: 10px;
    box-shadow:1px 1px 1px black;
    /* z-index: 100; */
    /* display: none; */
}

.head-search input {
    width: 136px;
    height: 34px;
    outline: none;
    border-radius: 10px;
    background-color: rgba(70, 44, 71, 0.2);
    /* background-color: #fff; */
    color: #fff;
    border: 0;
}

.head-search .iconfont {
    /* position: absolute; */
    font-size: 18px;
    /* padding: 5px; */
    padding-left: 10px;
    /* background-color: #fff; */
    line-height: 29px;
    color: rgba(255, 255, 255, 0.671);
    cursor: pointer;
    left: 5px;
}

</style>