<template>
  <div class="recommend" ref='recommend'>
    <scroll ref='scroll' class="recommend-content" :data='recommends'>
      <div>
        <div v-if='recommends.length' class="slider-wrapper">
          <slider>
            <div v-for='(item,index) in recommends' :key="index">
              <a :href="item.linkUrl">
                <img @load='loadImg' :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click='selectItem(item)' v-for='(item,index) in discList' class="item" :key='index'>
              <div class="icon">
                <img v-lazy="item.picUrl" alt="" width="60px" height="60px">
              </div>
              <div class="text">
                <h2 class="name" v-html='item.songListAuthor'></h2>
                <p class="desc" v-html='item.songListDesc'></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show='!discList.length'>
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider/slider";
import Scroll from "base/scroll/scroll";
import Loading from 'base/loading/loading'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins:[playListMixin],
  data() {
    return {
      recommends: [],
      discList: [],
      checkLoaded:false
    };
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      this.$http.get("api/getDiscList").then(res => {
        this.discList = res.data.data.songList;
      });
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setDisc(item)
    },
    loadImg(){
      if(!this.checkLoaded){
       this.$refs.scroll.refresh();
      }else{
        return
      }
    },
    handlePlayList(playList) {
      const bottom  = playList.length > 0 ? '60px' : 0
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapMutations({
      setDisc : 'SET_DISC'
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
