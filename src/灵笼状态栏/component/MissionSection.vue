<template>
  <SectionCard title="外勤">
    <template #icon>
      <svg class="icon-svg" viewBox="0 0 24 24">
        <path
          d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
          fill="#40a9ff"
        />
      </svg>
    </template>

    <!-- 降级提示：任务目标为空或字符数<5时展示 -->
    <div v-if="!target || target.length < 5" class="empty-hint">没有外勤任务</div>
    <!-- 完整任务信息展示 -->
    <div v-else class="mission-grid">
      <div class="mission-top-row">
        <div class="mission-cell">
          <div class="mission-cell-label">
            <svg class="icon-svg" viewBox="0 0 24 24">
              <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" fill="#40a9ff" />
            </svg>
            <span>任务目标</span>
          </div>
          <div class="mission-cell-val">{{ target }}</div>
        </div>
        <div class="mission-cell">
          <div class="mission-cell-label">
            <svg class="icon-svg" viewBox="0 0 24 24">
              <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"
                fill="#ff7875"
              />
            </svg>
            <span>髓晶耗尽时间</span>
          </div>
          <div class="mission-cell-val-highlight">{{ store.data.外勤任务.髓晶耗尽时间 }}</div>
        </div>
      </div>

      <div class="mission-cell">
        <div class="mission-cell-label">
          <svg class="icon-svg" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#faad14" />
          </svg>
          <span>周边威胁</span>
        </div>
        <div class="mission-cell-val">{{ store.data.外勤任务.周边威胁 }}</div>
      </div>

      <div class="mission-cell">
        <div class="mission-cell-label">
          <svg class="icon-svg" viewBox="0 0 24 24">
            <path
              d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
              fill="#40a9ff"
            />
          </svg>
          <span>携带物资</span>
        </div>
        <ul class="supply-list">
          <li v-if="supplies.length === 0" class="empty-hint">未携带额外特战物资</li>
          <li v-for="supply in supplies" :key="supply.name" class="supply-item">
            <span class="supply-name">{{ supply.name }}</span>
            <span v-if="supply.detail.trim() !== ''" class="supply-detail">({{ supply.detail }})</span>
          </li>
        </ul>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import SectionCard from './SectionCard.vue';

const store = useDataStore();

const target = computed(() => store.data.外勤任务.任务目标.trim());

const supplies = computed(() =>
  _(store.data.外勤任务.携带物资)
    .entries()
    .map(([name, detail]) => ({ name, detail }))
    .value(),
);
</script>

<style lang="scss" scoped>
.mission-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mission-top-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
}

.mission-cell {
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(64, 169, 255, 0.2);
}

.mission-cell-label {
  font-size: 11px;
  color: #8c8c8c;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.mission-cell-val {
  font-size: 12px;
  color: #e6f7ff;
  line-height: 1.4;
}

.mission-cell-val-highlight {
  font-size: 12px;
  color: #ff7875;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-weight: 600;
}

.supply-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 4px 0 0 0;
  padding: 0;
  list-style: none;
}

.supply-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(64, 169, 255, 0.25);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.supply-name {
  color: #b5f5ec;
  font-weight: 500;
}

.supply-detail {
  color: #8c8c8c;
}

@media (max-width: 520px) {
  .mission-top-row {
    grid-template-columns: 1fr;
  }
}
</style>
