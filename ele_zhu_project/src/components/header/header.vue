<template>
<div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img :src="seller.avatar" alt="" width="64" height="64">
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name" v-text="seller.name"></span>
            </div>
            <div class="description">
                <span>{{seller.description+'/'+seller.deliveryTime+'分钟送达'}}</span>
            </div>
            <div class="supports" v-if="seller.supports">
                <div class="supports_desc">
                  <span class="icon" :class="iconClassMap[seller.supports[0].type]">
                  </span>
                  <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetails()">
            <span class="count">{{seller.supports.length+'个'}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetails()">
      <span class="bulletin-title"></span>
      <span class="bulletin-text" v-text="seller.bulletin"></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width='100%' height='100%'>
    </div>
    <transition name="fade">
      <div v-if="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size='48' :score='seller.score'></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports" :key="item.id">
                <span class="icon" :class="iconClassMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail()"></i>
        </div>
      </div>
    </transition>
</div>
</template>

<script>
import star from 'components/star/star'
export default {
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetails: function () {
      this.detailShow = true
    },
    hideDetail: function () {
      this.detailShow = false
    }
  },
  components: {
    star
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin'
.header
  position relative
  background rgba(7, 17, 27, 0.5)
  color #ffff
  blur 10px
  overflow hidden
  .content-wrapper
    position relative
    display flex
    padding: 24px 12px 18px 24px
    font-size 12px
    .avatar
      margin-right 16px
      img
        border-radius 4px
    .content
      .title
        margin 2px 0 8px 0
        font-size 16px
        .brand
          display inline-block
          vertical-align top
          bg-img('brand')
          width 30px
          height 18px
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          font-weight bold
          line-height 18px
      .description
        font-size 12px
        margin-bottom 10px
      .supports
        .icon
          display inline-block
          vertical-align  top
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-img('decrease_1')
          &.discount
            bg-img('discount_1')
          &.special
            bg-img('special_1')
          &.invoice
            bg-img('invoice_1')
          &.guarantee
            bg-img('guarantee_1')
        .text
          font-size 10px
          line-height 12px
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      background-color rgba(0,0,0,0.2)
      border-radius 14px
      height 24px
      line-height 24px
      font-size 10px
      font-weight 200
      color rgb(255, 255, 255)
      text-align center
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        font-size 10px
        margin-left 2px
        line-height 24px
  .bulletin-wrapper
    position relative
    height 28px
    font-size 10px
    line-height 28px
    background-color rgba(7, 17, 27, 0.2)
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    .bulletin-title
      display inline-block
      vertical-align top
      margin-top 8px
      width 22px
      height 12px
      bg-img('bulletin')
      background-size 100% 100%
      background-repeat no-repeat
    .bulletin-text
      font-size 10px
      margin 0 4px
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 8px
      top 8px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    filter blur(10px)
    z-index -1
  .detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 9999
    background rgba(7, 17, 27, 0.8)
    backdrop-filter blur(10px)
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          font-size 16px
          font-weight 700
          color rgb(255, 255, 255)
          line-height 16px
          width 100%
          text-align center
        .star-wrapper
          margin 16px 11px 28px 0
          text-align center
        .title
          display flex
          width 80%
          margin 0 auto 24px auto
          .line
            display inline-block
            flex 1
            height 1px
            background rgba(255,255,255,0.2)
            margin auto
          .text
            font-size 14px
            padding 0 12px
            font-weight 700
        .supports
          padding: 0 0 28px 36px
          .support-item
            color white
            padding 0 6px 12px 16px
            .text
              vertical-align middle
              font-size 12px
              font-weight 200
              color rgb(255, 255, 255)
              line-height 12px
            .icon
              display inline-block
              vertical-align top
              width 16px
              height 16px
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-img('decrease_2')
              &.discount
                bg-img('discount_2')
              &.special
                bg-img('special_2')
              &.invoice
                bg-img('invoice_2')
              &.guarantee
                bg-img('guarantee_2')
      .bulletin
        padding 0 48px
        font-size 12px
        font-weight 200
        color rgb(255,255,255)
        line-height 24px
    .detail-close
      position fixed
      width 32px
      height 32px
      font-size 32px
      color rgba(255,255,255,0.5)
      bottom 10%
      left 50%
      transform translateX(-50%)
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity : 0
    }
</style>
