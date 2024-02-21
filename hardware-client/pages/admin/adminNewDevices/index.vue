<template>
    <adminDeviceList/>
  </template>
  
  <script>
  import adminNewdevice from '@/components/admin/adminNewDevices.vue'
  export default {
    
   layout:'adminLayout',
   components:{
    adminNewdevice:adminNewdevice
   }
  };
  </script>