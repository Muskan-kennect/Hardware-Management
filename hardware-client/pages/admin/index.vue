<!-- pages/index.vue -->
<template>
    <adminLandingPage/>
  </template>
  
  <script>
  import adminLandingPage from '@/components/admin/adminDeviceList.vue';
  
  export default {
    
   layout:'adminLayout',
   components:{
    adminLandingPage:adminLandingPage
   }
  };
  </script>
  