<template>
  <v-container class="main-container">
    <!-- First Container: Device Heading, Search Bar, and Filter Button -->
    <v-row class="device-header-container" align="center">
      <v-col>
        <h2 class="title-heading">
          New {{ deviceName }} {{ displayName }} Temporary request details
        </h2>
        <v-btn @click="open">Open</v-btn>
      </v-col>
    </v-row>

    <!-- Second Container: Rows with Labels and Values -->
    <v-row class="input-row">
      <!-- First Row -->
      <v-row>
        <v-col>
          <v-col class="flex-row">
            <label class="label">Device Name:</label>
            <input class="value" v-model="deviceName" disabled />
          </v-col>
          <v-col class="flex-row">
            <label class="label">Display Name:</label>
            <input class="value" v-model="displayName" disabled />
          </v-col>
          <v-col class="flex-row">
            <label class="label">Device Category</label>
            <input v-model="newCategory" dense outlined disabled />
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-col class="flex-row">
            <label class="label">Employee Name:</label>
            <input class="value" v-model="employeeName" />
          </v-col>
          <v-col class="flex-row">
            <label class="label">Employee Id:</label>
            <input class="value" v-model="employeeId" />
          </v-col>
          <v-col class="flex-row">
            <label class="label">Employee Dept.:</label>
            <input class="value" v-model="employeeDept" />
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-col class="flex-row">
            <label class="label">Request Id:</label>
            <input class="value" v-model="requestId" />
          </v-col>
          <v-col class="flex-row">
            <label class="label">Requested On:</label>
            <input class="value" type="date" v-model="requestedOn" />
          </v-col>
          <v-col class="flex-row">
            <label class="label">Last Processed On:</label>
            <input class="value" type="date" v-model="lastProcessedOn" />
          </v-col>
        </v-col>
      </v-row>
    </v-row>

    <v-row style="margin-right: 2%; min-height: 40%;">
      <v-container
        style="background-color: white; width: 100%; height: 40%; margin-top: 2%; margin-bottom: 2%; border: 2px solid gray;"
      >
        <v-textarea placeholder="Issues" v-model="issue"></v-textarea>
      </v-container>
    </v-row>

    <v-row class="device-header-container" align="center">
      <v-col>
        <h4 class="title-heading">Requested for Temporary device.</h4>
      </v-col>
    </v-row>

    <v-row style="margin-right: 2%; min-height: 40%;">
      <v-container
        style="background-color: white; width: 100%; height: 40%; margin-top: 2%; margin-bottom: 2%; border: 2px solid gray;"
      >
        <label for="title5">Other Requirements</label>
        <v-btn @click="addSpecField">Add Specification</v-btn>
        <!-- Display added specs fields -->
        <v-row v-for="(spec, index) in deviceSpecs" :key="index">
          <v-col class="flex-row">
            <label :for="`spec${index}`" class="label">
              Specification {{ index + 1 }}:
            </label>
            <input class="value" :id="`spec${index}`" v-model="deviceSpecs[index]" />
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- Third Container: Cancel/Submit Buttons -->
    <v-row class="button-container" align="center">
      <v-col style="width: 50%;">
        <v-btn @click="cancel" color="red" block>
          Cancel
        </v-btn>
      </v-col>
      <v-col style="width: 50%;">
        <v-btn @click="submit" color="green" block>
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Input field data
      deviceName: '',
      displayName: '',
      deviceCategory: null,
      employeeName: '',
      employeeId: '',
      employeeDept: '',
      requestId: '',
      requestedOn: new Date().toISOString().split('T')[0], // Default to current date
      lastProcessedOn: new Date().toISOString().split('T')[0], // Default to current date
      issue: '',
      newCategory: '',
      deviceSpecs: [],
      categoryModal: false,
      allCategories: [],
      selectedDevice: null
    };
  },

  mounted() {
    const deviceId = this.$route.params.deviceId;
    this.getAllCategories();
    this.getSpecificDevice(deviceId);
  },

  methods: {
    cancel() {
      window.location.reload();
    },
    submit() {
      const payload = {
        deviceName: this.deviceName,
        raisedById: this.employeeId,
        raisedByName: this.employeeName,
        raisedByDept: this.employeeDept,
        requestStatus: 'started',
        requestType: 'temporary',
        requestInfo: this.issue,
        requestedOn: this.requestedOn,
        requestUpdatedBy: this.lastProcessedOn,
        deviceCategory: this.newCategory,
        requestSpecs: this.deviceSpecs
      };

      this.$http.post(`http://localhost:8009/request/adddevice`, payload)
        .then((data) => {
          alert('Successfully updated!');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error adding device:', error);
        });
    },
    selectedCategory(item) {
      if (item === 'add') {
        this.categoryModal = true;
      } else {
        this.newCategory = item;
      }
    },
    getAllCategories() {
      this.$http.get(`http://localhost:8009/category`)
        .then((res) => res.json())
        .then((data) => {
          const EmployeeDetails = JSON.parse(localStorage.getItem('EmployeeDetails'));

          this.employeeName = EmployeeDetails.employeeName;
          this.employeeId = EmployeeDetails.employeeId;
          this.employeeDept = EmployeeDetails.employeeDept;
          let tempAllCategories = [];
          data.map((row, index) => {
            const tempCategory = {
              categoryId: row.categoryId,
              categoryName: row.categoryName,
              categoryValue: row.categoryName,
              created_at: row.modified_at
            };
            tempAllCategories.push(tempCategory);
          });

          this.allCategories = tempAllCategories;
        })
        .catch((Err) => {
          alert(Err);
        });
    },
    getSpecificDevice(deviceId) {
      this.$http.get(`http://localhost:8009/device`)
        .then((res) => res.json())
        .then((data) => {
          let selectedDevice = {};
          data.map((device, index) => {
            if (String(device.deviceId) === deviceId) {
              selectedDevice = device;
            }
          });
          this.deviceName = selectedDevice?.deviceName;
          this.displayName = selectedDevice?.displayName;
          this.newCategory = selectedDevice?.deviceCategory;
          this.selectedDevice = selectedDevice;
        })
        .catch((Err) => {
          alert(Err);
        });
    },
    addSpecField() {
      // Add an empty string to the deviceSpecs array
      this.deviceSpecs.push('');
    }
  }
};
</script>

<style scoped>
/* Add or modify your styles as needed */
.main-container {
  background-color: white;
  color: black;
  padding: 20px;
}

.device-header-container {
  padding: 10px;
  background-color: lightgray;
  display: flex;
  flex-direction: row;
}

.label {
  color: gray;
}

.value {
  color: black;
}

.title-heading {
  margin: 0;
}

.input-row {
  margin-right: 2%;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid darkgray;
}

.file-upload-container {
  margin-top: 20px;
  border: 2px solid gray;
}

.button-container {
  margin-top: 20px;
}
</style>
