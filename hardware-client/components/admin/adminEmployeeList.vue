<template>
  <v-container class="main-container">
    <!-- First Container: Device Heading, Search Bar, and Filter Button -->
    <v-row class="device-header-container" align="center">
      <v-col>
        <h4 class="title-heading">Employee List</h4>
      </v-col>
      <v-text-field v-model="searchedText" placeholder="Search here.." />
      <v-col>
        <!-- Sorting Button -->
        <v-btn @click="toggleSorting" color="primary" dark
          >Toggle Sorting</v-btn
        >
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
          <v-btn
            @click="handleStatusClick(item)"
            text
            color="green"
            class="button-with-no-underline"
            >In use</v-btn
          >
        </template>
        <template v-slot:item.viewDetails="{ item }">
          <v-btn
            @click="openModal(item)"
            text
            color="blue"
            class="button-with-underline"
            >View Details</v-btn
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            v-if="item.requestStatus === 'started'"
            @click="handleAcceptClick(item)"
            text
            color="green"
            class="button-with-no-underline"
            >Accept</v-btn
          >
          <v-btn
            v-if="item.requestStatus === 'started'"
            @click="handleDeclineClick(item)"
            text
            color="red"
            class="button-with-no-underline"
            >Decline</v-btn
          >
          <v-btn
            v-if="item.requestStatus !== 'started'"
            @click="handleDeclineClick(item)"
            text
            color="red"
            class="button-with-no-underline"
            >N.A.</v-btn
          >
        </template>
      </v-data-table>
    </v-row>

    <!-- Modal for Device Details -->
    <v-dialog v-model="showModal" max-width="500">
      <v-card>
        <v-card-title
          class="modal-header header-new"
          style="margin-left: 150px"
        >
          <span class="modal-title">Device Details</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeModal">
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
        </v-card-title>
        <hr />
        <v-card-text style="text-align: center">
          <!-- Display device details -->
          <v-row>
            <v-col>
              <span class="detail-label">Device ID:</span>
              <span class="detail-value">
                {{ selectedDevice ? selectedDevice?._id : "" }}
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="detail-label">Device Name:</span>
              <span class="detail-value">
                {{ selectedDevice ? selectedDevice?.deviceName : "" }}
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="detail-label">Display Name:</span>
              <span class="detail-value">
                {{ selectedDevice ? selectedDevice?.displayName : "" }}
              </span>
            </v-col> </v-row
          ><v-row>
            <v-col>
              <span class="detail-label">Device Category:</span>
              <span class="detail-value">
                {{ selectedDevice ? selectedDevice?.deviceCategory : "" }}
              </span>
            </v-col></v-row
          >
          <v-row>
            <v-col>
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                {{ selectedDevice ? selectedDevice?.deviceStatus : "" }}
              </span></v-col
            >
            <!-- Add other device details as needed -->
          </v-row>

          <!-- Display DeviceSpecs -->
          <v-row class="specs-container">
            <v-col>
              <h4 class="specs-title">Device Specs</h4>
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

          <!-- Display WarrantyInfo -->
          <v-row class="warranty-container" style="text-align: center">
            <v-col>
              <h4 class="warranty-title">Warranty Info</h4>
              <v-row
                v-if="selectedDevice && selectedDevice.warrantyInfo?.length"
              >
                <v-col
                  v-for="warrantyUrl in selectedDevice.warrantyInfo"
                  :key="warrantyUrl"
                  class="warranty-item"
                  style="margin-left: 180px; margin-bottom: 20px"
                >
                  <v-img
                    :src="getExtension(warrantyUrl)"
                    alt="Warranty Info"
                    width="100"
                    height="100"
                  ></v-img>
                  <a
                    class="warranty-file-name"
                    style="margin-left: -120px"
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
          <hr />
          <v-row>
            <v-btn
              @click="redirectToFurtherPage"
              color="primary"
              style="margin-left: 150px; margin-top: 20px"
              >Know Further</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showAcceptModal" max-width="500">
      <v-card>
        <v-card-title class="modal-header">
          <span class="modal-title">Accept Request</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeAcceptModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                v-if="deviceStatus === 'new'"
                v-model="acceptModalValue"
                :items="presentDevices"
                label="Select Value"
                item-text="displayName"
                item-value="_id"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-btn @click="handleAcceptModalConfirm" color="primary"
              >Confirm</v-btn
            >
            <v-btn @click="closeAcceptModal" color="grey">Cancel</v-btn>
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
      search: "",
      selectedFilter: null,
      filterOptions: ["Filter 1", "Filter 2", "Filter 3"],
      showModal: false,
      selectedDevice: null,
      searchedText: "",
      showAcceptModal: false,
      acceptModalValue: null,
      acceptModalOptions: ["Option 1", "Option 2", "Option 3"], // Add your dropdown options here
      presentDevices: [],
      temporaryDevices: [],
      headers: [
        { text: "Device ID", value: "_id" },
        { text: "Device Name", value: "deviceName" },
        { text: "Category", value: "deviceCategory" },
        { text: "Raised By", value: "raisedByName" },
        { text: "Status", value: "requestStatus" },
        { text: "View Details", value: "viewDetails" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      allDevices: [],
    };
  },
  watch: {
    searchedText(newValue, oldValue) {
      this.changeFilterText(newValue);
    },
  },
  mounted() {
    this.getAllDevices();
    this.getAllPresentDevices();
  },
  computed: {
    search() {
      return this.searchFields.join(" ").toLowerCase();
    },
  },
  methods: {
    handleStatusClick(item) {
      console.log(`Status button clicked for item with ID ${item.id}`);
    },
    openModal(item) {
      this.selectedDevice = item;
      console.log(item?.requestStatus === "started");
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleValueChanged(newValue) {
      this.changeFilterText(newValue);
    },
    changeFilterText(text) {
      if (text !== "") {
        const tempDevice = [];
        this.allDevices.map((device, index) => {
          if (
            String(device.deviceName)
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            String(device.displayName)
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            String(device.deviceCategory)
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            String(device.requestStatus)
              .toLowerCase()
              .includes(text.toLowerCase())
          ) {
            tempDevice.push(device);
          }
        });
        this.temporaryDevices = tempDevice;
      } else {
        this.temporaryDevices = this.allDevices;
      }
    },

    handleDeclineClick(item) {
      this.$nextTick(() => {
      this.selectedDevice = item;
      const payload = {
        requestStatus:"deAllocated"
      };

      this.$http
        .post(`http://localhost:8009/request/${this.selectedDevice?._id}`, payload)
        .then((data) => {
          alert("Successfully removed the device to this employee");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error fetching devices:", error);
        });
       });
    },
    toggleSorting() {
      this.allDevices.sort((a, b) => {
        const nameA = a.deviceName.toLowerCase();
        const nameB = b.deviceName.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    },
    handleAcceptClick(item) {
      // Handle the logic when the "Accept" button is clicked
      // Open the modal
      this.selectedDevice = item;
      this.showAcceptModal = true;
    },

    // handleAcceptModalConfirm() {
    //   // Handle the logic when the "Confirm" button in the Accept modal is clicked
    //   // You can access the selected value using this.acceptModalValue
    //   console.log('Accepted with value:', this.acceptModalValue);
    //   this.handleAcceptClick();
    // },

    closeAcceptModal() {
      // Handle the logic when the "Cancel" button in the Accept modal is clicked
      // Close the modal
      this.showAcceptModal = false;
    },
    handleAcceptModalConfirm() {
      const payload = {
        employeeId: this.selectedDevice?.raisedById,
        deviceId: this.acceptModalValue,
        requestId: this.selectedDevice?._id,
        allocated: true,
      };

      this.$http
        .post(`http://localhost:8009/allotment/addDevice`, payload)
        .then((data) => {
          alert("Successfully added the device to thi employee");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error fetching devices:", error);
        });
      this.showAcceptModal = false;
    },

    filteredDevices() {
      if (this.searchedText.trim() !== "") {
        this.temporaryDevices = this.allDevices.filter((device) =>
          this.headers.some((header) => {
            const value = device[header.value];
            return String(value)
              .toLowerCase()
              .includes(this.searchedText.toLowerCase());
          })
        );
        return this.temporaryDevices;
      } else {
        return this.allDevices;
      }
    },
    getAllDevices() {
      this.$http
        .get(`http://localhost:8009/request`)
        .then((res) => res.json())
        .then((data) => {
          this.allDevices = data;
          this.temporaryDevices = data;
        })
        .catch((error) => {
          console.error("Error fetching devices:", error);
        });
    },
    getAllPresentDevices() {
      this.$http
        .get(`http://localhost:8009/device`)
        .then((res) => res.json())
        .then((data) => {
          this.presentDevices = data;
        })
        .catch((error) => {
          console.error("Error fetching devices:", error);
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

.accept-button,
.decline-button {
  padding: 8px 16px; /* Adjust padding as needed */
  margin-right: 8px; /* Adjust margin as needed */
  font-size: 14px; /* Adjust font size as needed */
}

.accept-button {
  color: #ffffff; /* Text color for Accept button */
  background-color: #4caf50; /* Background color for Accept button */
}

.decline-button {
  color: #ffffff; /* Text color for Decline button */
  background-color: #e57373; /* Background color for Decline button */
}

.button-with-no-underline {
  text-decoration: none !important; /* Remove underline for buttons */
}

.table-container {
  margin-top: 20px;
  width: 100%;
  border: 0px;
  background-color: aliceblue; /* Set background color */
}

.switch-line {
  border-radius: 0; /* Remove circular slider */
}
</style>
