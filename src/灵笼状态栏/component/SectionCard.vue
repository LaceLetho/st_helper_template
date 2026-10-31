<template>
  <section class="section-card" :class="{ 'theme-blue': theme === 'blue', 'theme-pink': theme === 'pink' }">
    <div class="section-header">
      <slot name="icon" />
      <span>{{ title }}</span>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; theme?: 'blue' | 'pink' }>(), { theme: 'blue' });
</script>

<style lang="scss" scoped>
.section-card {
  border-radius: 8px;
  padding: 10px 14px;
  position: relative;
  overflow: visible;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.theme-blue {
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.85) 0%, rgba(15, 34, 64, 0.75) 100%);
  border-color: rgba(64, 169, 255, 0.3);
  box-shadow:
    0 0 12px rgba(0, 180, 255, 0.15),
    inset 0 0 8px rgba(0, 180, 255, 0.08);
}

.theme-pink {
  background: linear-gradient(135deg, rgba(38, 16, 28, 0.85) 0%, rgba(48, 20, 36, 0.75) 100%);
  border-color: rgba(247, 89, 171, 0.3);
  box-shadow:
    0 0 12px rgba(255, 105, 180, 0.15),
    inset 0 0 8px rgba(255, 105, 180, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-transform: uppercase;
}

.theme-blue .section-header {
  color: #70c0ff;
  text-shadow: 0 0 6px rgba(112, 192, 255, 0.6);
}

.theme-pink .section-header {
  color: #ff85c0;
  text-shadow: 0 0 6px rgba(255, 133, 192, 0.6);
}
</style>
