<!-- pages/index.vue -->
<template>
    <adminNewDeviceRepair/>
  </template>
  
  <script>
  import adminNewDeviceRepair from '@/components/admin/adminNewDeviceRepair.vue'
  
  export default {
    
   layout:'adminLayout',
   components:{
    adminNewDeviceRepair:adminNewDeviceRepair
   }
  };
  </script>
  