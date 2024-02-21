<!-- pages/index.vue -->
<template>
    <div>
      <LandingPage />
    </div>
  </template>
  
  <script>
  import LandingPage from '@/components/LandingPage.vue';
 

  
  export default {
    layout:'default',
    components: {
      LandingPage,
    },
  };
  </script>
