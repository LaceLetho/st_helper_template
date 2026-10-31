import { waitUntil } from 'async-wait-until';
import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

async function init() {
  await waitGlobalInitialized('Mvu');
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));

  const app = createApp(App).use(createPinia());
  app.mount('#app');
  console.info('[灵笼状态栏] 挂载完成');
  $(window).on('pagehide', () => {
    app.unmount();
    console.info('[灵笼状态栏] 已卸载');
  });
}

$(() => {
  errorCatched(init)();
});
