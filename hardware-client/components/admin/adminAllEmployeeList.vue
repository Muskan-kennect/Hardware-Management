<template>
  <v-container class="main-container">
    <!-- First Container: Employee Heading, Search Bar, and Filter Button -->
    <v-row class="employee-header-container" align="center">
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
        :items="temporaryEmployees"
        :search="search"
        :items-per-page="6"
        class="elevation-4 table-container"
      >
        <template v-slot:item.employeeId="{ item }">
          <router-link :to="`/employee/specificEmployee/${item.employeeId}`">{{
            item.employeeId
          }}</router-link>
        </template>
        <template v-slot:item.employeeName="{ item }">
          {{ item.employeeName }}
        </template>
        <template v-slot:item.employeeDept="{ item }">
          {{ item.employeeDept }}
        </template>
        <template v-slot:item.employeeEmail="{ item }">
          {{ item.employeeEmail }}
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selectedFilter: null,
      filterOptions: ["Filter 1", "Filter 2", "Filter 3"],
      searchedText: "",
      temporaryEmployees: [], // Use this for filtered employees
      allEmployees: [], // Use this for all employees
      headers: [
        { text: "Employee ID", value: "employeeId" },
        { text: "Employee Name", value: "employeeName" },
        { text: "Employee Department", value: "employeeDept" },
        { text: "Employee Email", value: "employeeEmail" },
      ],
    };
  },
  watch: {
    searchedText(newValue, oldValue) {
      // Call your custom function here
      this.changeFilterText(newValue);
    },
  },
  mounted() {
    this.getAllEmployees();
  },

  computed: {
    // Combine searchFields into a single search string
    search() {
      return this.searchFields.join(" ").toLowerCase();
    },
    // Filter devices based on the search string
    filteredDevices() {
      return this.allDevices.filter((device) =>
        this.headers.some((header) => {
          const value = device[header.value];
          return String(value).toLowerCase().includes(this.search);
        })
      );
    },
  },
  methods: {
    handleStatusClick(item) {
      console.log(`Status button clicked for item with ID ${item.id}`);
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
    redirectToWholeDeviceList(item) {
      if (item.assignedTo && item.assignedTo !== "---") {
        // Assuming that the item.assignedTo holds the user ID or some identifier
        this.$router.push({
          path: `/admin/wholeDeviceList/${item.assignedTo}`,
        });
      }
    },
    redirectToFurtherPage() {
      // You can replace 'further-page' with the actual route or path you want to redirect to
      this.$router.push({
        path: `/admin/wholeDeviceList/${this.selectedDevice?._id}`,
      });
    },
    handleValueChanged(newValue) {
      this.changeFilterText(newValue);
    },

    toggleSorting() {
      // Example: Sort by deviceName
      const sortOrder = this.sortOrder === "asc" ? "desc" : "asc";

      this.allDevices.sort((a, b) => {
        const nameA = a.deviceName.toLowerCase();
        const nameB = b.deviceName.toLowerCase();

        // Use localeCompare based on the sortOrder
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      // Update sortOrder for the next toggle
      this.sortOrder = sortOrder;
    },

    filteredDevices() {
      console.log(this.searchedText);
      if (this.searchedText.trim() !== "") {
        // If searchedText is not empty, filter allDevices based on matching fields
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
        // If searchedText is empty, return allDevices
        return this.allDevices;
      }
    },

    changeFilterText(text) {
      if (text !== "") {
        const tempEmployees = [];
        this.allEmployees.map((employee) => {
          if (
            String(employee.employeeId)
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            String(employee.employeeName)
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            String(employee.employeeDept)
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            String(employee.employeeEmail)
              .toLowerCase()
              .includes(text.toLowerCase())
          ) {
            tempEmployees.push(employee);
          }
        });
        this.temporaryEmployees = tempEmployees;
      } else {
        // If searchedText is empty, return all employees
        this.temporaryEmployees = this.allEmployees;
      }
    },

    getAllEmployees() {
      // Assuming you have an API endpoint to fetch employees
      this.$http
        .get(`http://localhost:8009/employee`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.allEmployees = data;
          this.temporaryEmployees = data;
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
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
