<template>
  <div>
    <v-app>
      <v-container fluid>
        <!-- Login Page -->
        <v-row class="login-register-row" v-if="currentPage === 'login'">
          <v-col cols="12" md="6" offset-md="3">
            <v-card class="login-register-card">
              <v-card-title class="text-center">Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="loginData.email" label="Email" :rules="[emailRule]" required></v-text-field>
                  <v-text-field v-model="loginData.password" label="Password" type="password" required></v-text-field>
                  <v-btn type="submit" color="dark-gray" class="submitButton" dark :disabled="isApiWorking">Login</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <a class="hyplerlink" @click="switchPage('register')">New User? Register</a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Register Page -->
        <v-row class="login-register-row" v-else-if="currentPage === 'register'">
          <v-col cols="12" md="6" offset-md="3">
            <v-card class="login-register-card">
              <v-card-title class="text-center">Register</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field v-model="registerData.username" label="Username" required></v-text-field>
                  <v-text-field v-model="registerData.department" label="Department" required></v-text-field>
                  <v-text-field v-model="registerData.email" label="Email" :rules="[emailRule]" required></v-text-field>
                  <v-text-field v-model="registerData.password" label="Password" type="password" required></v-text-field>
                  <v-btn type="submit" color="dark-gray" class="submitButton" dark :disabled="isApiWorking">Register</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <a class="hyplerlink" @click="switchPage('login')">Already have an account? Login</a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 'login',
      loginData: {
        email: '',
        password: '',
      },
      registerData: {
        username: '',
        department: '',
        email: '',
        password: '',
      },
      emailRule: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      isApiWorking: false,
    };
  },
  methods: {
    async login() {
      if (process.client) {
        const payload = {
          email: this.loginData.email,
          password: this.loginData.password
        };

        this.isApiWorking = true;

        try {
          const res = await this.$http.post(`http://localhost:8009/employee/login`, payload);
          const data = await res.json();
          alert("Logged In successfully!");
          localStorage.setItem("EmployeeDetails", JSON.stringify(data));
          this.$router.push("/admin");
        } catch (err) {
          alert(err);
        } finally {
          this.isApiWorking = false;
        }
      }
    },

    async register() {
      if (process.client) {
        const payload = {
          employeeName: this.registerData.username,
          employeeDept: this.registerData.department,
          employeeEmail: this.registerData.email,
          employeePassword: this.registerData.password
        };

        this.isApiWorking = true;

        try {
          const res = await this.$http.post(`http://localhost:8009/employee/addEmployee`, payload);
          alert("Successfully added!!");
          this.currentPage = "login";
        } catch (err) {
          alert(err);
        } finally {
          this.isApiWorking = false;
        }
      }
    },

    switchPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.login-register-row {
  align-items: center;
  height: 100vh;
  background-color: black;
}

.login-register-card {
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.hyplerlink {
  text-decoration: underline;
  color: blue;
}

.text-center {
  text-align: center;
}

.submitButton {
  margin-left: 40%;
}

.dark-gray {
  background-color: darkgray;
  color: white;
}
</style>
