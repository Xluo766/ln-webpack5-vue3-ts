<script setup lang="ts">
import { ref, reactive } from "vue";
import "@/assets/10kb.jpeg";
import "@/style/a.css";

const count = ref(1);

const obj = reactive({
  namer: "ln"
});
console.log(obj);



console.log("12e3123");
</script>

<template>
  <h1 @click="count++">webpack5 + vue3 +ts</h1>
  <h3>数字123：{{ count }}</h3>
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
