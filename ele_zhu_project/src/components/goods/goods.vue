<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item,index) in goods" :key='item.id' @click='menuClick(index,$event)' :class="index===menuCurrentIndex?'menu-item-selected':'menu-item'">
        <span class="text">
          <iconMap v-show="item.type > 0" :iconType='item.type'></iconMap>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import iconMap from 'components/iconMap/iconMap'
export default {
  data () {
    return {
      goods: []
    }
  },
  components: {
    iconMap
  },
  created () {
    axios.get('static/data.json').then((res) => {
      this.goods = res.data.goods
    })
  },
  methods: {
    menuClick () {

    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
