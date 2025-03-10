import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  locale: { antd: true , default:'RU-ru' },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Товарник',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Главная страница',
      path: '/home',
      component: './Home',
    },
    {
      name:'Материалы' ,
      path:'/materials' ,
      component:'./Materials'
    },
    {
      name:'Заказы' , 
      path: '/orders' ,
      component: './Zakazy'
    }
  ],
  npmClient: 'npm',
});

