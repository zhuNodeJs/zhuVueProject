<template>
<div class="cartcontrol">
  <transition name="fadeRotate">
    <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent = 'decreaseCart()'>
      <span class="icon-remove_circle_outline inner"></span>
    </div>
  </transition>
  <div class="cart-count" v-show="food.count > 0">
    {{food.count}}
  </div>
  <div class="cart-add" @click.stop.prevent="addCart($event)">
    <i class="icon-add_circle"></i>
  </div>
</div>
</template>
<script>
export default {
  props: {
    food: Object
  },
  methods: {
    decreaseCart () {

    },
    addCart (event) {

    }
  }
}
</script>
<style lang="stylus" scoped>
  .cartcontrol
    .cart-decrease
      display inline-block
      padding 6px
      transition all .4s linear
        .inner
          line-height 24px
          font-size 24px
          color rgb(0, 160, 220)
          transition all .4s linear
    .cart-count
      display inline-block
      vertical-align top
      font-size 10px
      color rgb(147, 153, 159)
      line-height 24px
      text-align center
      padding 6px 0
    .cart-add
      display inline-block
      vertical-align top
      font-size 24px
      color rgb(0, 160, 220)
      line-height 24px
      padding 6px
</style>
