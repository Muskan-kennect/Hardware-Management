<template>
  <v-container class="main-container">
    <!-- First Container: Employee Heading and Details -->
    <v-row class="employee-header-container">
      <v-col>
        <h3 class="title-heading">Employee Details :</h3>
      </v-col>
    </v-row>

    <!-- Display Employee Details -->
    <v-row class="employee-details-container">
      <v-col style="border: 1px solid black">
        <span class="detail-label">Employee ID:</span>
        <span class="detail-value">
          {{ employeeDetails ? employeeDetails.employeeId : "" }}
        </span>
      </v-col>
      <v-col style="border: 1px solid black">
        <span class="detail-label">Employee Name:</span>
        <span class="detail-value">
          {{ employeeDetails ? employeeDetails.employeeName : "" }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="border: 1px solid black">
        <span class="detail-label">Employee Department:</span>
        <span class="detail-value">
          {{ employeeDetails ? employeeDetails.employeeDept : "" }}
        </span>
      </v-col>
      <v-col style="border: 1px solid black">
        <span class="detail-label">Employee Email:</span>
        <span class="detail-value">
          {{ employeeDetails ? employeeDetails.employeeEmail : "" }}
        </span>

        <!-- Add other employee details as needed -->
      </v-col>
    </v-row>

    <!-- Second Container: Allocation/Deallocation History -->
    <v-row class="allocation-history-container">
      <v-col>
        <h4 class="allocation-history-title">
          Allocation/Deallocation History
        </h4>

        <v-data-table
          :headers="allocationHeaders"
          :items="allocationHistory"
          :items-per-page="10"
          class="elevation-4 allocation-table"
        >
          <template v-slot:item.created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>

          <template v-slot:item.deviceId="{ item }">
            <router-link
              :to="{ path: `/admin/wholeDeviceList/${item.deviceId}` }"
              >{{ item.deviceId }}</router-link
            >
          </template>
          <!-- Define slot for custom rendering if needed -->
        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="allocation-history-container">
      <v-col>
        <h4 class="allocation-history-title">
         Requests History
        </h4>

        <v-data-table
          :headers="requestHeaders"
          :items="requestHistory"
          :items-per-page="10"
          class="elevation-4 allocation-table"
        >
          <template v-slot:item.created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>
          <template v-slot:item.modified_at="{ item }">
            {{ formatDate(item.modified_at) }}
          </template>
          <!-- Define slot for custom rendering if needed -->
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      employeeDetails: null,
      allocationHistory: [],
      requestHistory:[],
      allocationHeaders: [
        { text: "Allotment ID", value: "allotmentId" },
        { text: "Device ID", value: "deviceId" },
        { text: "Allocated", value: "allocated" },
        { text: "Deallocated", value: "deAllocated" },
        { text: "Date", value: "created_at" },
      ],

      requestHeaders: [
        { text: "Device Name", value: "deviceName" },
        { text: "Device Category", value: "deviceCategory" },
        { text: "Request Status", value: "requestStatus" },
        { text: "Request Type", value: "requestType" },
        { text: "Created At", value: "created_at" },
        { text: "Last Modified", value: "modified_at" },
      ],
    };
  },
  mounted() {
    const employeeId = this.$route.params.employeeId;
    this.getEmployeeDetails(employeeId);
    this.getAllocationHistory(employeeId);
    this.getRequestHistory(employeeId);
  },
  methods: {
    formatDate(dateTimeString) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(dateTimeString).toLocaleDateString(undefined, options);
    },
    getEmployeeDetails(employeeId) {
      this.$http
        .get(`http://localhost:8009/employee`)
        .then((res) => res.json())
        .then((data) => {
          const tempData = data;
          let selectedEmployee = {};
          tempData.map((employee, index) => {
            if (String(employee.employeeId) === employeeId) {
              const row = {
                employeeId: employee.employeeId,
                employeeName: employee.employeeName,
                employeeDept: employee.employeeDept,
                employeeEmail: employee.employeeEmail,
              };
              selectedEmployee = row;
            }
          });
          this.employeeDetails = selectedEmployee;
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
        });
    },
    getAllocationHistory(employeeId) {
      this.$http
        .get(`http://localhost:8009/allotment`)
        .then((res) => res.json())
        .then((data) => {
          const tempData = data;
          let allAllotments = [];
          tempData.map((allotment, index) => {
            if (String(allotment.employeeId) === employeeId) {
              const row = {
                allotmentId: allotment.allotmentId,
                allocated: allotment.allocated,
                deviceId: allotment?.deviceId,
                deAllocated: allotment.deAllocated,
                created_at: allotment.created_at,
              };
              allAllotments.push(row);
            }
          });
          this.allocationHistory = allAllotments;
        })
        .catch((error) => {
          console.error("Error fetching allocation history:", error);
        });
    },
    getRequestHistory(employeeId) {
      this.$http
        .get(`http://localhost:8009/request`)
        .then((res) => res.json())
        .then((data) => {
          const tempData = data;
          let allRequest = [];
          tempData.map((allotment, index) => {
            if (String(allotment.raisedById) === employeeId) {
              const row = {
                deviceName: allotment.deviceName,
                deviceCategory: allotment.deviceCategory,
                requestStatus: allotment?.requestStatus,
                requestType: allotment.requestType,
                created_at: allotment.created_at,
                modified_at : allotment.modified_at
              };
              allRequest.push(row);
            }
          });
          this.requestHistory = allRequest;
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
  margin-top: 20px;
  width: 100%;
}

.employee-header-container {
  background-color: rgb(170, 175, 179);
}

.title-heading {
  margin: 0;
}

.employee-details-container {
  margin-top: 20px;
  /* width: 100%; */
  background-color: aliceblue; /* Set background color */
}

.detail-label {
  font-weight: bold;
  margin: 5px 0;
}

.detail-value {
  margin: 5px 0;
}

.allocation-history-container {
  margin-top: 20px;
  width: 100%;
  border: 0px;
  background-color: aliceblue; /* Set background color */
}

.allocation-history-title {
  margin: 0;
}

.allocation-table {
  margin-top: 10px;
}
</style>
