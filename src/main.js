import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import header from './components/Header.vue';
import footer from './components/footer.vue';
import home from './components/Home.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(vuetify);

Vue.use(VueRouter);

Vue.component('compheader',header);
Vue.component('compfooter',footer);
let router = new VueRouter({
  routes:[
    {
    path:'/home',
    name:'home',
    component:home,
    },
    {
      path:'*',
     redirect:{
      name:'home',
      component:home
     }
    }
  ],
  mode:'history',
})

Vue.component('home',home);
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
