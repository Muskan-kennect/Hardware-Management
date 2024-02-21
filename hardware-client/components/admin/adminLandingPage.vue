<template>
    <v-container class="main-container">
      <!-- First Container: Device Heading, Search Bar, and Filter Button -->
      <v-row class="device-header-container" align="center">
        <v-col>
          <h4 class="title-heading">Device lists</h4>
        </v-col>
        <v-col class="search-bar">
          <v-text-field v-model="search" placeholder="Search..."></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="applyFilter" color="primary">filter</v-btn>
        </v-col>
      </v-row>
  
      <!-- Second Container: Table View -->
      <v-row class="table-container">
        <!-- Your table implementation goes here -->
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :items-per-page="6"
          class="elevation-4 table-container"
        >
          
          <template v-slot:item.status="{ item }">
            <v-btn @click="handleStatusClick(item)" text color="green" class="button-with-no-underline">In use</v-btn>
          </template>
          <template v-slot:item.viewDetails="{ item }">
            <v-btn @click="handleViewDetailsClick(item)" text color="blue" class="button-with-underline">view details</v-btn>
          </template>
        </v-data-table>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
        headers: [
          { text: 'Device ID', value: 'id' },
          { text: 'Device name', value: 'col1' },
          { text: 'Display name', value: 'col2' },
          { text: 'Category', value: 'col3' },
          { text: 'Assigned to', value: 'col4' },
          { text: 'Status', value: 'status' },
          { text: 'View Details', value: 'viewDetails' },
        ],
        items: [
          { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          { id: 2, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          { id: 2, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          
          { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          { id: 2, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          
          { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          { id: 2, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          
          { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          { id: 2, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', status: 'Data 5', viewDetails: 'Data 6' },
          // Add more data rows as needed
        ],
      };
    },
    methods: {
      applyFilter() {
        // Implement your filter logic here
        console.log('Filter Applied');
      },
      handleStatusClick(item) {
        // Implement logic for handling status button click
        console.log(`Status button clicked for item with ID ${item.id}`);
      },
      handleViewDetailsClick(item) {
        // Implement logic for handling view details button click
        console.log(`View details button clicked for item with ID ${item.id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add or modify your styles as needed */
  .main-container {
    background-color: aliceblue !important;
  }
  
  .device-header-container {
    padding: 10px;
    background-color: aliceblue;
  }
  
  .title-heading {
    margin: 0;
  }
  
  .search-bar{
    left: 10%;
  }
  .button-with-underline {
    text-decoration: underline;
    padding: 4px 8px;
  }
  

  .button-with-no-underline {
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px 8px;
  }

  .table-container {
    margin-top: 20px;
    width: 100%;
    border: 0px;
    background-color: aliceblue; /* Set background color */
  }
  
  .table-container {
    margin-top: 20px;
    width: 100%;
  }
  </style>
  