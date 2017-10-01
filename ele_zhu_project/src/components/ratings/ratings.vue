<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size='36' :score='seller.servieScore'></star>
            <span class="num">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star :size='36' :score='seller.foodScore'></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="evaluation">
      <div class="classify">
        <span class="item" v-for="(item,index) in classifyArr" :key='item.id' :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="filterEvel(item)">
          {{item.name}}<span class="count">{{item.count}}</span>
        </span>
      </div>
      <div class="switch" @click="evelflag = !evelflag">
        <span class="icon-check_circle" :class="{'on': evelflag}"></span>
        <span class="text">只看有内容的评价</span>
      </div>
      <div class="evel-list">
        <ul>
          <li class="evel" v-for="evel in evelArr" :key="evel.id">
            <div class="avator">
              <img :src="evel.avator" width="28" height="28" alt="">
            </div>
            <div class="content">
              <div class="user">
                <span class="name">{{evel.username}}</span>
                <span class="rateTime">{{evel.rateTime | time}}</span>
              </div>
              <div class="star-wrapper">
                <star :size='24' :score='evel.score'></star>
                <span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">
                {{evel.text}}
              </div>
              <div class="recommand">
                <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                <span class="dish" v-for="dish in evel.recommend" :key="dish.id">{{dish}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from 'components/star/star'
import axios from 'axios'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      ratings: [],
      seller: {},
      classifyArr: [
        {
          name: '全部',
          count: 0,
          active: true
        },
        {
          name: '推荐',
          count: 0,
          active: false
        },
        {
          name: '吐槽',
          count: 0,
          active: false
        }
      ],
      evelflag: false
    }
  },
  created () {
    this.initData()
  },
  computed: {

  },
  methods: {
    filterEvel (item) {
      this.classifyArr.forEach((data) => {
        data.active = false
      })
      item.active = true
    },
    initData () {
      axios.get('static/data.json').then((res) => {
        console.log(res.data)
        this.ratings = res.data.ratings
        this.seller = res.data.seller
        this._initClassifyArr()
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          })
        })
      })
    },
    _initClassifyArr () {
      this.classifyArr.forEach((data, index) => {
        if (index) {
          data.count = this.ratings.filter((temp) => temp.rateType === index - 1).length
        } else {
          data.count = this.ratings.length
        }
      })
    }
  },
  components: {
    star
  }
}
</script>
<style lang="stylus" scoped>
.ratingsWrapper
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .ratings-content
    .info
      display flex
      .mark
        flex 0 0 138px
        margin 18px 0
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        .num
          font-size 24px
          color rgb(255, 153, 0)
          line-height 28px
        .text
          padding 6px 0 8px 0
          font-size 12px
          color rgb(7, 17, 27)
          line-height 12px
        .contrast
          font-size 10px
          color rgb(7, 17, 27)
          line-height 10px
          margin-bottom 6px
      .stars
        padding 18px 24px
        .serviceScore, .foodScore, .deliveryTime
          display flex
          margin-bottom 8px
          .text
            font-size 12px
            color rgb(7, 17, 27)
            line-height 18px
            margin-right 12px
          .num
            font-size 12px
            line-height 18px
            color rgb(255,153,0)
        .deliveryTime
          margin-bottom 0
          .time
            font-size 12px
            color rgb(147,153,159)
            line-height 18px
  .evaluation
    padding 18px 0
    position relative
    .classify
      padding-bottom 18px
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .item
        display inline-block
        font-size 12px
        padding 8px 12px
        line-height 16px
        background rgba(0,160,220,0.2)
        color rgb(77,85,95)
        margin-right 8px
        .count
          font-size 8px
          padding-left 2px
        &.active
          color white
          background rgb(0,169,220)
        &.bad
          background rgba(77,85,93,0.2)
        &.badActive
          background #4d555d
    .switch
      font-size 12px
      width 100%
      padding 12px 0 12px 18px
      color rgb(147,153,159)
      border-bottom 1px solid rgba(7,17,27,0.1)
      .icon-check_circle
        font-size 24px
        vertical-align middle
        &.on
          color #00c850
    .evel-list
      .evel
        display flex
        padding 18px 0
        margin 0 18px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
</style>
