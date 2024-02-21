<!-- pages/index.vue -->
<template>
  <adminWholeDeviceList />
</template>

<script>
import adminWholeDeviceList from "@/components/admin/adminWholeDeviceList";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
export default {
  layout: "adminLayout",
  components: {
    adminWholeDeviceList: adminWholeDeviceList,
  },
};
</script>
