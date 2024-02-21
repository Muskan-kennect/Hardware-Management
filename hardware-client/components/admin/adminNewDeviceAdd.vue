<template>
  <v-container class="main-container">
    <!-- First Container: Device Heading, Search Bar, and Filter Button -->
    <v-row class="device-header-container" style="background-color: grey">
      <v-col>
        <h3 class="title-heading">Employee request List</h3>
      </v-col>
    </v-row>

    <!-- Second Container: Input Fields -->
    <v-row class="input-fields-container" style="width: 90%; margin-left: 15px">
      <!-- First Row: Three input fields -->
      <v-row class="input-row">
        <v-col>
          <label for="input1">Device Name</label>
          <v-text-field
            id="input1"
            v-model="deviceName"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <label for="input2">Display Name</label>
          <v-text-field
            id="input2"
            v-model="displayName"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <label for="input3">Device Category</label>
          <v-select
            @change="selectedCategory"
            dense
            outlined
            :items="allCategories"
            item-value="categoryValue"
            item-text="categoryName"
          >
            {{ categoryName }}
          </v-select>
        </v-col>
      </v-row>

      <!-- Second Row: Two input fields -->
      <v-row class="input-row" style="margin-top: -20px">
        <v-col>
          <label for="input4">Product ID</label>
          <v-text-field
            id="input4"
            v-model="productId"
            dense
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col>
          <label for="input5">Model</label>
          <v-text-field
            id="input5"
            v-model="model"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col> </v-col>
      </v-row>

      <!-- Third Row: Three input fields -->
      <v-row class="input-row" style="margin-top: -20px">
        <v-col>
          <label for="input6">Date Of Purchase</label>
          <v-text-field
            id="input6"
            v-model="dateOfPurchase"
            dense
            outlined
            type="date"
          ></v-text-field>
        </v-col>
        <v-col>
          <label for="input7">Vendor Name</label>
          <v-text-field
            id="input7"
            v-model="vendorName"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <label for="input8">Vendor Info</label>
          <v-text-field
            id="input8"
            v-model="vendorInfo"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Fourth Row: File upload options -->
      <v-row style="margin-top: -20px">
        <v-col>
          <label for="deviceSpecs">Device Specs</label>
          <v-col style="width: 80%; height: 90%" class="file-upload-container">
            <input type="file" id="deviceSpecs" @change="handleDeviceSpecs" />
          </v-col>
        </v-col>
        <v-col>
          <label for="deviceWarranty">Device Warranty</label>
          <v-col style="width: 80%; height: 90%" class="file-upload-container">
            <input
              type="file"
              id="deviceWarranty"
              @change="handleDeviceWarranty"
            />
          </v-col>
        </v-col>
      </v-row>
    </v-row>

    <!-- Third Container: Cancel/Submit Buttons -->
    <v-row class="button-container" style="margin-top: 60px">
      <v-col style="width: 50%">
        <v-btn @click="cancelFrom" color="red" block>Cancel</v-btn>
      </v-col>
      <v-col style="width: 50%">
        <v-btn @click="addNewDevice" color="green" block>Submit</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="categoryModal" max-width="500px">
      <v-card>
        <v-card-title>
          <div>Adding New Category</div>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeCategoryModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <label for="newCategory">New Category Label</label>
              <v-text-field
                id="newCategory"
                v-model="newCategory"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="addNewCategory" color="primary">Add Category</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Input field data
      deviceName: "",
      displayName: "",
      productId: "",
      model: "",
      dateOfPurchase: "",
      vendorName: "",
      vendorInfo: "",
      newCategory: "",
      newInputSpecs: "",
      deviceSpecs: [],
      deviceWarranty: [],
      categoryModal: false,
      allCategories: [],
      userInfo: {},
    };
  },
  mounted() {
    this.getAllCategories();
  },

  methods: {
    cancel() {
      // Implement cancel logic
      console.log("Cancel button clicked");
    },
    submit() {
      // Implement submit logic
      console.log("Submit button clicked");
    },
    selectCategory(category) {
      this.newCategory = category;
    },
    selectedCategory(item) {
      if (item === "add") {
        this.categoryModal = true;
      } else {
        this.newCategory = item;
      }
    },
    openCategoryModal() {
      this.categoryModal = true;
    },
    closeCategoryModal() {
      this.categoryModal = false;
    },
    addNewCategory() {
      const payload = {
        categoryName: this.newCategory,
      };

      this.$http
        .post(`http://localhost:8009/category/addCategory`, payload)
        .then((data) => {
          alert("Successfully added the category!");
          window.location.reload();
        })
        .catch((Err) => {
          alert(Err);
        });
      this.categoryModal = false;
    },
    getAllCategories() {
      this.$http
        .get(`http://localhost:8009/category`)
        .then((res) => {
          return res.json(); // This returns a promise
        })
        .then((data) => {
          let tempAllCategories = [];
          data.map((row, index) => {
            const tempCategory = {
              categoryId: row.categoryId,
              categoryName: row.categoryName,
              categoryValue: row.categoryName,
              created_at: row.modified_at,
            };
            tempAllCategories.push(tempCategory);
          });

          this.userInfo = data;

          const addCategoryRow = {
            categoryId: Math.random(),
            categoryName: "+ Add Category",
            categoryValue: "add",
            created_at: new Date(),
          };
          tempAllCategories.push(addCategoryRow);

          this.allCategories = tempAllCategories;
        })
        .catch((Err) => {
          alert(Err);
        });
    },
    handleDeviceWarranty(WarrantyFile) {
      const formData = new FormData();
      formData.append("file", WarrantyFile.target.files[0]);

      this.$http
        .post("http://localhost:8009/uploadDeviceWarranty", formData)
        .then((res) => {
          return res.json(); // This returns a promise
        })
        .then((data) => {
          console.log(data);

          const earlierDeviceWarranty = this.deviceWarranty;
          earlierDeviceWarranty.push(data);

          this.deviceWarranty = earlierDeviceWarranty;
          // Handle success
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    },

    handleDeviceSpecs(SpecsFile) {
      const formData = new FormData();
      formData.append("file", SpecsFile.target.files[0]);

      this.$http
        .post("http://localhost:8009/uploadDeviceSpecs", formData)
        .then((res) => {
          return res.json(); // This returns a promise
        })
        .then((data) => {
          console.log(data);
          const earlierDeviceSpecs = this.deviceSpecs;
          earlierDeviceSpecs.push(data);

          this.deviceSpecs = earlierDeviceSpecs;
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    },

    getCurrentCategoryId(category) {
      let id = "";
      this.allCategories.map((type, index) => {
        if (String(category) === String(type.categoryName)) {
          id = type.categoryId;
        }
      });
      return id;
    },
    addNewDevice() {
      const data = JSON.parse(localStorage.getItem("EmployeeDetails"));
      const payload = {
        deviceName: this.deviceName,
        displayName: this.displayName,
        deviceCategory: this.newCategory,
        deviceCategoryId: this.getCurrentCategoryId(this.newCategory),
        deviceStatus: "new",
        dateOfPurchase: this.dateOfPurchase,
        vendorName: this.vendorName,
        vendorInfo: this.vendorInfo,
        DeviceSpecs: JSON.stringify(this.deviceSpecs),
        warrantyInfo: JSON.stringify(this.deviceWarranty),
      };

      this.$http
        .post(`http://localhost:8009/device/addDevice`, payload)
        .then((res) => {
          return res.json(); // This returns a promise
        })
        .then((data) => {
          alert("Successfully added the category!");
          window.location.reload();
        })
        .catch((Err) => {
          alert(Err);
        });
    },
    cancelFrom() {
      window.location.reload();
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

.input-fields-container {
  margin-top: 20px;
}

.input-row {
  margin-right: 10%;
}

.label {
  margin-bottom: 5px;
  display: block;
}

.file-upload-container {
  margin-top: 20px;
  border: 2px solid gray;
}

.button-container {
  margin-top: 20px;
}
</style>
