<script setup lang="ts">
import { ref } from "vue";
import "@/assets/10kb.jpeg";
import "@/style/a.css";

const count = ref(1);

console.log('12e3123');

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

h1 {
  background-color: $baseColor2;
  user-select: none;
}
</style>
