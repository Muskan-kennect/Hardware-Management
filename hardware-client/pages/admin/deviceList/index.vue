<!-- pages/index.vue -->
<template>
    <adminDeviceList/>
  </template>
  
  <script>
  import adminDeviceList from '@/components/admin/adminDeviceList.vue'
  export default {
    
   layout:'adminLayout',
   components:{
    adminDeviceList:adminDeviceList
   }
  };
  </script>
  