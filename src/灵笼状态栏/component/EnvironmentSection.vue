<template>
  <SectionCard title="环境">
    <template #icon>
      <svg class="icon-svg" viewBox="0 0 24 24">
        <path
          d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2M12 2A4 10 0 0 0 12 22A4 10 0 0 0 12 2M12 2A8 10 0 0 0 12 22A8 10 0 0 0 12 2M3 8A9 3 0 0 1 21 8M3 16A9 3 0 0 0 21 16"
          fill="none"
          stroke="#70c0ff"
          stroke-width="1.5"
        />
      </svg>
    </template>

    <div class="env-grid">
      <div class="env-item">
        <svg class="icon-svg" viewBox="0 0 24 24">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="#40a9ff"
          />
        </svg>
        <span class="env-label">当前地点</span>
        <span class="env-val">{{ store.data.当前地点 }}</span>
      </div>
      <div class="env-item">
        <svg class="icon-svg" viewBox="0 0 24 24">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
            fill="#40a9ff"
          />
        </svg>
        <span class="env-label">当前时间</span>
        <span class="env-val">{{ store.data.当前时间 }}</span>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import SectionCard from './SectionCard.vue';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.env-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.env-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid rgba(64, 169, 255, 0.2);
}

.env-label {
  font-size: 11px;
  color: #8c8c8c;
}

.env-val {
  font-size: 13px;
  font-weight: 600;
  color: #b5f5ec;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

@media (max-width: 480px) {
  .env-grid {
    flex-direction: column;
    align-items: stretch;
  }

  .env-item {
    justify-content: space-between;
  }
}
</style>
