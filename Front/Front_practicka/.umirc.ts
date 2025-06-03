import { defineConfig } from '@umijs/max';
import { Component } from 'react';

export default defineConfig({
  antd: {},
  locale: { antd: true , default:'RU-ru' },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Учет произ-ва ',
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
      name:'Справочник' ,
      path:'/library' ,
      component:'./Library'
    },
    {
      name:'Заказы' , 
      path: '/orders' ,
      component: './Zakazy'
    },  
    {
      name:'Производственный заказ' ,
      path:'/productionOperations' ,
      component:'./ProductionOperations'
    },
    {
      name:'Тех.карты' , 
      path : '/technomap',
      component:'./TecnhoMap'
    },
    {
      name:'Документы движения материалов' , 
      path : '/documentMovementMaterial',
      component:'./DocumentMovementMaterial'
    },
    {
      name:'Добавления сырья' , 
      path : '/rawMaterialArrival',
      component:'./RawMaterialArrival'
    }  
  ],
  npmClient: 'npm',
});

