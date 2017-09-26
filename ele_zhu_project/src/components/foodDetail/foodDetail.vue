<template>
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
        <div class="back" @click="showToggle()">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" height="425" width="100%" alt="">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div class="text" @click="addCart($event)" v-show="!food.count">加入购物车</div>
            </transition>
          </div>
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">
            商品评价
          </div>
          <div class="classify">
            <span v-for="(item,index) in classifyArr" :key="item.id" class="item" :class="{'active': item.active,'bad': index == 2, 'badActive': item.active&&index==2}" @click="filterEval(item)">
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
                <div class="userInfo">
                  <div class="time">{{evel.rateTime | time}}</div>
                  <div class="user">
                    <span>{{evel.username}}</span>
                    <span class="avatar"><img :src="evel.avatar" width="12" height="12" alt=""></span>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="evel.rateType ? 'icon-thumb_down' : 'icon-thumb_up'"></span>
                  <span class="text">{{evel.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  props: {
    food: Object,
    showDetail: false
  },
  components: {
    cartcontrol
  },
  methods: {
    showToggle () {
      this.showDetail = !this.showDetail
      if (this.showDetail) {
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    },
    _initScroll () {
      if (!this.detailWrapper) {
        this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
          click: true
        })
      } else {
        this.detailWrapper.refresh()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.detailWrapper
  position fixed
  left 0
  top 0
  bottom 48px
  width 100%
  background white
  transition all 0.4s ease
  &.move-enter-active,&.move-leave-active
    transform translate3d(0,0,0)
  &.move-enter,&.move-leave-active
    transform translate3d(100%,0,0)
  .foodDetail
    .back
     position absolute
     color white
     top 12px
     left 6px
     font-size 20px
     padding 10px
  .info
    position relative
    box-sizing border-box
    width 100%
    padding 18px
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
    .desc
      display flex
      padding 0
      padding-top 8px
      font-size 10px
      color rgb(147,153,159)
      line-height 10px
      span:last-child
        padding-left 12px
    .price
      display flex
      padding-top 18px
      font-size 14px
      font-weight 700
      color rgb(240,20,20)
      line-height 24px
      .unit
        font-size 10px
        font-weight normal
      .oldPrice
        padding-left 12px
        font-size 10px
        font-weight normal
        color rgb(147,153,159)
        line-height 24px
        text-decoration line-through
    .shopCart
      position absolute
      right 18px
      bottom 18px
      height 24px
      text-align center
      z-index 2
      .text
        box-sizing border-box
        height 100%
        line-height 24px
        color white
        font-size 10px
        padding 0 12px
        border-radius 12px
        background rgb(0,160,220)
        &.fade-enter-active,&.fade-leave-active
          transition opacity .2s
        &.fade-enter,&.fade-leave-active
          opacity 0
    .cartcontrol
      position absolute
      right 12px
      bottom 12px
  .desc
    padding 18px
    .title
      font-size 14px
      font-weight 500
      color #07111b
      margin-bottom 6px
    .content
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
      padding 0 8px
  .evaluation
    padding 18px 0
    position relative
    .title
      padding-left 18px
      font-size 14px
      font-weight 500
      color #07111b
    .classify
      padding 18px 0
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .item
        display inline-block
        font-size 12px
        padding 8px 12px
        line-height 16px
        background rgba(0, 160,220,0.2)
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
      font-size .75rem
      width 100%
      padding .75rem 0 .75rem 1.125rem
      color rgb(147,153,159)
      border-bottom 1px solid rgba(7,17,27,0.1)
      .icon-check_circle
        font-size 1.5rem
        vertical-align middle
        &.on
          color #00c850
    .evel-list
      padding 16px 0
      border-bottom 1px solid rgba(7,17,27,0.1)
      .userInfo
        display flex
        color rgb(147,153,159)
        font-size .625rem 
        line-height .75rem /* 12/16 */
        .time
          flex 1
        .user
          flex 1
          text-align right 
          .avatar
           img 
            padding-left .375rem /* 6/16 */
            border-radius 50%
      .content
        padding-top .375rem /* 6/16 */
        .icon
          font-size .75rem /* 12/16 */
          line-height 1.5rem /* 24/16 */
          &.icon-thumb_up
            color rgb(0,160,220)
          &.icon-thumb_down
            color rgb(147,153,159)
        .text
          font-size .75rem /* 12/16 */
          color rgb(7,17,27)
          line-height 1rem /* 16/16 */
          padding-left .25rem /* 4/16 */
</style>
