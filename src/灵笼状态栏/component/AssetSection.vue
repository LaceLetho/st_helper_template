<template>
  <SectionCard title="资产">
    <template #icon>
      <svg class="icon-svg" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#40a9ff" />
      </svg>
    </template>

    <div class="trade-grid">
      <div class="currency-box">
        <svg class="icon-svg" viewBox="0 0 24 24">
          <path
            d="M12 2c1.3 0 2.5.7 3.2 1.8.8-.3 1.8-.3 2.6.2 1.1.6 1.7 1.7 1.7 2.9 1 .6 1.7 1.6 1.8 2.8.2 1.4-.4 2.8-1.5 3.7.4 1 .2 2.2-.4 3.1-.7 1-1.8 1.5-3 1.5l.6 2c.2.6-.2 1.3-.8 1.7-.5.3-1.1.3-1.6.1L12 20.8l-2.6 1c-.5.2-1.1.2-1.6-.1-.6-.4-1-1.1-.8-1.7l.6-2c-1.2 0-2.3-.5-3-1.5-.6-.9-.8-2.1-.4-3.1-1.1-.9-1.7-2.3-1.5-3.7.1-1.2.8-2.2 1.8-2.8 0-1.2.6-2.3 1.7-2.9.8-.5 1.8-.5 2.6-.2C9.5 2.7 10.7 2 12 2zm-1 3.1V17h2V5.1c-.3-.1-.7-.1-1-.1s-.7 0-1 .1zm-2 .5c-.4.2-.8.5-1.1.9l4.1 11h1.6L9 5.6zm6 0L10.4 17.5H12l4.1-11c-.3-.4-.7-.7-1.1-.9zm-7.9 2.2c-.3.4-.6.9-.7 1.4l5.6 9.3h1.4L7.1 7.8zm9.8 0l-5.3 10.2H13l5.6-9.3c-.1-.5-.4-1-.7-1.4zM5.2 11.2c-.1.5 0 1.1.3 1.6l6 5.2h1L5.2 11.2zm13.6 0L11.5 18h1l6-5.2c.3-.5.4-1.1.3-1.6z"
            fill="#40a9ff"
          />
        </svg>
        <span class="currency-label">晶币</span>
        <span class="currency-val">{{ store.data.晶币余额 }}</span>
      </div>
      <div>
        <ul class="asset-list">
          <li v-if="assets.length === 0" class="empty-hint">暂无资产与潜能</li>
          <AssetItem
            v-for="(asset, index) in assets"
            :key="index"
            :name="asset.名称"
            :type="asset.类型"
            :detail="asset.详情"
          />
        </ul>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import AssetItem from './AssetItem.vue';
import SectionCard from './SectionCard.vue';

const store = useDataStore();
const assets = computed(() => store.data.资产与潜能);
</script>

<style lang="scss" scoped>
.trade-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
}

.currency-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.35);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(64, 169, 255, 0.25);
}

.currency-label {
  font-size: 11px;
  color: #8c8c8c;
}

.currency-val {
  font-size: 15px;
  font-weight: bold;
  color: #91d5ff;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.asset-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 480px) {
  .trade-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
