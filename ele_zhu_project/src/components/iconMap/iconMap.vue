<template>
<span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>
<script>
export default {
  props: {
    iconType: Number
  },
  created () {
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
  .iconMap
    display inline-block
    background-size 100% 100%
    background-repeat no-repeat
    width 12px
    height 12px
    &.decrease
      bg-img('decrease_4')
    &.discount
      bg-img('discount_4')
    &.special
      bg-img('special_4')
    &.invoice
      bg-img('invoice_4')
    &.guarantee
      bg-img('guarantee_4')
</style>
