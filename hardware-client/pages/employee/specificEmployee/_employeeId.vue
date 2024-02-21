<!-- pages/index.vue -->
<template>
    <specificEmployeeList/>
  </template>
  
  <script>
  import specificEmployeeList from '@/components/employee/specificEmployeeList';
  
  export default {
    
   layout:'adminLayout',
   components:{
    specificEmployeeList:specificEmployeeList
   }
  };
  </script>