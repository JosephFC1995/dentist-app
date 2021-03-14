<template>
  <div class="content--page--default h--100 __content_page_error">
    <div class="content">
      <h1 v-if="error.statusCode === 404">
        <div class="__image__error no_found">
          <img src="/404_error.png" alt="Error page" />
        </div>
      </h1>
      <h1 v-else>
        <div class="__image__error no_found">
          <img src="/500_error.png" alt="Error page" />
        </div>
      </h1>
      <a-button type="primary" html-type="submit" @click="goToPage" class="w-100"> Regresar al inicio </a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    goToPage() {
      this.$router.push({
        name: 'singin',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}
.__content_page_error {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  .__image__error {
    img {
      width: 500px;
    }
  }
}
</style>
