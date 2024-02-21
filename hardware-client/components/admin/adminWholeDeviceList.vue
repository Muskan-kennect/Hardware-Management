<template>
  <v-container class="main-container">
    <!-- Third Container: Two Columns -->
    <v-row style="background-color: rgb(150, 154, 154)">
      <h3 style="padding: 10px">
        Detailed Info about the device with device ID :
        <span style="margin-left: 10px; color: rgb(8, 40, 248)">{{
          $route.params.deviceId
        }}</span>
      </h3>
    </v-row>
    <v-row class="two-columns-container">
      <!-- First Column: Switch between three labels -->

      <v-col style="width: 15%; height: 80%">
        <v-row>
          <v-col
            style="cursor: pointer"
            v-for="label in switchLabels"
            :key="label"
            @click="switchLabel(label)"
            :class="{ 'switch-label-selected': selectedLabel === label }"
          >
            {{ label }}
          </v-col>
        </v-row>
        <v-divider
          v-if="selectedLabel !== ''"
          :class="{ 'selected-label-divider': selectedLabel !== '' }"
        ></v-divider>
        <v-container
          class="content-container"
          v-if="selectedLabel === 'Basic Information'"
        >
          <!-- Content for Label 1 -->
          <h4 style="margin-bottom: 10px; text-decoration: underline">
            Device Information :
          </h4>
          <p><strong>Device ID:</strong> {{ selectedDevice.deviceId }}</p>
          <p><strong>Device Name:</strong> {{ selectedDevice.deviceName }}</p>
          <p><strong>Display Name:</strong> {{ selectedDevice.displayName }}</p>
          <p>
            <strong>Device Category:</strong>
            {{ selectedDevice.deviceCategory }}
          </p>
          <p>
            <strong>Device Status:</strong> {{ selectedDevice.deviceStatus }}
          </p>
          <p>
            <strong>Date of Purchase:</strong>
            {{ selectedDevice.dateOfPurchase }}
          </p>
          <p><strong>Vendor Name:</strong> {{ selectedDevice.vendorName }}</p>
          <p><strong>Vendor Info:</strong> {{ selectedDevice.vendorInfo }}</p>
        </v-container>

        <v-container
          class="content-container"
          v-else-if="selectedLabel === 'Device Specs'"
        >
          <v-row class="specs-container">
            <v-col>
              <h4 style="margin-bottom: 10px; text-decoration: underline">
                Device Specs
              </h4>
              <v-row
                v-if="selectedDevice && selectedDevice.DeviceSpecs?.length"
              >
                <v-col
                  v-for="spec in selectedDevice.DeviceSpecs"
                  :key="spec.key"
                  class="spec-item"
                >
                  <v-img
                    :src="getExtension(spec)"
                    alt="Device Spec"
                    width="100"
                    height="100"
                  ></v-img>
                  <a
                    class="warranty-file-name"
                    :href="getImageUrl(spec)"
                    target="_blank"
                    >{{ getFileNameFromUrl(spec) }}</a
                  >
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>No Device Specs available</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>

        <v-container
          class="content-container"
          v-else-if="selectedLabel === 'Warranty Specs'"
        >
          <v-row class="warranty-container">
            <v-col>
              <h4 style="margin-bottom: 10px; text-decoration: underline">
                Warranty Info
              </h4>
              <v-row
                v-if="selectedDevice && selectedDevice.warrantyInfo?.length"
              >
                <v-col
                  v-for="warrantyUrl in selectedDevice.warrantyInfo"
                  :key="warrantyUrl"
                  class="warranty-item"
                >
                  <v-img
                    :src="getExtension(warrantyUrl)"
                    alt="Warranty Info"
                    width="100"
                    height="100"
                  ></v-img>
                  <a
                    class="warranty-file-name"
                    :href="getImageUrl(warrantyUrl)"
                    target="_blank"
                    >{{ getFileNameFromUrl(warrantyUrl) }}</a
                  >
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col>No Warranty Info available</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Second Column: Content based on switch label -->
      <v-col style="width: 45%; height: 80%; padding: 10px">
        <v-container class="second-column-container">
          <!-- First Row: Heading -->
          <v-row
            style="
              margin: 4%;
              background-color: cadetblue;
              padding: 8px;
              border-radius: 6px;
            "
          >
            <h4 style="margin: 0; color: white">Device Allocation History</h4>
          </v-row>
          <!-- Second Row: Search Bar -->
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-container style="display: flex; flex-direction: row">
                <v-text-field
                  label="Search"
                  dense
                  outlined
                  append-icon="mdi-magnify mdi-filter"
                  style="margin-left: 2%; margin-right: 2%; width: 90%"
                >
                </v-text-field>
                <v-btn> <v-icon>mdi-filter</v-icon></v-btn>
              </v-container>
            </v-col>
          </v-row>
          <!-- Third Row: Content -->
          <v-row>
            <v-container style="height: 60%">
              <v-row v-if="allocationHistory.length > 0">
                <v-row v-for="row in allocationHistory" :key="row.modified_at">
                  <v-container
                    style="
                      display: flex;
                      flex-direction: column;
                      margin-left: 2%;
                    "
                  >
                    <h3>Employee Name: {{ row.employeeName }}</h3>
                    <p>
                      Date of Allocation:
                      {{ row.allocated ? formatDate(row.created_at) : "---" }}
                    </p>
                    <p>
                      Date of Deallocation:
                      {{
                        row.deAllocated ? formatDate(row.modified_at) : "---"
                      }}
                    </p>
                  </v-container>
                </v-row>
              </v-row>
              <v-row v-else>
                <v-col>No allocation history available</v-col>
              </v-row>
            </v-container>
          </v-row>

          <!-- Fourth Row: Button -->
          <v-row>
            <v-btn
              @click="showDeallocateModal"
              color="primary"
              :disabled="isDeallocateButtonDisabled"
              style="margin: 2%; width: 96%"
              >Deallocate device</v-btn
            >
          </v-row>

          <v-dialog
            v-model="deallocateModal"
            max-width="500"
            style="text-align: center"
          >
            <v-card>
              <v-card-title class="headline"
                ><h3 style="margin-left: 120px">
                  Deallocate Device
                </h3></v-card-title
              >
              <hr />
              <v-card-text>
                <p style="margin-left: 80px; margin-top: 20px">
                  Are you sure you want to deallocate this device?
                </p>
              </v-card-text>
              <hr />
              <v-card-actions style="margin-left: 150px">
                <v-btn @click="closeDeallocateModal">Cancel</v-btn>
                <v-btn @click="deallocateDevice" color="primary">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      switchLabels: ["Basic Information", "Device Specs", "Warranty Specs"],
      selectedLabel: "Basic Information",
      selectedDevice: {},
      allocationHistory: [],
      deallocateModal: false,
      allAllotments: [],
    };
  },
  mounted() {
    const deviceId = this.$route.params.deviceId;
    this.getSpecificDevice(deviceId);
    this.getAllData(deviceId);
  },
  computed: {
    isDeallocateButtonDisabled() {
      return this.allocationHistory.every((row) => !row.allocated);
    },
  },

  methods: {
    switchLabel(label) {
      this.selectedLabel = label;
    },
    buttonClick() {
      // Implement button click logic
      console.log("Button clicked");
    },
    getImageUrl(url) {
      return url;
    },

    showDeallocateModal() {
      this.deallocateModal = true;
    },
    closeDeallocateModal() {
      this.deallocateModal = false;
    },
    deallocateDevice() {
      let deallocateDevice = {};

      this.allocationHistory.map((devices, index) => {
        if (devices.allocated === true && devices?.deAllocated === false) {
          console.log(devices);
          deallocateDevice = devices;
        }
      });

      const deAllocationId = deallocateDevice?.allotmentId;
      this.$http
        .put(`http://localhost:8009/allotment/deAllocate/${deAllocationId}`)
        .then((res) => {})
        .then((data) => {
          alert("Successfully deallocated!");
        })
        .catch((err) => {
          alert(err);
        });
      window.location.reload();

      this.closeDeallocateModal();
    },
    getExtension(url) {
      const parts = url.split(".");

      const lastPart = parts[parts?.length - 1];
      console.log(lastPart === "pdf" || lastPart === "PDF");
      if (lastPart === "pdf") {
        return "https://th.bing.com/th?id=OIP.prf-wSLLQCzjnWMc90cwuQAAAA&w=247&h=252&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2";
      } else if (lastPart === "mp4") {
        return "https://th.bing.com/th?id=OIP.TV9ajVCGEFENnB9UuFaRgAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2";
      } else
        return "https://th.bing.com/th?id=OIP.8ZrjQn_Elu6ZelcPP7mTMwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2";
    },

    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
      );
      return formattedDate;
    },

    // Function to extract file name from the URL
    getFileNameFromUrl(url) {
      const parts = url.split("/");
      return parts[parts?.length - 1];
    },
    getSpecificDevice(deviceId) {
      return this.$http
        .get(`http://localhost:8009/device`)
        .then((res) => res.json())
        .then((data) => {
          let device = {};
          data.map((info, index) => {
            if (String(info._id) === deviceId) {
              device = info;
            }
          });

          console.log(device);
          this.selectedDevice = device;
          // this.allDevices = updatedData;
          // this.temporaryDevices = updatedData;
        });
    },
    getCurrentAssignedUser(row) {
      console.log(this.allAllotments);
      let user = "";
      this.allAllotments?.map((allotment, index) => {
        console.log(allotment, row);
        if (String(allotment.employeeId) === String(row.employeeId)) {
          user = allotment.employeeName;
        }
      });
      return user;
    },
    getAllData(deviceId) {
      this.getAllAllotments(deviceId)
        .then(() => this.getAllocationHistory(deviceId))
        .catch((error) => {
          console.error("Error fetching all data:", error);
        });
    },
    getAllAllotments() {
      return this.$http
        .get(`http://localhost:8009/employee`)
        .then((res) => res.json())
        .then((data) => {
          this.allAllotments = data;
        });
    },
    getAllocationHistory(deviceId) {
      this.$http
        .get(`http://localhost:8009/allotment`)
        .then((res) => res.json())
        .then((data) => {
          const tempData = data;
          console.log(tempData);
          let allAllotments = [];
          tempData.map((allotment, index) => {
            const userAssigned = this.getCurrentAssignedUser(allotment);
            if (String(allotment.deviceId) === deviceId) {
              const row = {
                employeeName: userAssigned,
                allocated: allotment.allocated,
                modified_at: allotment?.modified_at,
                deAllocated: allotment.deAllocated,
                created_at: allotment.created_at,
                allotmentId: allotment?.allotmentId,
              };
              allAllotments.push(row);
            }
          });
          console.log(allAllotments);
          this.allocationHistory = allAllotments;
        })
        .catch((error) => {
          console.error("Error fetching allocation history:", error);
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

.two-columns-container {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.switch-label-selected {
  border-bottom: 2px solid darkgray;
  cursor: pointer;
}

.content-container {
  width: 98%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.749);
  border-radius: 6px;
  border: 2px solid rgb(149, 149, 149);
  margin-top: 2%;
}

.selected-label-divider {
  background-color: transparent !important;
}

h3 {
  color: rgb(52, 51, 51);
}

p {
  color: gray;
}
.second-column-container {
  width: 60%;
  height: 100%;
  margin: 2%;
  margin-left: 20%;
  background-color: white;
  border: 2px solid gray;
  border-radius: 6px;
  padding: 2%;
}
</style>
