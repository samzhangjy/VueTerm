<template>
  <div class="markdown-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
:deep(.markdown-container) {
  margin: 0px;
  :deep(& h1) {
    font-size: 10px;
  }
}
</style>
