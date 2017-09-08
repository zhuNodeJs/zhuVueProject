<template>
  <div id="app">
    <child message='Hello my world' @listenToChildEvent='sendMsgToParent'></child>
    <h2 v-text="title"></h2>
    <input type="text" @keyup.enter="addNewItem" v-model="newItem"/>
    <ul>
    	<li v-for="item in items" :class="{finished: item.isFinished}" @click="toggleFinished(item)">
    	  {{item.label}}
    	</li>
    </ul>    
  </div>
</template>

<script>
import Store from './store';
import child from './components/Child';
export default {
  data: function() {
    return {
      title: 'This is the todoList',
      items: Store.fetch(),
      newItem: ''
    }
  },
  watch: {
    items: {
      handler: function(val, oldValue) {
        Store.save(val);
      },
      deep: true
    }
  },
  methods: {
    toggleFinished: function(item) {
      item.isFinished = !item.isFinished;
    },    
    addNewItem: function() {
      if(this.newItem.length !== 0) {
        this.items.push({label:this.newItem, isFinished: false});
      }      
      this.newItem = '';
    },
    sendMsgToParent: function(data) {
      
    }
  },
  components: {
    child    
  }
}
</script>

<style>
.finished {
  text-decoration: underline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
