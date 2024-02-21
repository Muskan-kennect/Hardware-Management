<!-- pages/index.vue -->
<template>
    <adminNewDeviceRepair/>
  </template>
  
  <script>
  import adminNewDeviceRepair from '@/components/admin/adminTemporaryDeviceRepair.vue'
  
  export default {
    
   layout:'adminLayout',
   components:{
    adminNewDeviceRepair:adminNewDeviceRepair
   }
  };
  </script>
  