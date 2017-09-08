<template>
  <div>
    <h2>Child 子组件部分</h2>
    <p>{{message}}</p>
    <button @click="sendMsgToParent">向父组件传值</button>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    methods: {
      sendMsgToParent: function() {
        this.$emit('listenToChildEvent','This message is from child to Parent!')
      }
    }
  }
</script>

<style scoped="scoped">
  
</style>