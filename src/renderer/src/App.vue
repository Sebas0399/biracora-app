<script>
  import NavBar from './components/NavBar.vue';
  export default {
    components:{
      NavBar
    }
  }
</script>

<template> 
    <NavBar ></NavBar>
    <RouterView />
</template>
