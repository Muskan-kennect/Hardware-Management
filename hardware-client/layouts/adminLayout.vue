<template>
  <v-app class="main">
    <!-- Top row: App bar -->
    <v-app-bar app v-if="appbar">
      <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>Hardware Management</v-toolbar-title>
      <v-main></v-main>
      <v-btn icon @click="closeSidebar" style="text-align: end">
        <v-icon
          style="
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgb(213, 84, 84);
            color: white;
          "
          >mdi-close</v-icon
        >
      </v-btn>
    </v-app-bar>

    <!-- Second row: Sidebar and Main Content -->
    <v-row>
      <!-- First Sidebar column -->
      <v-col
        v-if="drawer"
        class="sidebar"
        cols="auto"
        mt="10%"
        style="margin-top: 10%"
      >
        <v-navigation-drawer
          app
          v-model="drawer"
          dark
          style="background-color: white; color: grey"
        >
          <v-container class="sidebar-container">
            <!-- Title Section -->

            <!-- Admin Section -->
            <v-list class="inside-sidebar">
              <v-list-item-group>
                <v-list-item style="margin-bottom: 20px">
                  <v-list-item-icon>
                    <v-icon
                      style="
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background-color: rgb(75, 69, 69);
                      "
                      >mdi-account</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 14px; color: black"
                      >Admin Name</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <!-- Menu Items with bottom border -->
                <v-header style="color: grey">Raise Request</v-header>
                <v-list-item
                  v-for="(item, index) in menuItems_request"
                  :key="index"
                  @click="navigateTo(item)"
                  :class="{ 'active': $route.path === item.url }"
                >
                  <v-list-item-content
                    class="list-item-content"
                    style="color: black"
                  >
                    <v-list-item-title
                      ><router-link
                        :to="item.url"
                        style="text-decoration: none; color: inherit"
                        >{{ item.text }}</router-link
                      ></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <!-- Add bottom border to every list item -->

                <v-header style="margin-top: 10px; color: grey"
                  >Raise Device</v-header
                >
                <v-list-item
                v-for="(item, index) in menuItems"
                :key="index"
                @click="navigateTo(item)"
                :class="{ 'active': $route.path === item.url }"
              >
                <v-list-item-content
                  class="list-item-content"
                  :style="{ backgroundColor: $route.path === item.url ? '#b0bec5' : '' }"
                  style="color: black"
                >
                  <v-list-item-title>
                    <router-link
                      :to="item.url"
                      style="text-decoration: none; color: inherit"
                    >{{ item.text }}</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>


                <v-divider></v-divider>

                <v-header style="margin-top: 10px; color: grey"
                  >Employee Request Management</v-header
                >
                <v-list-item
                v-for="(item, index) in menuItems_Employees"
                :key="index"
                @click="navigateTo(item)"
                :class="{ 'active': $route.path === item.url }"
              >
                <v-list-item-content
                  class="list-item-content"
                  :style="{ backgroundColor: $route.path === item.url ? '#b0bec5' : '' }"
                  style="color: black"
                >
                  <v-list-item-title>
                    <router-link
                      :to="item.url"
                      style="text-decoration: none; color: inherit"
                    >{{ item.text }}</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

                <v-divider style="margin-bottom: 10px"></v-divider>

                <v-header style="margin-top: 10px; color: grey"
                  >Device Management</v-header
                >
                <v-list-item
                v-for="(item, index) in menuItems_Device"
                :key="index"
                @click="navigateTo(item)"
                :class="{ 'active': $route.path === item.url }"
              >
                <v-list-item-content
                  class="list-item-content"
                  :style="{ backgroundColor: $route.path === item.url ? '#b0bec5' : '' }"
                  style="color: black"
                >
                  <v-list-item-title>
                    <router-link
                      :to="item.url"
                      style="text-decoration: none; color: inherit"
                    >{{ item.text }}</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                 <!-- Add bottom border to every list item -->
              </v-list-item-group>
            </v-list>

            <!-- Logout Button -->
            <v-button class="logout-button" @click="handleLogoutHandler" >logout</v-button>
          </v-container>
        </v-navigation-drawer>
      </v-col>

      <!-- Main Content column -->
      <v-main>
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-main>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      appbar: true,
      employeeDetails:null,
      secondDrawer: true,
      menuItems_request: [
       
        { text: "Employee Info", url:()=>this.navigateTo() },
        { text: "Device Lists", url: "/employee/allDeviceList" },
        // { text: "+ New Device Request", url: "/admin/newDeviceRequest" },
        // { text: "+ New Device Temporary", url: "/admin/newDeviceRequestTemporary" },
        // { text: "+ Repair Device", url: "/admin/addNewDeviceRepair" },

      ],
      menuItems:[
      { text: "+ Add New Device", url: "/admin/newdeviceAdd" },
      ],
      menuItems_Employees:[
      { text: "Employee Request List", url: "/admin/employeeList" },
      ],
      menuItems_Device: 
      [
      { text: "New Devices List", url: "/admin/adminNewDevices" },
      
        { text: "Device List", url: "/admin/deviceList" }],
    };
  },
  created() {
  
  },
  methods:{
    toggleSidebar() {
      this.drawer = !this.drawer;
    },
    navigateTo(item) {
      const employeeDetails = JSON.parse(localStorage.getItem("EmployeeDetails"));
      this.employeeDetails = employeeDetails;
      
      return `/employee/specificEmployee/${this.employeeDetails?.employeeId}`;
    },
    closeSidebar() {
      this.appbar = false;
    },
    handleLogoutHandler(){
      localStorage.removeItem("EmployeeDetails");
      this.$router.push("/login");
    }
  },
 
};
</script>

<style scoped>
  .main {
    background-color: gray;
  }

  .sidebar-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .logout-button {
    background-color: rgb(49, 48, 48);
    color: white;
    padding: 2%;
    text-align: center;
    font-family: "Abhaya Libre";
    font-size: 24px;
    border-radius: 12px;
    align-self: stretch;
    cursor: pointer;
  }

  .inside-sidebar {
    background-color: #a0a3a5;
    top: 10%;
    width: 200px;
  }

  .list-item-content {
    border-bottom: 1px solid #ccc;
    transition: background-color 0.3s ease;
  }

  .list-item-content:hover {
    background-color: #cfd8dc;
  }

  .list-item-content.active {
    background-color: #b0bec5;
  }

  html, body {
    margin: 0;
    padding: 0;
    background-color: gray;
    height: 100%;
  }

  .theme--light.v-application {
    background-color: aliceblue;
  }

  .v-navigation-drawer {
    background-color: #a0a3a5;
    border: 2px solid #a0a3a5;
  }

  .v-navigation-drawer .v-list-item {
    color: black;
  }

  .v-main {
    padding: 20px;
  }
</style>
