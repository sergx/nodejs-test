<template>
  <section id="main">
    <div class="container">
      <h1>Webpack EC</h1>
      <div>{{message}}</div>
    </div>
  </section>
</template>

<script>
  export default{
    data(){
      return {
        message: null,
      }
    },
    created(){
      this.message = this.$store.getters.getMessage; // Берем из store
    }
  }
</script>

<style lang="scss" scoped>
h1{
  color: green;
}
</style>
