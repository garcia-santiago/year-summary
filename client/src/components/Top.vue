<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'
</script>

<template>
  <nav class="text-xl mt-6">

    <a class="icon-btn mx-2" rel="noreferrer" href="/" title="Home">
      <carbon-home />
    </a>

    <button class="icon-btn mx-2 !outline-none" @click="toggleDark">
      <carbon-moon v-if="!isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/garcia-santiago/" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>

    <a class="icon-btn mx-2" rel="noreferrer" href="/about" title="About">
      <carbon-help />
    </a>

  </nav>
</template>
