<template>
  <ul class="flex">
    <li v-for="r in routes" class="px-2 m-2 border border-gray-700">
      <RouterLink :to="r.path">{{ r.meta?.title }}</RouterLink>
    </li>
  </ul>
  <RouterView />
</template>
<script setup>
import routes from "./router/routes";

console.log(routes);
</script>
