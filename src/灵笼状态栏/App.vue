<template>
  <div class="status-container">
    <EnvironmentSection />
    <AssetSection />
    <BondSection />
    <TeamSection />
    <MissionSection />
  </div>
</template>

<script setup lang="ts">
import AssetSection from './component/AssetSection.vue';
import BondSection from './component/BondSection.vue';
import EnvironmentSection from './component/EnvironmentSection.vue';
import MissionSection from './component/MissionSection.vue';
import TeamSection from './component/TeamSection.vue';
</script>

<style lang="scss" scoped>
.status-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
