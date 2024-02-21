<template>
  <v-container class="main-container">
    <!-- First Container: Device Heading, Search Bar, and Filter Button -->
    <v-row class="device-header-container" align="center">
      <v-col>
        <h4 class="title-heading">New Device List</h4>
      </v-col>
        <v-text-field v-model="searchedText" placeholder="Search here.." />
     
      <v-col>
        <!-- Sorting Button -->
        <v-btn @click="toggleSorting" color="primary" dark>Toggle Sorting</v-btn>
      </v-col>
    </v-row>

    <!-- Second Container: Table View -->
    <v-row class="table-container">
      <!-- Your table implementation goes here -->
      <v-data-table
        :headers="headers"
        :items="temporaryDevices"
        :search="search"
        :items-per-page="6"
        class="elevation-4 table-container"
      >
        <template v-slot:item.status="{ item }">
          <v-btn @click="handleStatusClick(item)" text color="green" class="button-with-no-underline">In use</v-btn>
        </template>
        
        <template v-slot:item.viewDetails="{ item }">
          <v-btn @click="openModal(item)" text color="blue" class="button-with-underline">View Details</v-btn>
        </template>
      
      </v-data-table>
    </v-row>

    <!-- Modal for Device Details -->
    <v-dialog v-model="showModal" max-width="800">
      <v-card>
        <v-card-title class="modal-header">
          <span class="modal-title">Device Details</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <!-- Display device details -->
          <v-row>
            <v-col>
              <p class="detail-label">Device ID:</p>
              <p class="detail-value">{{ selectedDevice ? selectedDevice?._id : '' }}</p>

              <p class="detail-label">Device Name:</p>
              <p class="detail-value">{{ selectedDevice ? selectedDevice?.deviceName : '' }}</p>

              <p class="detail-label">Display Name:</p>
              <p class="detail-value">{{ selectedDevice ? selectedDevice?.displayName : '' }}</p>

              <p class="detail-label">Device Category:</p>
              <p class="detail-value">{{ selectedDevice ? selectedDevice?.deviceCategory : '' }}</p>

              <p class="detail-label">Status:</p>
              <p class="detail-value">{{ selectedDevice ? selectedDevice?.deviceStatus : '' }}</p>
              <!-- Add other device details as needed -->
            </v-col>
          </v-row>

          <!-- Display DeviceSpecs -->
          <v-row class="specs-container">
            <v-col>
              <h4 class="specs-title">Device Specs</h4>
              <v-row v-if="selectedDevice && selectedDevice.DeviceSpecs?.length">
                <v-col v-for="spec in selectedDevice.DeviceSpecs" :key="spec.key" class="spec-item">
                  <v-img :src="getExtension(spec)" alt="Device Spec" width="100" height="100"></v-img>
                  <a class="warranty-file-name" :href="getImageUrl(spec)" target="_blank">{{ getFileNameFromUrl(spec) }}</a>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>No Device Specs available</v-col>
              </v-row>
            </v-col>
            
          </v-row>

          <!-- Display WarrantyInfo -->
          <v-row class="warranty-container">
            <v-col>
              <h4 class="warranty-title">Warranty Info</h4>
              <v-row v-if="selectedDevice && selectedDevice.warrantyInfo?.length">
                <v-col v-for="warrantyUrl in selectedDevice.warrantyInfo" :key="warrantyUrl" class="warranty-item">
                  <v-img :src="getExtension(warrantyUrl)" alt="Warranty Info" width="100" height="100"></v-img>
                  <a class="warranty-file-name" :href="getImageUrl(warrantyUrl)" target="_blank">{{ getFileNameFromUrl(warrantyUrl) }}</a>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>No Warranty Info available</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
              <v-btn @click="redirectToFurtherPage" color="primary">Know Further</v-btn>
            </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      search: '',
      selectedFilter: null,
      filterOptions: ['Filter 1', 'Filter 2', 'Filter 3'],
      showModal: false,
      selectedDevice: null,
      searchedText:'',
      temporaryDevices: [],
      allAllotments:[],
      headers: [
        { text: 'Device ID', value: '_id' },
        { text: 'Device name', value: 'deviceName' },
        { text: 'Display name', value: 'displayName' },
        { text: 'Category', value: 'deviceCategory' },
        { text: 'Assigned to', value: 'assignedTo' },
        { text: 'Status', value: 'deviceStatus' },
        { text: 'View Details', value: 'viewDetails' },
      ],
      allDevices: [],
    };
  },
  watch: {
    searchedText(newValue, oldValue) {
      
      // Call your custom function here
      this.changeFilterText(newValue);
    },
  },
  mounted() {
    this.getAllAllotments();
    this.getAllDevices(); // Call your async Axios function when the component is mounted
  },

  computed: {
    // Combine searchFields into a single search string
    search() {
    return this.searchFields.join(' ').toLowerCase();
  },
  // Filter devices based on the search string
  filteredDevices() {
    return this.allDevices.filter(device =>
      this.headers.some(header => {
        const value = device[header.value];
        return String(value).toLowerCase().includes(this.search);
      })
    );
  },
  },
  methods: {
    handleStatusClick(item) {
    },
    openModal(item) {
      this.selectedDevice = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    getImageUrl(url) {
     
        return url;
      
    },
    redirectToFurtherPage() {
    // You can replace 'further-page' with the actual route or path you want to redirect to
    this.$router.push({ path: `/admin/wholeDeviceList/${this.selectedDevice?._id}` });
    },
    handleValueChanged(newValue) {
      this.changeFilterText(newValue);
    },
    changeFilterText(text){
      if (text !== '') {
         const tempDevice = []
         this.allDevices.map((device,index)=>{
          console.log(String(device.deviceName).toLowerCase().includes(text.toLowerCase()))
          if(String(device.deviceName).toLowerCase().includes(text.toLowerCase()) ||
          String(device.displayName).toLowerCase().includes(text.toLowerCase()) ||
          String(device.deviceCategory).toLowerCase().includes(text.toLowerCase()) ||
          String(device.deviceStatus).toLowerCase().includes(text.toLowerCase()) ){
            console.log(device)
            tempDevice.push(device);
          }
         })
         this.temporaryDevices=tempDevice;
        
        
      } else {
        // If searchedText is empty, return allDevices
        this.temporaryDevices=this.allDevices;
      }
    },

    toggleSorting() {
      // Example: Sort by deviceName
      this.allDevices.sort((a, b) => {
        const nameA = a.deviceName.toLowerCase();
        const nameB = b.deviceName.toLowerCase();

        return nameA.localeCompare(nameB);
      });
    },
    filteredDevices() {
      console.log(this.searchedText)
      if (this.searchedText.trim() !== '') {
        // If searchedText is not empty, filter allDevices based on matching fields
        this.temporaryDevices = this.allDevices.filter(device =>
          this.headers.some(header => {
            const value = device[header.value];
            return String(value).toLowerCase().includes(this.searchedText.toLowerCase());
          })
        );
        return this.temporaryDevices;
      } else {
        // If searchedText is empty, return allDevices
        return this.allDevices;
      }
    },

    getExtension(url){
      const parts = url.split('.');

      const lastPart = parts[parts?.length - 1];
      console.log(lastPart === "pdf"|| lastPart === "PDF")
      if(lastPart==="pdf"){
        return 'https://th.bing.com/th?id=OIP.prf-wSLLQCzjnWMc90cwuQAAAA&w=247&h=252&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2';
      }
      else if (lastPart==="mp4"){
        return 'https://th.bing.com/th?id=OIP.TV9ajVCGEFENnB9UuFaRgAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
      }
      else
        return 'https://th.bing.com/th?id=OIP.8ZrjQn_Elu6ZelcPP7mTMwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2';
    },


    // Function to extract file name from the URL
    getFileNameFromUrl(url) {
      const parts = url.split('/');
      return parts[parts?.length - 1];
    },
    getAllAllotments(){
      this.$http.get(`http://localhost:8009/allotment`)
        .then((res) => res.json())
        .then((data) => {
          this.allAllotments = data;
        })
        .catch((error) => {
          console.error('Error fetching devices:', error);
        });
    },
    getCurrentAssignedUser(row){
      let user='';
      this.allAllotments?.map((allotment,index)=>{
        if(String(allotment.deviceId)===String(row._id)){
          user=allotment.employeeId;
        }
      });
      return user;
    },
    getAllDevices() {
      this.$http.get(`http://localhost:8009/device`)
        .then((res) => res.json())
        .then((data) => {
          let updatedData = [];
          data.map((info,index)=>{
             userAssigned = this.getCurrentAssignedUser(info)
            
            if(String(info?.deviceStatus) === "new"){
              console.log(String(info?.deviceStatus) === "new","inside")
           
            const row ={
               _id  :info?._id,
              deviceName :info?.deviceName,
              displayName :info?.displayName,
              deviceCategory :info?.deviceCategory,
              assignedTo :userAssigned ? userAssigned : "---",
              deviceStatus :info?.deviceStatus,
              viewDetails:info?.viewDetails,
              DeviceSpecs:info?.DeviceSpecs,
              warrantyInfo:info?.warrantyInfo
          };
         
            updatedData.push(row);
        }
          
        });

        // console.log(updatedData)
         this.allDevices = updatedData;

         console.log("inside");
          this.temporaryDevices=updatedData;
        })
        .catch((error) => {
          console.error('Error fetching devices:', error);
        });
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

.search-bar {
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

.switch-container {
  margin-top: 10px;
}

.switch-line {
  border-radius: 0; /* Remove circular slider */
}
</style>
