<template>
  <div class="paginator">

    <div class="page-info">Página {{ currentPage }} de {{ totalPages }}</div>
    <button
      class="previous-page"
      :disabled="currentPage === 1"
      @click="goTo(currentPage - 1)"
    >Previous</button>
    <button
      v-for="page in range(totalPages)"
      :class="`page page-${page}`"
      :key="page"
      :disabled="page === currentPage"
      @click="() => goTo(page)"
    >
      {{ page }}
    </button>
    <button
      class="next-page"
      @click="goTo(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >Next</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Paginator',
  computed: {
    ...mapState(['currentPage', 'totalPages']),
  },
  methods: {
    range: max => Array.from(Array(max).keys()).map(v => v + 1),
    goTo(page) {
      this.goToPage(page);
      this.$emit('pageChanged', page);
    },
    ...mapActions(['goToPage']),
  }
};
</script>
