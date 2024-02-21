<!-- pages/index.vue -->
<template>
    <adminNewDeviceAdd/>
  </template>
  
  <script>
  import adminNewDeviceAdd from '@/components/admin/adminNewDeviceAdd.vue'
  
  export default {
    
   layout:'adminLayout',
   components:{
    adminNewDeviceAdd:adminNewDeviceAdd
   }
  };
  </script>
  