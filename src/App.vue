<script setup lang="ts">
import { ref } from "vue";

const count = ref(1);
</script>

<template>
  <h1 @click="count++">webpack5 + vue3 +ts</h1>
  <h3>数字：{{ count }}</h3>
</template>
<style lang="scss" scoped>
@import "./style/index.scss";

h3 {
  color: $baseColor1;
  @include baseStyle();
}
</style>

<style scoped>
h1 {
  background-color: green;
  user-select: none;
}
</style>
