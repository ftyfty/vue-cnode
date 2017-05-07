<template>
  <div id="app">
  	<cheader></cheader>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <loading></loading>
  </div>
</template>

<script>
	import Cheader from './components/Cheader'
	import Loading from './components/loading'	
export default {
  name: 'app',
  components:{
  	Loading,
  	Cheader
  }
}
</script>

<style>

</style>
