<template>
  <div class="component-loading">
    <img src="/assets/images/loading.png" alt="Loading" :width="width" :style="{ display: 'block', margin: '0 auto' }" />
    <a-icon type="loading" :style="{ fontSize: '2rem', color: '#336CFB', justifyContent: 'center', display: 'flex' }" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '250px',
    },
  },
}
</script>

<style></style>
