<!-- pages/index.vue -->
<template>
    <adminEmployeeList/>
  </template>
  
  <script>
  import adminEmployeeList from '@/components/admin/adminEmployeeList.vue'
  
  export default {
    
   layout:'adminLayout',
   components:{
    adminEmployeeList:adminEmployeeList
   }
  };
  </script>
  