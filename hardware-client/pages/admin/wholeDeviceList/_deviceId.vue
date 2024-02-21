<!-- pages/index.vue -->
<template>
    <adminWholeDeviceList/>
  </template>
  
  <script>
  import adminWholeDeviceList from '@/components/admin/adminWholeDeviceList';
  
  export default {
    
   layout:'adminLayout',
   components:{
    adminWholeDeviceList:adminWholeDeviceList
   }
  };
  </script>