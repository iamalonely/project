import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { MyPlugin } from '@/utils'
import ElementUI from 'element-ui';/* eslint-disable-line */
import "element-ui/lib/theme-chalk/index.css";
import '@/sass/index.scss'
import "@/assets/iconfont/iconfont.css";
import '@/api/api'
import './permission'

Vue.config.productionTip = false;

Vue.use(MyPlugin);

// 注册ui插件
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
