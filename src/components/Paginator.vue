<template>
  <div class="paginator">

    <button class="previous-page">Previous</button>
    <button
      v-for="page in range(totalPages)"
      :class="`page page-${page}`"
      :key="page"
      @click="() => goToPage(page)"
    >
      {{ page }}
    </button>
    <button class="next-page" @click="goToPage(currentPage + 1)">Next</button>
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
    ...mapActions(['goToPage']),
  }
};
</script>
